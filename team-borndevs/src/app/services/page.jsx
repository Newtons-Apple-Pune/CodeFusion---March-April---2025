import Link from 'next/link'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ScanSearch, CloudCog, Target, AlertTriangle, Users } from 'lucide-react'; 


const services = [
  {
    title: "Penetration Testing",
    description: "Simulate real-world attacks to identify and exploit vulnerabilities before malicious actors do.",
    icon: <ShieldCheck className="w-10 h-10 text-primary flex-shrink-0" />,
    link: "/services/pentesting"
  },
  {
    title: "Vulnerability Assessment",
    description: "Comprehensive scanning and analysis to uncover weaknesses across your network, applications, and infrastructure.",
    icon: <ScanSearch className="w-10 h-10 text-cyan-500 flex-shrink-0" />,
    link: "/services/vulnerability-assessment"
  },
  {
    title: "Cloud Security",
    description: "Secure your cloud environments (AWS, Azure, GCP) with configuration reviews, architecture design, and monitoring.",
    icon: <CloudCog className="w-10 h-10 text-blue-500 flex-shrink-0" />,
    link: "/services/cloud-security"
  },
  {
    title: "Threat Intelligence",
    description: "Stay ahead of emerging threats with proactive monitoring, analysis, and tailored intelligence reporting.",
    icon: <Target className="w-10 h-10 text-orange-500 flex-shrink-0" />,
    link: "/services/threat-intelligence"
  },
  {
    title: "Incident Response",
    description: "Rapid response and containment services to minimize damage and recover quickly from security breaches.",
    icon: <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0" />,
    link: "/services/incident-response"
  },
  {
    title: "Security Advisory",
    description: "Strategic guidance, policy development, and CISO-as-a-Service to mature your overall security posture.",
    icon: <Users className="w-10 h-10 text-emerald-500 flex-shrink-0" />,
    link: "/services/security-advisory"
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 font-primary mt-10 lg:mt-20">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold font-secondary bg-clip-text bg-gradient-to-br from-violet-500 to-blue-900 text-transparent">
            Our Cybersecurity Services
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            From proactive defense to rapid response, Vulnuris offers a comprehensive suite of services to protect your digital assets and ensure resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <Card key={index} className="flex flex-col h-full shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center space-x-4">
                  {service.icon}
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
                <div className="px-6">
                  <Link href={service.link} passHref legacyBehavior>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <h3 className="text-3xl font-semibold mb-4 bg-clip-text bg-gradient-to-br from-slate-500 to-slate-950 dark:from-slate-300 dark:to-slate-700 text-transparent">
            Ready to Enhance Your Security?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss your specific needs and how Vulnuris can tailor a solution for you.
          </p>
          <Link href="/contact" passHref legacyBehavior>
             <Button
               size="lg"
               className="px-8 py-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 text-white focus:ring-2 focus:ring-violet-400 hover:shadow-xl dark:hover:shadow-violet-900 transition duration-200 text-lg font-bold">
               Request a Consultation
             </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;