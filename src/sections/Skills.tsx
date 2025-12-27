import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger at 20% visible

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Java", "JavaScript / TypeScript", "Python", "C / C++"],
    },
    {
      title: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "HTML5, CSS3",
        "shadcn/ui",
      ],
    },
    {
      title: "Backend",
      skills: ["Node.js (Express)", "Spring Boot", "FastAPI"],
    },
    {
      title: "Databases",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
    },
    {
      title: "Authentication & Security",
      skills: [
        "JWT Authentication",
        "Google OAuth",
        "Firebase Authentication",
        "Role-Based Access Control (RBAC)",
      ],
    },
    {
      title: "AI & Tools",
      skills: [
        "OpenAI APIs",
        "Machine Learning basics (XGBoost, scoring systems)",
        "LLM-based automation",
        "PDF & document generation",
      ],
    },
    {
      title: "DevOps & Tools",
      skills: ["Git & GitHub", "Docker", "Vercel", "CI/CD basics", "REST APIs"],
    },
  ];

  // Staggered animation variants for cards
  // const cardVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: (i: number) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeOut",
  //       delay: i * 0.2, // Stagger 200ms between cards
  //     },
  //   }),
  // };

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  // Skill tag hover animation
  // const tagVariants = {
  //   hover: { scale: 1.05, boxShadow: "0 5px 20px rgba(139, 92, 246, 0.4)" },
  // };

  return (
    <section
      ref={ref}
      id="skills"
      className="w-full h-full bg-black text-white p-14 top-[-48px] relative flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20 py-20 px-6 sm:px-10 lg:px-20 xl:px-32 bg-gradient-to-b from-black/20 to-black/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Section Title */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4
                       bg-gradient-to-r from-white via-purple-400/90 to-blue-400/90 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Skills
          </motion.h2>
          <motion.p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Technologies & tools I work with to build scalable, secure, and
            intelligent systems.
            {/* for
            <span className="text-purple-400 font-semibold">
              {" "}
              FinCompliance-AI
            </span>
            ,<span className="text-blue-400 font-semibold"> ecoAI</span>, and
            hackathon winners 🚀 */}
          </motion.p>
        </motion.div>

        {/* Staggered Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 
                         rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-purple-400/40 
                         hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-200 ease overflow-hidden"
              // custom={index}
              // initial="hidden"
              // animate={isInView ? "visible" : "hidden"}
              // variants={cardVariants}
            >
              {/* Gradient Border Effect */}
              {/* <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-blue-500/0 
                              -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              /> */}

              {/* Category Title */}
              <motion.h3
                className="text-xl md:text-2xl font-bold text-white mb-6 relative z-10
                           bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 
                           bg-clip-text text-transparent drop-shadow-lg"
              >
                {category.title}
              </motion.h3>

              {/* Animated Skill Tags */}
              <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-full 
                               text-white/90 text-sm md:text-base font-medium cursor-pointer
                               backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-500/30 
                               hover:to-blue-500/30 hover:border-purple-400/50 hover:text-white
                               hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
