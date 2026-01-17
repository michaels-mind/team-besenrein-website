import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
{/*import Reviews from "@/components/sections/Reviews";*/}
import About from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <About />
      {/* <Reviews /> */}
      <ContactForm />
      <Footer />
    </main>
  );
}
