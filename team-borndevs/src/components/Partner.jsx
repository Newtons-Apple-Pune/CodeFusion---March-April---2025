import { Card , CardHeader , CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export default function Partner(){
    return(
        <section className="mb-16">
                <div className="max-w-2xl mx-auto">
                    
                    <Card className="p-8 shadow-sm">
                        <CardHeader className="p-0 mb-6 text-center">
                            
                            <CardTitle className="text-3xl font-bold text-primary">Why Partner with Vulnuris?</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            
                            <ul className="list-none space-y-4 text-lg">
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 mt-1">✓</span>
                                    <span>Scalable, intuitive security solutions tailored to your needs.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 mt-1">✓</span>
                                    <span>Real-time threat intelligence and actionable remediation reports.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 mt-1">✓</span>
                                    <span>Proven expertise trusted by security teams across diverse industries.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary mr-3 mt-1">✓</span>
                                    <span>Dedicated expert guidance and responsive support when you need it.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center mt-20 mb-10">
                <h3 className="text-3xl font-semibold mb-4 bg-clip-text bg-gradient-to-br from-slate-500 to-slate-950 dark:from-slate-300 dark:to-slate-700 text-transparent">
                    Ready to Fortify Your Defenses?
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8">
                    Join us on the journey to secure the future. Let’s work together to <strong className="text-primary">Find</strong>, <strong className="text-primary">Fix</strong>, and <strong className="text-primary">Fortify</strong>. {/* Changed pink to primary */}
                </p>
                
                <Button
                    size="lg"
                    className="px-8 py-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 text-white focus:ring-2 focus:ring-violet-400 hover:shadow-xl dark:hover:shadow-violet-900 transition duration-200 text-lg font-bold">
                    Become a Partner
                </Button>
                </div>
        </section>
    )
}