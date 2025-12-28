import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import SmoothScrollProvider from "./layout";
import ExperienceLearning from "./sections/ExperienceLearning";

import "./styles/globals.css";

function App() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main className="bg-black">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceLearning />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}

export default App;
