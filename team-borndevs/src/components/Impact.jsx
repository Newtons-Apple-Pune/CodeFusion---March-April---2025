import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Impact() {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Impact Delivered
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-500 to-blue-800 dark:to-blue-950 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Reduced Attack Surface for FinTech Leader
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              A major financial services client faced increasing targeted
              attacks. Our <strong className="text-blue-200">Find › Fix › Fortify</strong> cycle identified and remediated 95% of critical vulnerabilities within 3 months.
            </p>
            <p className="text-sm text-blue-100 font-medium">
              Result: Drastic reduction in intrusion attempts, enhanced
              compliance posture.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-violet-500 to-violet-800 dark:to-violet-950 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Secured Cloud Migration for SaaS Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              During a complex cloud transition, we provided continuous security
              validation, ensuring misconfigurations were fixed <strong className="text-violet-200">before</strong> they could be exploited.
            </p>
            <p className="text-sm text-violet-100 font-medium">
              Result: Seamless migration with zero security incidents, increased
              customer trust.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-cyan-500 to-cyan-800 dark:to-cyan-950 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Hardened IoT Infrastructure for Manufacturer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Identified critical flaws in connected devices. Our team provided
              specific firmware fixes and network segmentation strategies (<strong className="text-cyan-200">Fix & Fortify</strong>).
            </p>
            <p className="text-sm text-cyan-100 font-medium">
              Result: Secured product ecosystem, protected sensitive operational
              data.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}