import Certification from '@/components/Certification';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Map from '@/components/Map';
import WhatWeDo from '@/components/WhatWeDo';

export default function Home() {
  return (
    <div className='lg:mt-20 px-3 lg:px-0'>
      <Hero />
      <WhatWeDo />
      <Testimonials />
      <Map/>
      <Certification />
    </div>
  );
}
