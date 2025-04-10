'use client';

import React from 'react';
import Approach from '@/components/OurAppoarch';
import OurTeam from '@/components/Team';
import Clients from '@/components/Clients';
import Partner from '@/components/Partner';
import Impact from '@/components/Impact';
import OurValues from '@/components/OurValues';
import { ChevronRight } from 'lucide-react';



const AboutPage = () => {
  return (
    
    <div className="min-h-screen bg-background text-foreground px-6 py-16 mt-10 lg:mt-20">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
    
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-violet-500 to-blue-900 text-transparent">
            About Vulnuris
          </h1>
    
          <p className="mt-4 text-xl text-muted-foreground flex items-center justify-center gap-1">Find <ChevronRight size={15} /> Fix <ChevronRight size={15} /> Fortify</p>
        </div>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            
            <h2 className="text-4xl font-bold mb-6 text-primary">Forging a Secure Digital Future</h2>
            
            <p className="text-lg leading-relaxed mb-4 text-justify lg:text-left">
              Vulnuris is more than just a cybersecurity company; we are architects of digital resilience. Founded by experts from the front lines of cyber defense, our team comprises elite ethical hackers, innovative engineers, and sharp analysts united by a single mission: <strong className="text-primary">to empower organizations against the relentless evolution of digital threats.</strong>
            </p>
            <p className="text-lg leading-relaxed text-justify lg:text-left">
              We delve deeper than surface-level scans, transforming security from a reactive measure into a proactive, strategic advantage. Our vision is a world where every organization, regardless of size, operates with the confidence that their critical assets are protected, enabling them to focus on growth and innovation.
            </p>
          </div>
          <div className="hidden md:block text-center">
             
             <div className="bg-accent w-full h-64 rounded-lg flex items-center justify-center">
             
             <img
              src="./assets/products/about.jpg"
              alt="Phished-Partner logo"
              className='object-cover w-full h-full rounded-lg'
            />
             </div>
          </div>
        </section>

        <Approach/>
        <Impact/>
        <Clients/>
       <OurValues/>
        <OurTeam/>
        <Partner/>
        

      </div>
    </div>
  );
};

export default AboutPage;