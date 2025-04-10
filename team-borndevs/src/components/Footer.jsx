import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-row-2 lg:grid-cols-4 lg:grid-rows-1 gap-6 md:gap-3 max-w-11/12 mx-auto py-6 md:py-12 font-primary">
        <div>
          <p className="text-sm mb-8 hidden lg:block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quis libero nostrum quisquam tempora blanditiis eum, unde esse assumenda maiores veritatis</p>
          <h2 className="text-3xl md:text-5xl font-bold font-secondary flex gap-2 items-center"><Image width="30" height="30" className="h-7.5 w-7.5 md:h-15 md:w-15" src="/assets/vul_logo.png" alt="vulenris logo" />VULNURIS</h2>
        </div>
        <div className="hidden lg:flex flex-col gap-3 justify-self-center">
          <h3 className="font-bold text-lg">Home</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/about" className="">
                About
              </Link>
            </li>
            <li>
              <Link href="/products" className="">
                Products
              </Link>
            </li> 
            <li>
              <Link href="/services" className="">
                Services
              </Link>
            </li>           
            <li>
              <Link href="/#testimonials" className="">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex flex-col gap-3 justify-self-center">
          <h3 className="font-bold text-lg">Company</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/about#our-team" className="">
                Career
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="">
                Support Center
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 justify-self-center">
          <h3 className="hidden lg:block font-bold text-lg">Socials</h3>
          <ul className="flex gap-6">
            <li><Link href="https://www.linkedin.com/company/vulnuris/" target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </Link></li>
            <li><Link href="https://www.linkedin.com/company/vulnuris/" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </Link></li>
            <li><Link href="https://www.linkedin.com/company/vulnuris/" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-11/12 mx-auto h-20 lg:h-10 md:mt-6 pb-8 gap-5 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2025 VULNURIS. All rights reserved.</p>
        <div className="flex gap-5">
          <p className="text-sm">Privacy Policy</p>
          <p className="text-sm">Terms of Service</p>
        </div>
      </div>
    </>
    
  )
}