import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle2, Cloud, Database, Lock, Server, Shield, CloudCog, CloudLightning, CloudRain } from 'lucide-react';

const features = [
  {
    title: 'Cloud Infrastructure Security',
    description: 'Secure your cloud infrastructure with comprehensive security assessments and monitoring.',
    icon: <CloudCog className="w-6 h-6" />,
    borderColor: 'border-blue-500/50',
    hoverBorderColor: 'group-hover:border-blue-500',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Cloud Access Security',
    description: 'Implement robust access controls and identity management for cloud resources.',
    icon: <CloudLightning className="w-6 h-6" />,
    borderColor: 'border-emerald-500/50',
    hoverBorderColor: 'group-hover:border-emerald-500',
    iconColor: 'text-emerald-500'
  },
  {
    title: 'Data Protection',
    description: 'Ensure your cloud-stored data is encrypted and protected against breaches.',
    icon: <CloudRain className="w-6 h-6" />,
    borderColor: 'border-purple-500/50',
    hoverBorderColor: 'group-hover:border-purple-500',
    iconColor: 'text-purple-500'
  }
];

const CloudSecurityPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-20 mt-10 lg:mt-20">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Navigation */}
          <div className="mb-16">
            <Link href="/services" className="group inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>
          </div>

          {/* Hero Content */}
          <div className="md:col-span-12 text-center mb-16">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-600/10 backdrop-blur-sm mb-6">
              <Cloud className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600 mb-6">
              Cloud Security
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Secure your cloud infrastructure with our comprehensive cloud security solutions.
            </p>
            <Link href="/contact" passHref legacyBehavior>
                <Button
                    size="lg"
                    className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl dark:hover:shadow-blue-900 transition duration-200 text-lg font-bold">
                    Get Started Today
                </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
                <Card 
                key={index} 
                className={`group relative overflow-hidden backdrop-blur-sm border-2 ${feature.borderColor} 
                    hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${feature.hoverBorderColor}`}
                >
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${feature.iconColor} bg-foreground/5`}>
                        {/* <feature.icon className="w-6 h-6" /> */}
                        {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                </Card>
            ))}
            </div>

          {/* Process Section */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
                <h2 className="text-3xl font-bold">Why Choose Our Services?</h2>
                <div className="space-y-4">
                  {[
  'Multi-Cloud Expertise',
  'Continuous Monitoring',
  'Compliance Management',
  '24/7 Support'
].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-600/5 hover:from-blue-500/10 hover:to-blue-600/10 transition-colors duration-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Our Process</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground mb-6">
                  We follow a systematic approach to identify and address security vulnerabilities in your systems.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                        icon: <Cloud className="w-6 h-6 text-blue-600" />,
                        title: "Cloud Assessment",
                        description: "Comprehensive evaluation of your cloud infrastructure, configurations, and security controls."
                      },
                      {
                        icon: <Lock className="w-6 h-6 text-blue-600" />,
                        title: "Security Implementation",
                        description: "Deploy and configure security controls, access management, and encryption measures."
                      },
                      {
                        icon: <Database className="w-6 h-6 text-blue-600" />,
                        title: "Data Protection",
                        description: "Implement data protection strategies including encryption, backup, and disaster recovery."
                      },
                      {
                        icon: <Server className="w-6 h-6 text-blue-600" />,
                        title: "Monitoring & Maintenance",
                        description: "Continuous monitoring of cloud resources with automated threat detection and response."
                      }

                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                          {step.title}
                          <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="md:col-span-12 text-center mt-5 mb-20">
            <div className="md:col-span-12 mt-8 rounded-md px-6 pt-12 pb-6 text-center border-t-2">
            <h3 className="text-3xl font-semibold mb-4 bg-clip-text bg-gradient-to-br from-blue-600 to-blue-950 dark:from-blue-300 dark:to-blue-700 text-transparent">
                Ready to Secure Your Cloud Infrastructure?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us today to discuss how we can help protect your cloud environment and ensure compliance.
            </p>
            <Link href="/contact" passHref legacyBehavior>
                <Button
                    size="lg"
                    className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl dark:hover:shadow-blue-900 transition duration-200 text-lg font-bold">
                    Request a Consultation
                </Button>
            </Link>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CloudSecurityPage;
