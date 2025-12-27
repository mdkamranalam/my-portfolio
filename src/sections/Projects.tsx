import { useEffect, useRef } from "react";

import FinComplianceImg from "../assets/projects/fincompliance-ai.png";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "FinCompliance-AI",
      description:
        "AI-powered regulatory compliance platform that automates document analysis, risk scoring, and audit trails for fintech companies. Built with Next.js, FastAPI, OpenAI APIs, and PostgreSQL.",
      tech: ["Next.js", "FastAPI", "OpenAI", "PostgreSQL", "Tailwind"],
      live: "https://fin-compliance-ai.vercel.app",
      github: "https://github.com/mdkamranalam/FinCompliance-AI",
      image: FinComplianceImg,
    },
    {
      title: "ecoAI",
      description:
        "Sustainability tracker using AI to analyze user habits, suggest carbon reductions, and generate personalized eco-reports. Features real-time data visualization and PDF export.",
      tech: ["React", "Node.js", "MongoDB", "Chart.js", "OpenAI"],
      live: "https://ecoai-app.vercel.app",
      github: "https://github.com/mdkamranalam/EcoAI",
      //   image: EcoAIImg,
    },
    // {
    //   title: "Hackathon Winner Project",
    //   description:
    //     "Real-time collaborative platform (or your actual winning project). Secured 1st place by solving [problem] with scalable architecture and clean UX.",
    //   tech: ["React", "Firebase", "Tailwind", "Vercel"],
    //   live: "#",
    //   github: "#",
    //   image: HackathonImg,
    // },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full h-full bg-black text-white p-14 top-[-48px] relative flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20 py-20 px-6 sm:px-10 lg:px-20 xl:px-32 bg-gradient-to-b from-black/40 to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out
                     [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4
                       bg-gradient-to-r from-white via-purple-300 to-blue-300 
                       bg-clip-text text-transparent drop-shadow-2xl"
          >
            Projects
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Selected works showcasing full-stack development, AI integration,
            and clean architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden
                         opacity-0 translate-y-12 transition-all duration-700 ease-out will-change-transform
                         hover:bg-white/10 hover:border-purple-400/40 hover:-translate-y-4
                         hover:shadow-2xl hover:shadow-purple-500/30
                         [.in-view_&]:opacity-100 [.in-view_&]:translate-y-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white/80 text-base mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm
                                 transition-all duration-300 group-hover:bg-purple-500/20 group-hover:border-purple-400/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-100 transition-colors font-medium"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-100 transition-colors font-medium"
                  >
                    Source Code →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">NOTE: More projects are coming soon!</p>
      </div>
    </section>
  );
};

export default Projects;
