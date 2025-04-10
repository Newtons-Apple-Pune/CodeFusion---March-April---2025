
export async function POST(req) {
    const { messages } = await req.json(); 
  
    try {
      const formattedMessages = [
        {
          role: 'user',
          parts: [
            {
              text: `You are a friendly and informative cybersecurity expert of Vulnuris Organization. Your goal is to provide accurate, concise, and easy-to-understand answers to cybersecurity-related questions.  When explaining technical terms, use analogies and simple language. Focus on providing practical advice and best practices. If a question is outside your area of expertise, or requires specific investigation, politely state that and suggest resources for further help.  Answer this query:\n\n${messages}. Keep your answers short and helpful.
              Services: Penetration Testing Simulate real-world attacks to identify and exploit vulnerabilities before malicious actors do. Vulnerability Assessment Comprehensive scanning and analysis to uncover weaknesses across your network, applications, and infrastructure. Cloud Security Secure your cloud environments (AWS, Azure, GCP) with configuration reviews, architecture design, and monitoring. Threat Intelligence Stay ahead of emerging threats with proactive monitoring, analysis, and tailored intelligence reporting.Incident Response Rapid response and containment services to minimize damage and recover quickly from security breaches.Security Advisory Strategic guidance, policy development, and CISO-as-a-Service to mature your overall security posture.
              Products:Vulnuris Insight Platform Continuous asset discovery, vulnerability scanning, and risk prioritization. Real-time asset inventory AI-powered vulnerability detection Contextual risk scoring Integration with ticketing systems Learn More about Insight Vulnuris Insight Platform Mockup
              Vulnuris Threat Intel Actionable threat intelligence tailored to your industry and infrastructure. Curated threat feeds Dark web monitoring IOC tracking and alerting Executive threat briefings about Threat Vulnuris Threat Intel Mockup. Vulnuris PhishGuard Train your employees and test their awareness against phishing attacks. Customizable phishing templates Automated campaign scheduling Detailed reporting and analytics Integrated awareness training modules`,
            },
          ],
        },
        ...messages.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })),
      ];
  
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: formattedMessages }),
        }
      );
  
      if (!res.ok) {
        console.error(`Gemini API error: ${res.status} ${res.statusText}`);
        return Response.json(
          { error: 'Failed to generate a response from the Gemini API. Please try again later.' },
          { status: 500 }
        );
      }
  
      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I am unable to provide a response at this time.';
  
      return Response.json({ reply });
    } catch (err) {
      console.error('Error during Gemini API call:', err);
      return Response.json(
        { error: 'Error generating response. Please check server logs for details.' },
        { status: 500 }
      );
    }
  }
  