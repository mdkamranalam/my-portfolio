import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null); // Outer header (for background/shadow)
  const innerRef = useRef<HTMLDivElement>(null); // Inner container (for padding shrink)
  const containerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience & Learning", href: "#experience" },
    { name: "Contacts", href: "#contacts" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // SCROLL SHRINK ANIMATION (The Magic ✨)
  useGSAP(
    () => {
      // Entrance animations
      gsap.fromTo(
        ".logo",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );
      gsap.from(".desktop-link", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
      });

      // SCROLL SHRINK - Now targets inner padding only
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top top",
        onUpdate: (self) => {
          const progress = self.progress;

          // Shrink inner padding + logo
          if (innerRef.current) {
            gsap.to(innerRef.current, {
              paddingTop: 32 + (16 - 32) * progress, // 32px → 16px (py-8 → py-4)
              paddingBottom: 32 + (16 - 32) * progress,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          // Header background + blur + shadow
          gsap.to(headerRef.current, {
            backgroundColor: `rgba(0,0,0,${0.2 + 0.4 * progress})`,
            backdropFilter: `blur(${8 + 6 * progress}px)`,
            boxShadow: progress > 0.1 ? "0 10px 30px rgba(0,0,0,0.4)" : "none",
            duration: 0.3,
          });

          // Logo subtle shrink
          gsap.to(".logo", {
            scale: 1 - 0.15 * progress,
            duration: 0.3,
          });
        },
      });
    },
    { scope: containerRef }
  );

  // Mobile menu animations (same as before)
  useGSAP(
    () => {
      if (!isOpen) return;

      gsap.fromTo(
        ".mobile-menu",
        { y: "-100%" },
        { y: "0%", duration: 0.3, ease: "power3.out" }
      );
      gsap.from(".mobile-link", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.2,
        ease: "power3.out",
      });
    },
    { dependencies: [isOpen] }
  );

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    >
      <div
        ref={innerRef}
        className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20 xl:px-32 py-8 sm:py-10"
        containerRef={containerRef}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="logo font-bold text-2xl sm:text-3xl text-white hover:text-purple-300 transition-colors duration-300"
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-2 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="desktop-link text-white/90 hover:text-white hover:underline underline-offset-4 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-purple-300/50 rounded transition-all duration-300 hover:scale-110"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="hamburger-line"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          onClick={toggleMenu}
        >
          <div
            className="flex flex-col items-center justify-center h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 text-white text-4xl hover:text-purple-300 transition-colors duration-300"
              aria-label="Close menu"
            >
              ×
            </button>
            <nav>
              <ul className="flex flex-col gap-10 text-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="mobile-link text-3xl sm:text-4xl text-white/90 hover:text-purple-300 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
