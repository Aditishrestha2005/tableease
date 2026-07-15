import Navbar from "../_components/Navbar";
import Hero from "../_components/Hero";
import OurStory from "../_components/OurStory";
import WhyChooseUs from "../_components/WhyChooseUs";
import Footer from "../_components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <WhyChooseUs />
      <Footer />
    </>
  );
}