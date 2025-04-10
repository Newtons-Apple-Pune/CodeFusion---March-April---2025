import {
  Building2,
  HeartPulse,
  Shield,
  Briefcase,
  Quote,
} from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "There's always something more to learn from these youngsters. I have seen them handle projects very efficiently and realized the potential they hold. Age is really just a number for them! Their team spirit, expertise, project delivery, adherence to timelines, professional etiquettes and leadership has left me speechless. All the best leaders of tomorrow!",
      industry: "Manufacturing",
      icon: Building2,
      color: "violet",
      span: "md:col-span-2",
    },
    {
      text: "Within two months of delivering our first project audited by Vulenris, we received 4 more projects through the same client. Their apt security consultancy, prompt and accurate IT security service, gave us the confidence to partner with Vulenris. Soon, we connected with Mandar's team on strategic fronts and this helped us immensely in penetrating the Cyber Security market in Middle East.",
      industry: "Consultancy",
      icon: Briefcase,
      color: "blue",
      span: "md:col-span-3 md:place-self-end",
    },
    {
      text: "We are now associated with Vulenris for the last two years for security services. I found them extremely professional and very accommodating. Their understanding and positioning of services in Cyber Security is outstanding. In particular, my wavelength instantly synced with Aishwarya, who stands out in this male-dominated industry with her proficiency in cyber security.",
      industry: "CyberSecurity",
      icon: Shield,
      color: "red",
      span: "md:col-span-3 md:place-self-start",
    },
    {
      text: "Our journey truly began when we got our first HIPAA Audit conducted by Vulenris when our product was in an early stage. We received tremendous support and handholding to define and maintain the security posture of not just our product, but also our entire organization. Vulenris team has been very cooperative and continue to be on our speed dial for all security.",
      industry: "Healthcare",
      icon: HeartPulse,
      color: "cyan",
      span: "md:col-span-2",
    },
  ];

  const colorMap = {
    violet: "from-violet-500 to-violet-800 dark:to-violet-950",
    blue: "from-blue-500 to-blue-800 dark:to-blue-950",
    red: "from-red-500 to-red-800 dark:to-red-950",
    cyan: "from-cyan-500 to-cyan-800 dark:to-cyan-950",
  };

  return (
    <div className="flex flex-col gap-3 py-10 max-w-6xl mx-auto border-t px-4" id="testimonials">
      <h2 className="text-4xl text-center font-bold">
        Don't take our word for it! <br />
        See what our clients say
      </h2>
      <p className="text-md text-muted-foreground text-center max-w-xl mx-auto">
        Discover what professionals from Healthcare, Manufacturing,
        Cybersecurity, and more have to say about collaborating with us.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`rounded-lg p-6 text-white relative overflow-hidden border shadow-xl backdrop-blur-sm bg-gradient-to-br ${colorMap[t.color]} ${t.span}`}
          >
            <Quote className="absolute -bottom-2 right-2 w-24 h-24 opacity-10 rotate-12" />
            <p className="text-justify mb-4">{`"${t.text}"`}</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <t.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{t.industry}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
