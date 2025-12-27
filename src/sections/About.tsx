import React, { useEffect, useRef } from "react";
import ProfileImg from "../assets/me.jpg";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Single observer to add 'in-view' class on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full h-full bg-black text-white p-14 top-[-48px] relative py-20 px-6 sm:px-10 lg:px-20 xl:px-32 bg-gradient-to-b from-black/40 to-black"
    >
      {/* Title */}
      <h1
        className="text-4xl text-center mb-8 sm:text-5xl md:text-6xl font-black text-white
                       opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out
                       [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0
                       bg-gradient-to-r from-white via-purple-300 to-blue-300 
                       bg-clip-text text-transparent drop-shadow-2xl"
      >
        About Me
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20">
        {/* Profile Image - Slide in from left */}
        <div
          className="opacity-0 -translate-x-12 transition-all duration-1000 ease-out
                     [.in-view_&]:opacity-100 [.in-view_&]:translate-x-0"
        >
          <img
            src={ProfileImg}
            alt="Md. Kamran Alam"
            className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-3xl 
                       border-4 border-white/20 shadow-2xl hover:shadow-purple-500/20 
                       hover:scale-105 transition-all duration-300"
            loading="lazy"
          />
        </div>

        {/* Text Content - Fade in + slide up */}
        <div className="flex-1 text-center md:text-left">
          {/* Paragraphs - Staggered fade-in */}
          <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed">
            <p
              className="opacity-0 translate-y-6 transition-all duration-800 delay-400 ease-out
                         [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0"
            >
              I’m a Computer Science student and Full-Stack Developer with
              hands-on experience in building end-to-end applications—from
              designing databases and APIs to crafting responsive user
              interfaces.
            </p>
            <p
              className="opacity-0 translate-y-6 transition-all duration-800 delay-600 ease-out
                         [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0"
            >
              I enjoy working on complex problem statements, especially in
              domains like fintech, compliance automation, authentication
              systems, and AI-powered platforms. I strongly believe in writing
              clean, maintainable code and following industry best practices.
            </p>
            <p
              className="opacity-0 translate-y-6 transition-all duration-800 delay-800 ease-out
                         [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0"
            >
              I’ve worked on multiple academic and hackathon projects, often
              taking ownership of architecture, backend logic, and deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
