'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanSearch, Brain, Layers, LinkIcon, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const KloudRaksha = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 mt-10 lg:mt-20">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-violet-500 to-blue-900">
              KloudRaksha: Smart Security Management Tailored for Products
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Real-time asset inventory, AI-powered vulnerability detection, contextual risk scoring, and integration with ticketing systems.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg aspect-video relative">
            <Image
                src="/assets/products/kloudraksha.png"
                alt="KloudRaksha Dashboard"
                fill
                className="object-cover"
            />
            </div>
        </div>

        
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center text-primary tracking-tight mb-12">
            Key Features of KloudRaksha 🔍
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-md  border-blue-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-6 h-6 text-blue-500" />
                  <span>Real-time Asset Inventory</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automatically discover and track all assets across your infrastructure for complete visibility.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md  border-purple-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <span>AI-powered Vulnerability Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Advanced AI algorithms identify vulnerabilities with higher accuracy and fewer false positives.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md  border-green-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ScanSearch className="w-6 h-6 text-green-500" />
                  <span>Contextual Risk Scoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prioritize vulnerabilities based on asset importance, threat exposure, and business impact.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md  border-orange-500 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LinkIcon className="w-6 h-6 text-orange-500" />
                  <span>Ticketing System Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Seamlessly integrate with your existing workflows by connecting to popular ticketing systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        
        <section className="bg-muted rounded-lg py-16 px-6 md:px-12 mb-24">
          <h2 className="text-3xl font-bold text-center text-primary tracking-tight mb-12">
            Why KloudRaksha Stands Out 🧠
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 p-6 mb-4">
                <Layers className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Comprehensive Coverage</h3>
              <p className="text-muted-foreground">Continuously monitor and discover all assets across your network infrastructure.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-600 p-6 mb-4">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Intelligent Analysis</h3>
              <p className="text-muted-foreground">AI-driven detection identifies critical vulnerabilities while reducing false positives.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 p-6 mb-4">
                <ScanSearch className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Actionable Insights</h3>
              <p className="text-muted-foreground">Focus on what matters with prioritized vulnerabilities and clear remediation steps.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-primary tracking-tight mb-6">
            Strengthen Your Security Posture Today
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Discover how KloudRaksha can transform your vulnerability management with continuous monitoring and intelligent prioritization.
          </p>
          <Link href="/contact?subject=KloudRaksha%20Demo" passHref legacyBehavior>
            <Button size="lg" className="bg-gradient-to-r from-violet-500 to-blue-600 text-white font-semibold hover:opacity-90 transition duration-300 text-lg shadow-md rounded-full px-8">
              Request a KloudRaksha Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KloudRaksha;