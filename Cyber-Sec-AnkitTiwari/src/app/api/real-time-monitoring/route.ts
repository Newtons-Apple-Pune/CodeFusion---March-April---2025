// src/app/api/real-time-monitoring/route.ts
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import { HfInference } from '@huggingface/inference';
import { RowDataPacket } from 'mysql2/promise';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST() {
  let connection;
  try {
    const pool = connectDB;
    if (!pool) {
      throw new Error('Database connection pool is not initialized');
    }
    connection = await pool.getConnection();

    const [threats] = await connection.execute(
      'SELECT * FROM threats WHERE created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)'
    ) as [RowDataPacket[], any];

    const [metrics] = await connection.execute(
      'SELECT * FROM system_metrics ORDER BY created_at DESC LIMIT 1'
    ) as [RowDataPacket[], any];

    const analyzedThreats = await Promise.all(
      threats.map(async (threat: RowDataPacket) => {
        try {
          const prompt = `Analyze this threat:
Description: ${threat.description}
Respond in JSON:
{
  "impact": "...",
  "recommendations": "..."
}`;

          const analysis = await hf.textGeneration({
            model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            inputs: prompt,
            parameters: {
              max_new_tokens: 200,
              temperature: 0.7,
              top_p: 0.9,
              repetition_penalty: 1.1,
            },
          });

          let parsed;
          try {
            parsed = JSON.parse(analysis.generated_text);
          } catch {
            parsed = {
              impact: 'Unable to parse AI response',
              recommendations: 'Manual review needed',
            };
          }

          return {
            ...threat,
            aiAnalysis: parsed,
          };
        } catch (error) {
          console.error('Threat analysis error:', error);
          return {
            ...threat,
            aiAnalysis: {
              impact: 'AI analysis failed',
              recommendations: 'Retry later',
            },
          };
        }
      })
    );

    return NextResponse.json({
      status: 'active',
      lastUpdate: new Date().toISOString(),
      threats: analyzedThreats,
      systemHealth: {
        cpu: metrics?.[0]?.cpu_usage ?? 45,
        memory: metrics?.[0]?.memory_usage ?? 60,
        networkLoad: metrics?.[0]?.network_load ?? 30,
      },
    });
  } catch (error) {
    console.error('Monitoring API error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'An error occurred',
      lastUpdate: new Date().toISOString(),
      threats: [],
      systemHealth: {
        cpu: 45,
        memory: 60,
        networkLoad: 30,
      },
    });
  } finally {
    if (connection) await connection.end();
  }
}
