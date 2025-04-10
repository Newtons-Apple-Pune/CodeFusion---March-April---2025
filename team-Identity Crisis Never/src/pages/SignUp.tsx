import React from 'react';
import { SignUp as ClerkSignUp, useUser } from '@clerk/clerk-react';
import { Building2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-blue-900 text-white p-4">
      {/* Background blobs for visual effect similar to landing page */}
      <div className="absolute top-1/4 -right-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 -left-24 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Building2 className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">WorkBench</h1>
        </div>
        <p className="text-blue-100 max-w-md">
          Sign up to access your workspace management platform
        </p>
      </div>
      
      <div className="w-full max-w-md animate-fade-in delay-200">
        <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-lg shadow-xl border border-blue-900/50 p-6">
          <ClerkSignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                footerActionLink: 'text-blue-400 hover:text-blue-300',
                card: 'bg-transparent shadow-none',
                header: 'text-white',
                headerTitle: 'text-white text-xl',
                headerSubtitle: 'text-blue-100',
                socialButtonsBlockButton: 'border-blue-800 text-white hover:bg-blue-800/30',
                socialButtonsBlockButtonText: 'text-white',
                formFieldLabel: 'text-blue-100',
                formFieldInput: 'bg-blue-900/30 border-blue-800 text-white placeholder-blue-300/50 focus:border-blue-500',
                alert: 'bg-red-900/30 border-red-800 text-red-200',
                dividerLine: 'bg-blue-800',
                dividerText: 'text-blue-300',
                identityPreviewTextContainer: 'text-white',
                identityPreviewText: 'text-white',
                formFieldAction: 'text-blue-400 hover:text-blue-300',
                otpCodeFieldInput: 'bg-blue-900/30 border-blue-800 text-white',
                footer: 'text-blue-100',
                formFieldErrorText: 'text-red-300',
                main: 'text-white',
              }
            }}
          />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <a href="/admin" className="text-blue-300 hover:text-blue-200 text-sm">
          Admin & HR Login
        </a>
      </div>
    </div>
  );
};

export default SignUp;