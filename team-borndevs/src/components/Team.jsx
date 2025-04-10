import { Card, CardContent} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Button } from '@/components/ui/button';

export default function OurTeam(){
    const teamMembers = [
        { name: 'Sahil Dahekar', title: 'Principal Security Researcher', desc: 'Expert in reverse engineering and exploit development.', initials: 'SD', img: '/avatar1.jpg', span: 'lg:col-span-2' }, // Make first one larger on lg screens
        { name: 'Prathamesh Kirad', title: 'Lead Penetration Tester', desc: 'Specializes in network and web application security testing.', initials: 'PK', img: '/avatar2.jpeg' },
        { name: 'Abhijit Dhane', title: 'Cloud Security Architect', desc: 'Designs secure and resilient cloud-native solutions.', initials: 'AD', img: '/avatar3.jpeg' },
        { name: 'Priya Sharma', title: 'Threat Intelligence Analyst', desc: 'Monitors the threat landscape to provide proactive defense strategies.', initials: 'PS', img: '/avatar4.jpeg' },
         
      ];
    return(
        <section className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-8 text-primary" id="our-team">Meet the Experts</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            Our strength lies in our people – a diverse collective of passionate cybersecurity professionals dedicated to your protection.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {teamMembers.map((member, index) => (
                <Card
                    key={index}
                    
                    className={`p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center ${member.span || 'lg:col-span-1'}`}
                >
                <CardContent className="p-0 flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={member.img} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <h4 className="text-lg font-semibold text-primary">{member.name}</h4>
                    <p className="text-sm text-primary/80 font-medium mb-2">{member.title}</p>
                    <p className="text-xs text-muted-foreground">{member.desc}</p>
                </CardContent>
                </Card>
            ))}
            
            <Card className="p-6 shadow-sm bg-accent flex flex-col items-center justify-center text-center lg:col-span-1"> 
                <CardContent className="p-0">
                    <h4 className="text-lg font-semibold text-accent-foreground mb-2">Join Our Team?</h4>
                    <p className="text-sm text-accent-foreground/80 mb-4">We're always looking for talent.</p>
                    <Button variant="outline" size="sm">See Open Roles</Button>
                </CardContent>
            </Card>
        </div>

        </section>
    )
}