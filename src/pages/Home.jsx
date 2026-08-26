import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Features from "../sections/Features";
import Services from "../sections/Services";
import Products from "../sections/Products";
import Projects from "../sections/Projects";
import Clients from "../sections/Clients";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import JoinTeam from "../sections/JoinTeam";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Services />
        <Projects />
        <Products />
        <Clients />
        <Contact />
        <JoinTeam />
      </main>
      <Footer />
    </>
  );
}

export default Home;
