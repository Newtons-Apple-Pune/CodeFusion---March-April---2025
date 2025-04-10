import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldAlert } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@clerk/clerk-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();

  // Demo credentials - in a real app, these would be validated against a secure backend
  const adminCredentials = {
    email: 'admin@workbench.com',
    password: 'admin123'
  };

  const hrCredentials = {
    email: 'hr@workbench.com',
    password: 'hr123'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        // Admin login successful
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Update user metadata through Clerk (this would happen on the backend in a real app)
        if (user) {
          try {
            // Note: In a real app, this would be done on the backend
            // This is just a simulation for demo purposes
            console.log("Would set user role to admin via Clerk backend");
            // In a real scenario, you would call an API that updates Clerk metadata
          } catch (error) {
            console.error("Error updating role:", error);
          }
        }
        
        navigate('/dashboard');
      } else if (email === hrCredentials.email && password === hrCredentials.password) {
        // HR login successful
        toast({
          title: "HR Login Successful",
          description: "Welcome to the HR dashboard",
        });
        
        // Update user metadata through Clerk (this would happen on the backend in a real app)
        if (user) {
          try {
            // Note: In a real app, this would be done on the backend
            // This is just a simulation for demo purposes
            console.log("Would set user role to hr via Clerk backend");
            // In a real scenario, you would call an API that updates Clerk metadata
          } catch (error) {
            console.error("Error updating role:", error);
          }
        }
        
        navigate('/dashboard');
      } else {
        // Login failed
        toast({
          title: "Authentication Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-blue-900 text-white p-4">
      {/* Background blobs for visual effect */}
      <div className="absolute top-1/4 -right-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 -left-24 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <ShieldAlert className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Admin & HR Portal</h1>
        </div>
        <p className="text-blue-100 max-w-md">
          Access admin and HR functionalities
        </p>
      </div>
      
      <div className="w-full max-w-md animate-fade-in delay-200">
        <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-lg shadow-xl border border-blue-900/50 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800 rounded-md text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@workbench.com or hr@workbench.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-blue-900/30 border border-blue-800 rounded-md text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {isLoading ? "Authenticating..." : "Log In"}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-blue-200">
                Demo Credentials:
              </p>
              <div className="mt-2 text-xs text-blue-300 space-y-1">
                <p>Admin: admin@workbench.com / admin123</p>
                <p>HR: hr@workbench.com / hr123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-6 text-center animate-fade-in delay-500">
        <a href="/sign-in" className="text-blue-300 hover:text-blue-200 text-sm">
          Return to regular sign in
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
