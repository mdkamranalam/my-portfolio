import React, { useRef, useState, Suspense, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Spline = React.lazy(() => import("@splinetool/react-spline"));
import Video from "../assets/cute_computer_animation.webm";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Optimisation: Defer loading Spline to avoid blocking the main thread during initial page render/animations
    const timer = setTimeout(() => {
      setShouldLoadSpline(true);
    }, 500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Touch + Orientation Parallax for mobile & tablets
  useEffect(() => {
    if (!isMobile || !textContainerRef.current) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!e.gamma || !e.beta) return;
      targetX = (e.gamma / 90) * 20;
      targetY = (e.beta / 90) * 20;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = ((touch.clientX - centerX) / centerX) * 20;
      targetY = ((touch.clientY - centerY) / centerY) * 20;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      gsap.set(textContainerRef.current, {
        x: currentX,
        y: currentY,
        rotationY: currentX * 0.3,
        rotationX: -currentY * 0.3,
      });
      requestAnimationFrame(animate);
    };

    // iOS 13+ permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      const requestPermission = () => {
        (DeviceOrientationEvent as any)
            .requestPermission()
            .then((response: string) => {
              if (response === "granted") {
                window.addEventListener("deviceorientation", handleOrientation);
              }
            })
            .catch(console.error);
      };
      window.addEventListener("touchstart", requestPermission, { once: true });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    window.addEventListener("touchmove", handleTouchMove);
    animate();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile]);

  // Desktop Mouse Parallax (unchanged)
  useEffect(() => {
    if (isMobile) return;

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
        // Optimization: Do NOT wait for Spline to load. Trigger GSAP text animation immediately mount.
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
      { scope: containerRef } 
  );

  return (
      <section
          id="home"
          ref={containerRef}
          className="relative w-full h-screen bg-black overflow-hidden"
      >
        {/* Mobile: Video | Desktop: Spline */}
        <div className="absolute inset-0 z-0">
          {isMobile ? (
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
          ) : (
            shouldLoadSpline && (
              <Suspense fallback={null}>
                <Spline
                    scene="https://prod.spline.design/3LMqapGwkkMij2LQ/scene.splinecode"
                    onLoad={() => setIsLoaded(true)}
                    renderOnDemand={true}
                    className={`w-full h-full transition-opacity duration-1000 ease-in-out ${
                      isLoaded ? "opacity-70" : "opacity-0"
                    }`}
                />
              </Suspense>
            )
          )}

          {/* Spline Watermark Hider (Only needed on desktop, but harmless on mobile) */}
          {!isMobile && (
            <>
              <div className="absolute bottom-0 right-0 w-48 h-20 bg-black z-10 pointer-events-none blur-xl translate-x-4 translate-y-4"></div>
              <div className="absolute bottom-0 right-0 w-40 h-16 bg-black z-10 pointer-events-none"></div>
            </>
          )}
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Strengthened left vignette to ensure text readability against bright Spline areas */}
          <div className="absolute left-0 top-0 bottom-0 w-[85%] md:w-[65%] lg:w-[55%] bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-[25%] md:w-[35%] lg:w-[45%] bg-gradient-to-l from-black/80 to-transparent" />
          {/* Subtle global dimming overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Text - Let mouse events pass through to Spline */}
        <div
            ref={textContainerRef}
            className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32"
        >
          <div className="max-w-3xl pointer-events-auto">
            <h2 className="hi-text text-2xl sm:text-3xl md:text-4xl font-normal text-white/95 mb-2 md:mb-4 drop-shadow-md">
              Hello, I'm
            </h2>

            <div className="name-text mb-4 md:mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight
                     text-purple-200 sm:text-transparent sm:bg-clip-text sm:bg-gradient-to-r sm:from-blue-200 sm:via-purple-200 sm:to-red-200 pb-2">
                Md. Kamran Alam
              </h1>
            </div>

            <div className="title-text mb-8 md:mb-12">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white
                     bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Full-Stack Developer & AI Engineer
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed max-w-2xl mb-10 md:mb-12 drop-shadow-xl">
              Building scalable, intelligent applications that solve real-world problems in fintech, sustainability, and beyond.
            </p>

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
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Hero;