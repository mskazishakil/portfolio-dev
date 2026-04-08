import Banner from "../Shared/Banner";
import Brands from "../Shared/Brands";
import Navbar from "../Shared/Navbar";
import Services from "../Shared/Services";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import Skilled from "./Skilled";

const Home = () => {
  return (
    <div>
      {/* Navbar - সব সময় শীর্ষে থাকবে */}
      <Navbar />

      <section id="banner">
        <Banner />
      </section>

      <section id="about">
        <About />
        <Brands></Brands>
      </section>
     
    <section id="projects">
        <Projects />
      </section>

      <section id="skills">
        <Skilled />
        <Services></Services>
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
