import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SectionVisibility {
  stats?: boolean;
  features?: boolean;
  'how-it-works'?: boolean;
  free?: boolean;
  contact?: boolean;
  [key: string]: boolean | undefined;
}

const DeskManagementLanding = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState<SectionVisibility>({});

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check if elements are in viewport for animations
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const elementId = section.id || section.getAttribute('data-section-id'); // Use ID or a custom attribute
        if (elementId && sectionTop < window.innerHeight * 0.75) {
          setIsVisible(prev => ({ ...prev, [elementId]: true }));
        }
      });
    };

    // Initial check in case sections are already visible on load
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize counter for stats
  useEffect(() => {
    // Ensure the stats section is visible before starting the animation
    if (isVisible.stats) {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        // Prevent re-animating if already animated
        if (counter.getAttribute('data-animated') === 'true') return;

        counter.setAttribute('data-animated', 'true'); // Mark as animated
        const target = +(counter.getAttribute('data-target') || '0');
        const duration = 2000; // ms
        const frameDuration = 1000 / 60; // approx 16ms for 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const increment = target / totalFrames;

        let currentCount = 0;
        const updateCounter = () => {
          currentCount += increment;
          if (currentCount < target) {
            if (counter instanceof HTMLElement) {
              counter.innerText = Math.ceil(currentCount).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
          } else {
            if (counter instanceof HTMLElement) {
              counter.innerText = target.toLocaleString(); // Ensure final value is exact
            }
          }
        };

        requestAnimationFrame(updateCounter);
      });
    }
  }, [isVisible.stats]); // Dependency ensures this runs when isVisible.stats changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white font-sans"> {/* Added font-sans for better default */}
      {/* Navbar */}
      <nav className={`fixed w-full px-6 py-4 transition-all duration-300 z-50 ${isScrolled ? 'bg-black bg-opacity-90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}> {/* Added backdrop-blur */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with Animation */}
          <a href="#top" className="flex items-center space-x-2 group"> {/* Make logo a link to top */}
            <svg className="w-8 h-8 text-blue-500 group-hover:animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> {/* Adjusted animation */}
              <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V5Z" stroke="url(#gradient)" strokeWidth="2"/>
              <path d="M4 19H20" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="4" y1="4" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" /> {/* blue-400 */}
                  <stop offset="1" stopColor="#3B82F6" /> {/* blue-500 */}
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 group-hover:text-blue-300 transition-colors">WorkBench</span>
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="hover:text-blue-400 transition-colors relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#features" className="hover:text-blue-400 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#free" className="hover:text-blue-400 transition-colors relative group">
              Free Access
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-blue-400 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>

            {/* Search Bar with Animation */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 text-sm rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 transition-all duration-300 focus:w-48 placeholder-gray-500" // Improved styling
              />
              <svg className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/sign-in" className="text-blue-300 hover:text-blue-200 transition-colors">
              Sign In
            </Link>
            <Link to="/sign-up" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
        {/* Mobile Menu (Hidden by default, implement visibility toggle with state if needed) */}
        {/* <div className="md:hidden"> ... Mobile links ... </div> */}
      </nav>

      {/* Hero Section with Enhanced Animations */}
      <header id="top" className="h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden"> {/* Added id="top" */}
        {/* Abstract Background Elements with Enhanced Animations */}
        {/* Using Tailwind CSS for keyframes */}
        <div className="absolute top-1/4 -right-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 -left-24 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Floating Elements Animation */}
        <div className="absolute w-full h-full pointer-events-none">
          <div className="absolute animate-float" style={{top: '10%', left: '10%'}}> {/* Use absolute positioning and animation class */}
            <svg className="w-8 h-8 text-blue-500 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 1-1h12zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
          </div>
          <div className="absolute animate-float animation-delay-1000" style={{top: '15%', right: '15%'}}> {/* Add delay utility */}
            <svg className="w-6 h-6 text-blue-300 opacity-40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
          <div className="absolute animate-float animation-delay-2000" style={{bottom: '20%', left: '20%'}}> {/* Add delay utility */}
            <svg className="w-10 h-10 text-blue-400 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
              <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 8.5A.5.5 0 0 1 .5 8H1.866a4.5 4.5 0 0 1 8.268 0H11.5a.5.5 0 0 1 0 1h-1.366a4.5 4.5 0 0 1-8.268 0H.5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
        </div>

        <div className="text-center z-10 max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 animate-text-gradient"> {/* Use extrabold */}
            Streamline Your Workspace Management
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto">
            The all-in-one <span className="font-semibold text-blue-300">100% FREE</span> solution for managing desk bookings, office resources, and workspace optimization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"> {/* Increased gap */}
            <Link to="/sign-up" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 animate-pulse-slow">
              Get Started For Free
            </Link>
            <a href="#demo" className="px-8 py-3 border-2 border-blue-500 rounded-full text-lg font-semibold text-blue-300 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section id="stats" data-section-id="stats" className="py-16 px-4 bg-black bg-opacity-50 animate-on-scroll">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className={`transform transition-all duration-500 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                <span className="counter" data-target="10000">0</span>+
              </h3>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Active Users</p>
            </div>
            <div className={`transform transition-all duration-500 delay-150 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                <span className="counter" data-target="500">0</span>+
              </h3>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Companies</p>
            </div>
            <div className={`transform transition-all duration-500 delay-300 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                <span className="counter" data-target="30">0</span>%
              </h3>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Space Optimization</p>
            </div>
            <div className={`transform transition-all duration-500 delay-450 ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                <span className="counter" data-target="99">0</span>%
              </h3>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" data-section-id="how-it-works" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
            How SecureWork OS Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
             {/* Connecting lines for Desktop */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent w-2/3 mx-auto"></div>
             <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-1 bg-blue-600 w-1/3"></div>

            <div className={`relative text-center md:text-left transition-all duration-700 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0 shadow-lg shadow-teal-500/30">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
              <p className="text-gray-300">Create your account in seconds with our streamlined registration process. Get immediate access to workspace management tools.</p>
            </div>

            <div className={`relative text-center md:text-left transition-all duration-700 delay-200 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0 shadow-lg shadow-teal-500/30">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Up Your Workspace</h3>
              <p className="text-gray-300">Map your office layout, set desk locations, and customize booking rules to match your organization's needs.</p>
            </div>

            <div className={`relative text-center md:text-left transition-all duration-700 delay-400 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0 shadow-lg shadow-teal-500/30">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Managing</h3>
              <p className="text-gray-300">Invite team members, begin booking desks, and access real-time analytics to optimize your workspace efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animations */}
      <section id="features" data-section-id="features" className="py-20 px-4 bg-black bg-opacity-20 animate-on-scroll">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
            Powerful Features for Modern Workspaces
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className={`bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 012-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Booking System</h3>
              <p className="text-gray-300">Intuitive calendar interface with drag-and-drop booking, recurring reservations, and real-time availability updates.</p>
            </div>

            {/* Feature Card 2 */}
            <div className={`bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 delay-100 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 012-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-300">Comprehensive workspace utilization metrics, booking patterns, and capacity optimization insights.</p>
            </div>

            {/* Feature Card 3 */}
            <div className={`bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 delay-200 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-300">Coordinate desk assignments, plan team seating arrangements, and manage shared resources effortlessly.</p>
            </div>

            {/* Feature Card 4 */}
            <div className={`bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 delay-300 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
             <div className="bg-teal-600 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile App Integration</h3>
              <p className="text-gray-300">Book desks on-the-go with our responsive mobile application. Get notifications and updates directly on your phone.</p>
            </div>

            {/* Feature Card 5 */}
            <div className={`bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 delay-400 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-teal-600 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Security</h3>
              <p className="text-gray-300">Enterprise-grade security features to protect your workspace data with role-based access controls and audit logs.</p>
            </div>

            {/* Feature Card 6 */}
            <div className={`bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 delay-500 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
             <div className="bg-teal-600 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Workflows</h3>
              <p className="text-gray-300">Streamline processes with automated check-ins, cleaning schedules, and maintenance notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="free" data-section-id="free" className="py-20 px-4 bg-gradient-to-b from-black/20 to-blue-900/30 animate-on-scroll">
        <div className="container mx-auto text-center max-w-4xl">
          <div className={`transition-opacity duration-1000 ${isVisible.free ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-blue-400 font-medium uppercase tracking-widest">Enterprise Solution</span>
            <h2 className="text-4xl md:text-5xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500">
              Secure Workspace Management for Modern Enterprises
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-12">
              We provide comprehensive workspace management solutions for enterprises with advanced security features, role-based access control, and customizable workflows.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-black/50 backdrop-blur-sm p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>

            <h3 className="text-2xl font-semibold mb-8 relative z-10">Enterprise Features:</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left mb-10 relative z-10">
              {/* Feature List Items */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Role-Based Access Control</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Interactive Office Maps</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Advanced Analytics</span>
              </div>
               <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Team Management</span>
              </div>
               <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Mobile Accessibility</span>
              </div>
               <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority Support</span>
              </div>
            </div>

            {/* Call to Action Button */}
            <button onClick={() => navigate('/sign-up')} className="inline-block px-10 py-4 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 relative z-10">
              Sign Up Now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
       <section id="contact" data-section-id="contact" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto max-w-2xl text-center">
             <h2 className={`text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 transition-opacity duration-1000 ${isVisible.contact ? 'opacity-100' : 'opacity-0'}`}>
                Get In Touch
             </h2>
             <p className={`text-lg text-blue-100 mb-10 transition-opacity duration-1000 ${isVisible.contact ? 'opacity-100' : 'opacity-0'}`}>
                 Have questions or need assistance? We're here to help. Reach out to our support team.
             </p>
             <form className={`space-y-6 transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <input type="text" placeholder="Your Name" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                     <input type="email" placeholder="Your Email" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                 </div>
                 <textarea placeholder="Your Message" rows={5} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"></textarea>
                 <button type="submit" className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50">
                     Send Message
                 </button>
             </form>
         </div>
     </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-black bg-opacity-70 text-center text-gray-400">
        <div className="container mx-auto">
          <div className="mb-4">
             {/* Footer Links */}
            <a href="#how-it-works" className="px-3 hover:text-blue-300 transition-colors">How it Works</a> |
            <a href="#features" className="px-3 hover:text-blue-300 transition-colors">Features</a> |
            <a href="#free" className="px-3 hover:text-blue-300 transition-colors">Free Access</a> |
            <a href="#contact" className="px-3 hover:text-blue-300 transition-colors">Contact</a> |
            <Link to="/admin" className="px-3 hover:text-blue-300 transition-colors">Admin/HR Login</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Workbench. All rights reserved.</p>
          <p className="text-sm mt-2">Built with ❤️ and React</p>
        </div>
      </footer>
    </div>
  );
};

export default DeskManagementLanding;
