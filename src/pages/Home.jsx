import React from "react";
import About from "../components/About";
import Research from "../components/Research";
import Experience from "../components/Experience";
import QuoteSection from "../components/QuoteSection";
import SendETH from "../components/SendETH";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import AreasOfInterest from "../components/AreasOfInterest";
import Testimonials from "../components/Testimonials";
import Projects from "../components/Projects";

function Home() {
  return (
    <div className="min-h-[70vh] bg-primary flex items-center justify-center">
      {" "}
      {/* <About />
      <Research />
      <QuoteSection />
      <Experience />
      <AreasOfInterest />
      <Projects />
      <SendETH />
      <Gallery />
      <Testimonials />
      <Contact /> */}
      <p className="text-white font-bold text-3xl">
        Website will be <span className="text-contrast">revealed</span> soon
      </p>
    </div>
  );
}

export default Home;
