import Image from "next/image";

export default function Clients() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Our Technology Partners
          </h2>

          <p className="text-lg text-muted-foreground mb-6">
            From innovative startups to established enterprises, organizations
            rely on Vulnuris to safeguard their digital assets.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
            <Image width="140" height="70" src="/assets/tech/kali.png" alt="Kali-Partner logo" />
            <Image width="140" height="70" src="/assets/tech/nessus.png" alt="Nessus-Partner logo" />
            <Image width="140" height="70" src="/assets/tech/phished.png" alt="Phished-Partner logo" />
            <Image width="140" height="70"
              src="/assets/tech/portswigger.png"
              alt="Port-swigger-Partner logo"
            />
            <Image width="140" height="70"
              src="/assets/tech/tech partner 2.png"
              alt="Port-swigger-Partner logo"
            />
          </div>

          <div className="mt-6 p-4 bg-accent border-l-4 border-primary rounded-r-md">
            <blockquote className="text-accent-foreground italic">
              "Vulnuris transformed our security posture. Their insights are
              invaluable."
            </blockquote>

            <p className="text-sm text-accent-foreground/80 mt-2">
              - CISO, Global Tech Firm
            </p>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Our Strategic Partners
          </h2>

          <p className="text-lg text-muted-foreground mb-6">
            We collaborate with leading technology providers and security
            innovators to deliver comprehensive solutions.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
            <Image width="140" height="70"
              className="opacity-80 filter grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
              src="/assets/partners/alnoorain.png"
              alt="Alnoorain company logo"
            />
            <Image width="140" height="70"
              className="opacity-80 filter grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
              src="/assets/partners/dcode.png"
              alt="Dcode company logo"
            />
            <Image width="140" height="70"
              className="opacity-80 filter grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
              src="/assets/partners/spiere.png"
              alt="Spiere company logo"
            />
            <Image width="140" height="70"
              className="opacity-80 filter grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
              src="/assets/partners/Thinkinfinity.png"
              alt="Thinkinfinity company logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
