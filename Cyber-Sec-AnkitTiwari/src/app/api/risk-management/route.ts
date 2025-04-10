// src/app/api/assess-risk/route.ts
import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { connectDB } from '@/lib/db';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

export async function POST(request: Request) {
  let db;
  try {
    const { systemData } = await request.json();
    db = await connectDB();

    const [breachHistory] = await db.execute(
      'SELECT * FROM breach_analysis ORDER BY created_at DESC LIMIT 50'
    ) as any[];

    const [monitoringHistory] = await db.execute(
      'SELECT * FROM monitoring_logs ORDER BY created_at DESC LIMIT 24'
    ) as any[];

    const prompt = `Perform security risk assessment:
Recent breaches: ${breachHistory.length}
Monitoring events: ${monitoringHistory.length}
System state: ${JSON.stringify(systemData)}

Respond as JSON:
{
  "riskLevel": "low | medium | high",
  "vulnerabilities": ["..."],
  "recommendations": ["..."],
  "criticalAreas": ["..."]
}`;

    const assessment = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 400,
        temperature: 0.7,
        return_full_text: false,
      },
    });

    let assessmentResult;
    try {
      assessmentResult = JSON.parse(assessment.generated_text);
    } catch {
      assessmentResult = {
        riskLevel: "medium",
        vulnerabilities: ["AI failed to parse result"],
        recommendations: ["Conduct manual audit"],
        criticalAreas: ["System performance"],
      };
    }

    await db.execute(
      'INSERT INTO risk_assessments (assessment_result, system_state, created_at) VALUES (?, ?, ?)',
      [JSON.stringify(assessmentResult), JSON.stringify(systemData), new Date()]
    );

    return NextResponse.json({
      assessment: assessmentResult,
      timestamp: new Date().toISOString(),
      nextAssessmentDue: new Date(Date.now() + 86400000).toISOString(),
      status: 'success'
    });
  } catch (error) {
    console.error('Risk assessment error:', error);
    return NextResponse.json({
      error: 'Risk assessment failed',
      status: 'error',
    }, { status: 500 });
  } finally {
    if (db) await db.end();
  }
}
