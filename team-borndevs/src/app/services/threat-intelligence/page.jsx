import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Globe2,
  Signal,
  Activity,
  AlertTriangle,
  BarChart,
  Brain,
} from "lucide-react";

const features = [
  {
    title: "Threat Monitoring",
    description:
      "24/7 monitoring of emerging threats and potential security risks.",
    icon: <Eye className="w-6 h-6" />,
    borderColor: "border-red-500/50",
    hoverBorderColor: "group-hover:border-red-500",
    iconColor: "text-red-500",
  },
  {
    title: "Global Intelligence",
    description: "Access to worldwide threat data and security insights.",
    icon: <Globe2 className="w-6 h-6" />,
    borderColor: "border-indigo-500/50",
    hoverBorderColor: "group-hover:border-indigo-500",
    iconColor: "text-indigo-500",
  },
  {
    title: "Threat Analysis",
    description: "Advanced analysis of threat patterns and attack vectors.",
    icon: <Signal className="w-6 h-6" />,
    borderColor: "border-amber-500/50",
    hoverBorderColor: "group-hover:border-amber-500",
    iconColor: "text-amber-500",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-20 mt-10 lg:mt-20">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Navigation */}
          <div className="mb-16">
            <Link
              href="/services"
              className="group inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Hero Content */}
            <div className="md:col-span-12 text-center mb-16">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm mb-6">
                <Activity className="w-16 h-16 text-amber-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-600 mb-6">
                Threat Intelligence
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Stay ahead of cyber threats with our advanced threat
                intelligence and monitoring services.
              </p>
              <Link href="/contact" passHref legacyBehavior>
                <Button
                  size="lg"
                  className="px-8 py-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 text-white focus:ring-2 focus:ring-amber-400 hover:shadow-xl dark:hover:shadow-amber-900 transition duration-200 text-lg font-bold"
                >
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
                      <div
                        className={`p-2 rounded-lg ${feature.iconColor} bg-foreground/5`}
                      >
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Why Choose Our Services?</h2>
                <div className="space-y-4">
                  {[
                    "Proactive Threat Detection",
                    "Real-time Alert System",
                    "Customized Intelligence Reports",
                    "24/7 Monitoring Coverage",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-amber-500/5 to-amber-600/5 hover:from-amber-500/10 hover:to-amber-600/10 transition-colors duration-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-600" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">Our Process</h2>
                <div className="space-y-6">
                  <p className="text-muted-foreground mb-6">
                    We employ a comprehensive approach to gather, analyze, and
                    act on threat intelligence.
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        icon: (
                          <AlertTriangle className="w-6 h-6 text-amber-600" />
                        ),
                        title: "Threat Detection",
                        description:
                          "Continuous monitoring and identification of potential threats using advanced detection systems.",
                      },
                      {
                        icon: <Brain className="w-6 h-6 text-amber-600" />,
                        title: "Analysis & Correlation",
                        description:
                          "Advanced analysis of threat data to identify patterns and potential attack vectors.",
                      },
                      {
                        icon: <BarChart className="w-6 h-6 text-amber-600" />,
                        title: "Risk Assessment",
                        description:
                          "Evaluation of threat impact and likelihood to prioritize security responses.",
                      },
                      {
                        icon: <Activity className="w-6 h-6 text-amber-600" />,
                        title: "Active Response",
                        description:
                          "Implementation of protective measures and continuous monitoring of threat landscape.",
                      },
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-200">
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                            {step.title}
                            <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </h3>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
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
                  <h3 className="text-3xl font-semibold mb-4 bg-clip-text bg-gradient-to-br from-amber-600 to-amber-950 dark:from-amber-300 dark:to-amber-700 text-transparent">
                    Ready to Strengthen Your Threat Intelligence?
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                    Contact us today to learn how our threat intelligence
                    services can help protect your organization.
                  </p>
                  <Link href="/contact" passHref legacyBehavior>
                    <Button
                      size="lg"
                      className="px-8 py-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 text-white focus:ring-2 focus:ring-amber-400 hover:shadow-xl dark:hover:shadow-amber-900 transition duration-200 text-lg font-bold"
                    >
                      Request a Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
