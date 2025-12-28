import React, { useRef, useState, Suspense, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Spline = React.lazy(() => import("@splinetool/react-spline"));
import Video from "../assets/cute_computer_animation.mp4";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ← FIXED: Parallax ONLY on non-mobile (desktop/tablet)
  useEffect(() => {
    if (isMobile) return; // ← Completely skip on mobile

    const handleMouseMove = (e: MouseEvent) => {
      if (!textContainerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      gsap.to(textContainerRef.current, {
        x,
        y,
        rotationY: x * 0.3,
        rotationX: -y * 0.3,
        ease: "power2.out",
        duration: 0.6,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useGSAP(
    () => {
      if (!isLoaded && !isMobile) return;

      const tl = gsap.timeline();
      tl.from(".hi-text", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".name-text",
          { opacity: 0, y: 60, duration: 1.2, ease: "power4.out" },
          "-=0.6"
        )
        .from(
          ".title-text",
          { opacity: 0, y: 40, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .from(
          ".resume-btn",
          { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

      gsap.to(textContainerRef.current, {
        y: "30vh",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef, dependencies: [isLoaded, isMobile] }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Mobile: Video */}
      {isMobile ? (
        <div className="absolute inset-0">
          <video
            src={Video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-75"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
          />
        </div>
      ) : (
        /* Desktop: Spline */
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
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
      )}

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-[25%] md:w-[35%] lg:w-[45%] bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[25%] md:w-[35%] lg:w-[45%] bg-gradient-to-l from-black/80 to-transparent" />
      </div>

      {/* Text - Responsive & No Parallax on Mobile */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 flex flex-col justify-center mb-16 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="max-w-3xl">
          <h2 className="hi-text text-2xl sm:text-3xl md:text-4xl font-light text-white/80 mb-2 md:mb-4">
            Hi, I'm
          </h2>

          <h1
            className="name-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-4 md:mb-6
                         bg-gradient-to-r from-blue-200 via-purple-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Md. Kamran Alam
          </h1>

          <h2
            className="title-text text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white/95 mb-8 md:mb-12
                         bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-md"
          >
            Full-Stack Developer | AI & Software Engineer
          </h2>

          <div className="resume-btn">
            <a
              href="/resume.pdf"
              download="Md_Kamran_Alam_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 
                         bg-purple-600/20 backdrop-blur-md border border-purple-400/50 
                         rounded-full text-white font-medium text-base sm:text-lg
                         hover:bg-purple-600/40 hover:border-purple-300 
                         hover:shadow-2xl hover:shadow-purple-500/30 
                         transition-all duration-500"
            >
              Download Resume
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
