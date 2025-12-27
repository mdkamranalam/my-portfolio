import React, { useEffect, useRef } from "react";

const ExperienceLearning = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll trigger for stagger reveal
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

  const items = [
    {
      title: "Hackathon Participant",
      subtitle: "AI-Driven Projects",
      description:
        "Competed in multiple hackathons, building intelligent systems like FinCompliance-AI (compliance automation) and ecoAI (sustainability tracker). Focused on end-to-end development under tight deadlines.",
      highlight: true,
    },
    {
      title: "Real-World & Academic Projects",
      subtitle: "Full-Stack Development",
      description:
        "Designed and deployed production-ready applications involving complex backend logic, secure authentication, database architecture, and responsive frontend experiences.",
    },
    {
      title: "Team & Independent Work",
      subtitle: "Collaborative & Solo",
      description:
        "Comfortable leading features independently while thriving in team environments. Experienced in code reviews, agile workflows, and clear communication.",
    },
    {
      title: "Strong Technical Foundation",
      subtitle: "Core CS Concepts",
      description:
        "Deep understanding of data structures, algorithms, database design, system architecture, and best practices in clean code and scalable systems.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full h-full bg-black text-white p-14 top-[-48px] relative py-20 px-6 sm:px-10 lg:px-20 xl:px-32 bg-gradient-to-b from-black/40 to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out
                     [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4
                       bg-gradient-to-r from-white via-purple-300 to-blue-300 
                       bg-clip-text text-transparent drop-shadow-2xl"
          >
            Experience & Learning
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Journey through competitive coding, real-world builds, and
            continuous growth.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white/5 backdrop-blur-md border ${
                item.highlight ? "border-purple-500/50" : "border-white/10"
              } rounded-2xl p-8 md:p-10
                         opacity-0 translate-y-12 transition-all duration-700 ease-out will-change-transform
                         hover:bg-white/10 hover:border-purple-400/60 hover:-translate-y-2
                         hover:shadow-2xl hover:shadow-purple-500/30
                         [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Highlight glow for hackathons */}
              {item.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              )}

              {/* Marker dot */}
              <div className="flex items-start gap-6">
                <div
                  className={`w-4 h-4 mt-2 rounded-full flex-shrink-0 ${
                    item.highlight
                      ? "bg-purple-400 shadow-lg shadow-purple-500/50"
                      : "bg-white/30"
                  }`}
                />

                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-purple-300 text-lg mb-4 font-medium">
                    {item.subtitle}
                  </p>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceLearning;
