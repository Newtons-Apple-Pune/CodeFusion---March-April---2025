'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanSearch, Brain, Layers, LinkIcon, ArrowBigLeft } from 'lucide-react';
import Image from 'next/image';

const Vumas = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 mt-10 lg:mt-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowBigLeft className="mr-2" />
            Back to Products
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-violet-500 to-blue-900">
              Vumas: Industry-Tailored Threat Intelligence
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Actionable threat intelligence tailored to your industry and infrastructure. Stay ahead of adversaries with curated, contextual insights.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg aspect-video relative">
            <Image
                src="/assets/products/Vumas.png"
                alt="KloudRaksha Dashboard"
                fill
                className="object-cover"
            />
            </div>
        </div>

        
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center text-primary tracking-tight mb-12">
            Key Features of Vumas 🔍
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-md  border-blue-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-6 h-6 text-blue-500" />
                  <span>Curated Threat Feeds</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access hand-picked threat data tailored to your industry, updated in real time from trusted sources.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md  border-purple-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <span>Dark Web Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor underground forums, marketplaces, and leak sites for mentions of your brand, employees, and assets.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md  border-green-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ScanSearch className="w-6 h-6 text-green-500" />
                  <span>IOC Tracking & Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get real-time alerts on indicators of compromise and track malicious infrastructure targeting your environment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md  border-orange-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LinkIcon className="w-6 h-6 text-orange-500" />
                  <span>Executive Threat Briefings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Weekly reports summarizing threats relevant to your business with action steps for leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        
        <section className="bg-muted rounded-lg py-16 px-6 md:px-12 mb-24">
          <h2 className="text-3xl font-bold text-center text-primary tracking-tight mb-12">
            Why Vumas Stands Out 🧠
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 p-6 mb-4">
                <Layers className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Focused Intelligence</h3>
              <p className="text-muted-foreground">Feeds customized for your sector and assets ensure relevance and actionability.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-600 p-6 mb-4">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Deep Visibility</h3>
              <p className="text-muted-foreground">Uncover hidden threats from the dark web and obscure sources not seen by typical scanners.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 p-6 mb-4">
                <ScanSearch className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Proactive Response</h3>
              <p className="text-muted-foreground">Receive timely alerts and guidance, helping you stay steps ahead of attackers.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-primary tracking-tight mb-6">
            Empower Your Threat Intelligence Today
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Learn how Vumas can elevate your security strategy with deeper, contextual threat intelligence.
          </p>
          <Link href="/contact?subject=Vumas%20Demo" passHref legacyBehavior>
            <Button size="lg" className="bg-gradient-to-r from-violet-500 to-blue-600 text-white font-semibold hover:opacity-90 transition duration-300 text-lg shadow-md rounded-full px-8">
              Request a Vumas Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vumas;
