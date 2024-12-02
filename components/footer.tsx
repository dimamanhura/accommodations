import Image from "next/image";
import Link from "next/link";
import imageLogo from '@/assets/images/logo.png'
import paths from "@/utils/paths";
import ContactForm from "@/components/contact-form";
import { auth } from "@/utils/auth";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const session = await auth();

  return (
    <footer className="w-full">
      <div className="w-full bg-gray-100 shadow-inner">
        <div className="container py-12 px-8 md:px-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <section className="flex flex-col col-span-1 gap-2">
            <Link href={paths.home()} className="flex gap-2 items-center">
              <Image src={imageLogo} alt="Logo" className="h-8 w-8" />
              <h2 className="text-xl md:text-2xl">Property Pulse</h2>
            </Link>
          </section>
          <section className="flex flex-col col-span-1 gap-2">
            <h2 className="text-xl md:text-2xl">Pages</h2>
            <Link href={paths.home()} className="underline">
              Home
            </Link>
            <Link href={paths.properties()} className="underline">
              Properties
            </Link>
            {session?.user?.id && (
              <Link href={paths.propertyAdd()} className="underline">
                Add Property
              </Link>
            )}
            <Link href={paths.termsAndConditions()} className="underline">
              Terms & Conditions
            </Link>
            <Link href={paths.privacyPolicy()} className="underline">
              Privacy policy
            </Link>
          </section>
          <section className="flex flex-col col-span-1 md:col-span-2 lg:col-span-1 gap-2">
            <h2 className="text-xl md:text-2xl">Contact Us</h2>
            <ContactForm />
          </section>
        </div>
      </div>
      <div className="w-full bg-gray-200">
        <div className="container py-6 mx-auto text-center">
          &copy; {currentYear} Property Pulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
