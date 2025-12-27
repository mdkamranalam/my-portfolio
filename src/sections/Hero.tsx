import React, { useRef, useState, Suspense, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax setup
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textContainerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30; // Max tilt 30px
      const y = (clientY / window.innerHeight - 0.5) * 30;
      gsap.to(textContainerRef.current, {
        x,
        y,
        rotationY: x * 0.5,
        rotationX: -y * 0.5,
        ease: "power2.out",
        duration: 0.8,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(textContainerRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      if (!isLoaded) return; // Wait for Spline to load

      const tl = gsap.timeline();

      // Entrance animation
      tl.from(".hi-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".name-text",
          {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .from(
          ".title-text",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Scroll parallax (text moves slower)
      gsap.to(textContainerRef.current, {
        y: "30vh", // Moves up slower as you scroll down
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth scrubbing
        },
      });
    },
    { scope: containerRef, dependencies: [isLoaded] }
  );

  return (
    <section
      id="home"
      className="w-full h-screen bg-black relative overflow-hidden"
    >
      {/* Lazy Spline with Suspense fallback */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-2xl animate-pulse">
              Loading 3D Scene...
            </div>
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/3LMqapGwkkMij2LQ/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          renderOnDemand={true}
          className="opacity-75"
        />
      </Suspense>

      {/* Loading overlay until fully ready */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none">
          <div className="text-white text-xl md:text-3xl animate-pulse">
            Initializing Experience...
          </div>
        </div>
      )}

      {/* Vignette Shadows - Reduced width for better mobile feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-0 bottom-0 w-[30%] md:w-[40%] lg:w-[50%] 
                        bg-gradient-to-r from-black/90 via-black/30 to-transparent"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-[30%] md:w-[40%] lg:w-[50%] 
                        bg-gradient-to-l from-black/90 via-black/30 to-transparent"
        />
      </div>

      <div
        ref={textContainerRef}
        className="absolute top-[50%] left-10 text-left max-w-2xl md:mx-10 
                   will-change-transform perspective-1000"
      >
        {/* Subtle intro */}
        <h2 className="text-3xl md:text-4xl font-light text-white/80 mb-2">
          Hi, I'm
        </h2>

        {/* Name - Hero with gradient + glow */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4
                       bg-gradient-to-r from-blue-200 via-purple-200 to-red-200
                       bg-clip-text text-transparent
                       drop-shadow-2xl
                       [text-shadow:_0_4px_20px_rgba(139,92,246,0.4)]"
        >
          Md. Kamran Alam
        </h1>

        {/* Title - Gradient with shadow */}
        <h2
          className="text-sm md:text-xl font-medium text-white/95 mb-6
                       bg-gradient-to-r from-purple-300 to-blue-300 
                       bg-clip-text text-transparent
                       drop-shadow-md"
        >
          Full-Stack Developer | AI & Software Engineer
        </h2>

        {/* Resume CTA in Hero */}
        <div className="mt-8">
          <a
            href="/resume.pdf" // Or external link: "https://drive.google.com/.../view"
            download="Md_Kamran_Alam_Resume.pdf" // Forces download with filename
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-4 py-2 
               bg-purple-600/20 backdrop-blur-md border border-purple-400/50 
               rounded-full text-white font-medium text-lg
               hover:bg-purple-600/40 hover:border-purple-300 
               hover:shadow-2xl hover:shadow-purple-500/30 
               transition-all duration-500"
          >
            <span className="text-sm sm:text-base">Download Resume</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>

        {/* Description - Clean, readable with subtle backdrop */}
        {/* <p
            className="text-base md:text-lg leading-relaxed text-white/90
                     bg-black/30 backdrop-blur-sm py-4 px-6 rounded-xl
                     border border-white/10"
          >
            I build scalable web applications, intelligent systems, and <br />
            production-ready software using modern technologies. Passionate
            <br />
            about solving real-world problems through clean architecture, secure
            <br />
            systems, and impactful user experiences.
          </p> */}
      </div>
    </section>
  );
};

export default Hero;
