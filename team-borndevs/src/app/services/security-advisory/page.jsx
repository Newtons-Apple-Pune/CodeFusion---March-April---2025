import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  LineChart,
  ClipboardCheck,
  Scale,
  Building2,
} from "lucide-react";

const features = [
  {
    title: "Risk Assessment",
    description:
      "Comprehensive evaluation of security risks and business impact analysis.",
    icon: <Scale className="w-6 h-6" />,
    borderColor: "border-emerald-500/50",
    hoverBorderColor: "group-hover:border-emerald-500",
    iconColor: "text-emerald-500",
  },
  {
    title: "Security Architecture",
    description: "Design and implementation of robust security frameworks.",
    icon: <Building2 className="w-6 h-6" />,
    borderColor: "border-blue-500/50",
    hoverBorderColor: "group-hover:border-blue-500",
    iconColor: "text-blue-500",
  },
  {
    title: "Compliance Management",
    description:
      "Ensure adherence to industry regulations and security standards.",
    icon: <ClipboardCheck className="w-6 h-6" />,
    borderColor: "border-purple-500/50",
    hoverBorderColor: "group-hover:border-purple-500",
    iconColor: "text-purple-500",
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
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm mb-6">
                <BookOpen className="w-16 h-16 text-emerald-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-600 mb-6">
                Security Advisory
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Strategic guidance and expert consultation to strengthen your
                organization's security posture.
              </p>
              <Link href="/contact" passHref legacyBehavior>
                <Button
                  size="lg"
                  className="px-8 py-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 text-white focus:ring-2 focus:ring-emerald-400 hover:shadow-xl dark:hover:shadow-emerald-900 transition duration-200 text-lg font-bold"
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
                        {/* <feature.icon className="w-6 h-6" /> */}
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
                    "Strategic Security Planning",
                    "Regulatory Compliance",
                    "Security Program Development",
                    "CISO Advisory Services",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 hover:from-emerald-500/10 hover:to-emerald-600/10 transition-colors duration-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6">Our Process</h2>
                <div className="space-y-6">
                  <p className="text-muted-foreground mb-6">
                    We provide comprehensive security advisory services to help
                    organizations build and maintain robust security programs.
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        icon: <Scale className="w-6 h-6 text-emerald-600" />,
                        title: "Assessment & Analysis",
                        description:
                          "Evaluate current security posture and identify areas for improvement through comprehensive risk assessment.",
                      },
                      {
                        icon: (
                          <Building2 className="w-6 h-6 text-emerald-600" />
                        ),
                        title: "Strategy Development",
                        description:
                          "Create tailored security roadmaps and programs aligned with your business objectives and risk appetite.",
                      },
                      {
                        icon: (
                          <ClipboardCheck className="w-6 h-6 text-emerald-600" />
                        ),
                        title: "Implementation Guidance",
                        description:
                          "Provide expert guidance on security controls, policies, and procedures implementation.",
                      },
                      {
                        icon: (
                          <LineChart className="w-6 h-6 text-emerald-600" />
                        ),
                        title: "Continuous Improvement",
                        description:
                          "Regular reviews and updates to ensure your security program evolves with emerging threats and business needs.",
                      },
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-200">
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                            {step.title}
                            <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
                <h3 className="text-3xl font-semibold mb-4 bg-clip-text bg-gradient-to-br from-emerald-600 to-emerald-950 dark:from-emerald-300 dark:to-emerald-700 text-transparent">
                  Ready to Transform Your Security Strategy?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Contact us today to learn how our advisory services can help
                  strengthen your security program.
                </p>
                <Link href="/contact" passHref legacyBehavior>
                  <Button
                    size="lg"
                    className="px-8 py-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 text-white focus:ring-2 focus:ring-emerald-400 hover:shadow-xl dark:hover:shadow-emerald-900 transition duration-200 text-lg font-bold"
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
