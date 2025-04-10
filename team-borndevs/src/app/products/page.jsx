'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react'; 

const products = [
  {
    name: "Kloudraksha",
    tagline: "Continuous asset discovery, vulnerability scanning, and risk prioritization.",
    features: [
      "Real-time asset inventory",
      "AI-powered vulnerability detection",
      "Contextual risk scoring",
      "Integration with ticketing systems"
    ],
    imageSrc: "./assets/products/kloudraksha.png", 
    imageAlt: "Vulnuris Insight Platform dashboard",
    link: "/products/kloudraksha"
  },
  {
    name: "Vumas",
    tagline: "Actionable threat intelligence tailored to your industry and infrastructure.",
    features: [
      "Curated threat feeds",
      "Dark web monitoring",
      "IOC tracking and alerting",
      "Executive threat briefings"
    ],
    imageSrc: "./assets/products/Vumas.png",
    imageAlt: "Vulnuris Threat Intel dashboard",
    link: "/products/vumas"
  },
  {
    name: "Phishinstinct",
    tagline: "Train your employees and test their awareness against phishing attacks.",
    features: [
      "Customizable phishing templates",
      "Automated campaign scheduling",
      "Detailed reporting and analytics",
      "Integrated awareness training modules"
    ],
    imageSrc: "./assets/products/Phishinstinct.png",
    imageAlt: "Vulnuris PhishGuard interface",
    link: "/products/phishinstinct"
  }
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 mt-10 lg:mt-20">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text bg-gradient-to-br from-violet-500 to-blue-900 text-transparent">
            Our Security Products
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrated software solutions designed to give you visibility, context, and control over your security posture.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">


              <div className={`space-y-6 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h2>
                <p className="text-lg text-muted-foreground">{product.tagline}</p>

                <ul className="space-y-3">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={product.link} passHref legacyBehavior>
                   <Button size="lg" variant="secondary" className="rounded-full">
                       Learn More
                   </Button>
                </Link>
              </div>

              
              <div className={`${index % 2 !== 0 ? '' : 'md:order-last'}`}>
                 <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="rounded-lg shadow-lg border border-border"
                 />
                
              </div>

            </div>
          ))}
        </div>


        <div className="text-center mt-24 mb-10 border-t border-border pt-16">
          <h3 className="text-3xl font-semibold mb-4 bg-clip-text bg-gradient-to-br from-slate-500 to-slate-950 dark:from-slate-300 dark:to-slate-700 text-transparent">
            Integrate Your Defenses
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Discover how Vulnuris products and services work together to provide layered security.
          </p>
          <Link href="/contact?subject=Platform%20Demo" passHref legacyBehavior>
             <Button
               size="lg"
               className="px-8 py-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 text-white focus:ring-2 focus:ring-violet-400 hover:shadow-xl dark:hover:shadow-violet-900 transition duration-200 text-lg font-bold">
               Request a Demo
             </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;