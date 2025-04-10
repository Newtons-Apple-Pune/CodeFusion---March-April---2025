import { Card, CardContent} from '@/components/ui/card'; 
import { ChevronDown, ChevronRight, Search, Shield, Wrench } from 'lucide-react';
export default function Approach(){
return (
    <section className="mb-16">
           <Card className="p-8 shadow-sm"> 
             <CardContent className="p-0">                
                <h2 className="text-3xl font-bold mb-8 text-center text-primary flex flex-col lg:flex-row items-center justify-center">Our Approach: <span className='hidden lg:ml-2 lg:flex lg:items-center'> Find <ChevronRight/>  Fix <ChevronRight/> Fortify</span></h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg text-center">
                
                   <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-blue-500 to-blue-800 dark:to-blue-950 text-white"> 
                     <CardContent className="p-0 flex flex-col items-center">
                       <span className="text-5xl mb-3 inline-block text-blue-100"><Search /></span>
                       
                       <h3 className="font-semibold text-xl mb-2">Find</h3>
                       
                       <p className="text-blue-100">Discover hidden vulnerabilities using advanced scanning, penetration testing, and AI-driven threat intelligence.</p>
                     </CardContent>
                   </Card>
                   <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-violet-500 to-violet-800 dark:to-violet-950 text-white">
                     <CardContent className="p-0 flex flex-col items-center">
                       <span className="text-5xl mb-3 inline-block text-violet-100"><Wrench /></span>
                       <h3 className="font-semibold text-xl mb-2">Fix</h3>
                       <p className="text-violet-100">Deliver prioritized, actionable remediation guidance and support to eliminate security weaknesses effectively.</p>
                     </CardContent>
                   </Card>
                   <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-cyan-500 to-cyan-800 dark:to-cyan-950 text-white">
                     <CardContent className="p-0 flex flex-col items-center">
                       <span className="text-5xl mb-3 inline-block text-cyan-100"><Shield /></span>
                       <h3 className="font-semibold text-xl mb-2">Fortify</h3>
                       <p className="text-cyan-100">Strengthen defenses with continuous monitoring, security hardening, and strategic advisory services.</p>
                     </CardContent>
                   </Card>
                </ul>
             </CardContent>
           </Card>
        </section>
    )
}
