import React from 'react';
import { Building2, Shield, Users, Calendar, ClipboardList, MessageSquare, FileText, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold text-navy-950 dark:text-white">WorkBench</span>
          </div>
          <div className="space-x-2 hidden md:flex">
            <Button variant="outline" onClick={() => navigate('/sign-in')}>Log in</Button>
            <Button onClick={() => navigate('/sign-up')}>Sign up</Button>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="py-12 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Enterprise-Grade Security
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-navy-950 dark:text-white mb-6">
            Secure Workspace Management <br className="hidden md:block" />
            for the Modern Enterprise
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            A comprehensive platform for cybersecurity-focused companies operating in hybrid work environments.
            Manage workspaces, employees, and projects with advanced security features.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => navigate('/sign-up')} className="bg-teal-600 hover:bg-teal-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/sign-in')}>
              Log in
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-950 dark:text-white mb-4">Comprehensive Features</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to manage a secure and efficient workplace in one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Building2 className="h-10 w-10 text-teal-600" />}
              title="Workspace Management"
              description="Book desks and meeting rooms with an intuitive visual interface."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-blue-600" />}
              title="Employee Directory"
              description="Manage employee profiles, roles, and departments securely."
            />
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-purple-600" />}
              title="Attendance & Leave"
              description="Track attendance and manage leave requests efficiently."
            />
            <FeatureCard 
              icon={<ClipboardList className="h-10 w-10 text-orange-600" />}
              title="Project Management"
              description="Organize projects and tasks with Kanban boards and tracking."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-10 w-10 text-red-600" />}
              title="Announcements"
              description="Company-wide communication and important updates."
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-emerald-600" />}
              title="Document Storage"
              description="Secure storage for company policies and documents."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-indigo-600" />}
              title="Role-Based Access"
              description="Granular security with role-based permissions."
            />
            <FeatureCard 
              icon={<BrainCircuit className="h-10 w-10 text-fuchsia-600" />}
              title="AI Insights"
              description="AI-powered analytics and insights for data-driven decisions."
            />
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 px-4 md:px-8 bg-navy-950 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your workplace?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join the growing number of companies using WorkBench to manage their hybrid work environments securely and efficiently.
          </p>
          <Button size="lg" onClick={() => navigate('/sign-up')} className="bg-teal-600 hover:bg-teal-700">
            Sign Up Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building2 className="h-6 w-6 text-teal-500" />
              <span className="text-xl font-bold text-white">WorkBench</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} WorkBench. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg border border-slate-100 dark:border-slate-600">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-navy-950 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
};

export default Index;