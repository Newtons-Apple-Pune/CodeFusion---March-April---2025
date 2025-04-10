'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Building } from 'lucide-react';



const MapPlaceholder = ({ className }) => (
    <div className={`bg-muted rounded-lg flex items-center justify-center h-full min-h-[200px] ${className}`}>
        <MapPin className="w-8 h-8 text-muted-foreground mr-2" />
        <p className="text-muted-foreground font-medium">Map Placeholder</p>
    </div>
);


const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 font-primary mt-10 lg:mt-20">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold font-secondary bg-clip-text bg-gradient-to-br from-violet-500 to-blue-900 text-transparent">
            Get In Touch
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about securing your organization? Reach out and let's start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 auto-rows-auto">

          <Card className="lg:row-span-2 order-1">
            <CardHeader>
              <CardTitle className="text-3xl">Send Us a Message</CardTitle>
              <CardDescription>We'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="jane.doe@example.com" required />
                  </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Example Corp" />
                  </div>
                 <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Question about Pen Testing" required />
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" placeholder="How can we help you secure your assets?" required rows={8} className="min-h-[150px] resize-none"/>
                </div>
                <Button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-b from-violet-500 to-violet-600 text-white focus:ring-2 focus:ring-violet-400 hover:shadow-xl dark:hover:shadow-violet-900 transition duration-200 text-md">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          

          <Card className="lg:row-span-1 order-3">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="flex items-start space-x-3">
                <Building className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Our Office</h4>
                  <p className="text-muted-foreground">
                    123 Cyber Street<br />
                    Secure City, SC 13370<br />
                    Pune, Maharashtra, India
                  </p>
                </div>
              </div>
               <div className="flex items-start space-x-3">
                 <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                 <div>
                   <h4 className="font-semibold text-foreground">Email Us</h4>
                   <a href="mailto:hello@vulnuris.com" className="text-muted-foreground hover:text-primary transition-colors">
                     hello@vulnuris.com
                   </a> <br/>
                   <a href="mailto:support@vulnuris.com" className="text-muted-foreground hover:text-primary transition-colors">
                     support@vulnuris.com
                   </a>
                 </div>
               </div>
               <div className="flex items-start space-x-3">
                 <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                 <div>
                    <h4 className="font-semibold text-foreground">Call Us</h4>
                    <a href="tel:+91XXXXXXXXXX" className="text-muted-foreground hover:text-primary transition-colors block">
                      +91 (XXX) XXX-XXXX (Sales)
                    </a>
                    <a href="tel:+91YYYYYYYYYY" className="text-muted-foreground hover:text-primary transition-colors block">
                      +91 (YYY) YYY-YYYY (Support)
                    </a>
                 </div>
               </div>
            </CardContent>
          </Card>

          <Card className="lg:row-span-1 order-2 p-4">
            <div className="w-full h-[200px] rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Bhosari%20Rd,%20Sector%20No.%2011,%20Chikhali,%20Pimpri-Chinchwad,%20Maharashtra%20412105+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>


           

        </div>
      </div>
    </div>
  );
};

export default ContactPage;