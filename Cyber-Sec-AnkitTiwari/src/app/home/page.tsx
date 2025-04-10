import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Secure Your Digital Future
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Advanced cyber security solutions for enterprises worldwide.
              </p>
              <button className="bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 relative h-[400px] flex items-center justify-center">
              <div className="w-72 h-72 bg-accent/30 rounded-full blur-3xl absolute -z-10 animate-pulse" />
              <div className="text-[6rem] animate-bounce">🔒</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Security Assessment", "Threat Intelligence", "Incident Response"].map((title, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-600">
                  {i === 0 && "Comprehensive security audits and vulnerability assessments"}
                  {i === 1 && "Real-time threat monitoring and intelligence services"}
                  {i === 2 && "Rapid response and recovery from security incidents"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">About Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              We are a team of cyber security experts dedicated to protecting your
              digital assets. With years of experience in the industry, we provide
              cutting-edge solutions to keep your business secure.
            </p>
            <button className="bg-accent text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Emerging Cyber Threats in 2024",
                desc: "Stay ahead of the latest cyber security threats and trends"
              },
              {
                title: "Best Practices for Enterprise Security",
                desc: "Essential security measures for modern enterprises"
              },
              {
                title: "AI in Cyber Security",
                desc: "How artificial intelligence is transforming security"
              }
            ].map((post, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.desc}</p>
                <a href="#" className="text-accent hover:underline font-medium">
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-600 mb-4">
                  "CyberSec has transformed our security posture. Their expertise and dedication are unmatched."
                </p>
                <div className="font-semibold">John Doe</div>
                <div className="text-gray-500 text-sm">CEO, TechCorp</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Cyber Security News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {["Latest Security Breach Report", "Industry Updates"].map((headline, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{headline}</h3>
                <p className="text-gray-600">
                  {i === 0
                    ? "Analysis of recent security incidents and preventive measures"
                    : "Stay informed about the latest developments in cyber security"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Center */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Resource Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Whitepapers", "Case Studies", "Knowledge Base"].map((title, i) => (
              <div key={i} className="card bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-200">
                  {i === 0 && "In-depth analysis and research on security topics"}
                  {i === 1 && "Real-world examples of our security solutions"}
                  {i === 2 && "Comprehensive guides and documentation"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
