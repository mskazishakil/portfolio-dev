

// src/components/Banner.jsx
import { useEffect, useRef, useState } from "react";
import profile from "../assets/profile-removebg-preview.png";

// Typewriter effect (once)
function useTypeOnce(text, speed = 75, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);
  return displayed;
}

// Cycling typing effect
function useTypingEffect(texts, typeSpeed = 70, eraseSpeed = 45, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    let timeout;
    const current = texts[index];
    if (isTyping) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setIsTyping(false), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), eraseSpeed);
      } else {
        setIndex((i) => (i + 1) % texts.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isTyping, index, texts, typeSpeed, eraseSpeed, pause]);
  return displayed;
}

const Banner = () => {
  const roles = ["Front-End Developer", "React Developer", "UI Builder", "Web Creator"];
  const displayedName = useTypeOnce("Md Shakil Islam", 75, 600);
  const displayedRole = useTypingEffect(roles, 65, 45, 2200);

  // Refs for staggered fade-in
  const eyebrowRef = useRef(null);
  const greetRef   = useRef(null);
  const nameRef    = useRef(null);
  const roleRef    = useRef(null);
  const divRef     = useRef(null);
  const bioRef     = useRef(null);
  const ctaRef     = useRef(null);
  const tagsRef    = useRef(null);
  const imgRef     = useRef(null);

  useEffect(() => {
    const items = [
      { ref: eyebrowRef, delay: 200 },
      { ref: greetRef,   delay: 350 },
      { ref: nameRef,    delay: 500 },
      { ref: roleRef,    delay: 650 },
      { ref: divRef,     delay: 800 },
      { ref: bioRef,     delay: 950 },
      { ref: ctaRef,     delay: 1100 },
      { ref: tagsRef,    delay: 1250 },
      { ref: imgRef,     delay: 250 },
    ];
    items.forEach(({ ref, delay }) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity 0.75s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.75s ease";
      setTimeout(() => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      }, delay);
    });
  }, []);

  const skills = ["HTML", "CSS", "JavaScript", "Tailwind CSS", "React", "Git", "Figma", "VS Code"];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#080c10] min-h-screen flex items-center sm:rounded-t-lg sm:px-10 lg:px-16 py-16">
      {/* Grid background - more subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,230,68,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,230,68,0.03) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Glow orbs - repositioned for better depth */}
      <div
        className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle,rgba(200,230,68,0.08) 0%,transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle,rgba(56,189,248,0.06) 0%,transparent 70%)" }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* IMAGE SECTION */}
        <div ref={imgRef} className="w-full flex flex-col items-center lg:items-start lg:w-auto flex-shrink-0">
          <div className="relative flex items-center justify-center">
            {/* Animated gradient ring (premium touch) */}
            <div
              className="absolute rounded-full"
              style={{
                width: 330,
                height: 330,
                background: "conic-gradient(from 0deg, rgba(200,230,68,0.15), rgba(200,230,68,0.4), rgba(200,230,68,0.15))",
                animation: "spin 12s linear infinite",
                borderRadius: "50%",
                filter: "blur(10px)",
                opacity: 0.6,
              }}
            />
            {/* Spinning dashed ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 310,
                height: 310,
                border: "1.5px dashed rgba(200,230,68,0.25)",
                animation: "spin 22s linear infinite reverse",
              }}
            />
            {/* Pulse ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 345,
                height: 345,
                border: "1px solid rgba(200,230,68,0.1)",
                animation: "pulse-ring 3.5s ease-in-out infinite",
              }}
            />
            {/* Corner accents - more elegant */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{ top: -10, left: -10, width: 40, height: 40, borderTop: "2px solid rgba(200,230,68,0.7)", borderLeft: "2px solid rgba(200,230,68,0.7)", borderRadius: "12px 0 0 0" }}
            />
            <div
              className="absolute z-20 pointer-events-none"
              style={{ bottom: -10, right: -10, width: 40, height: 40, borderBottom: "2px solid rgba(200,230,68,0.4)", borderRight: "2px solid rgba(200,230,68,0.4)", borderRadius: "0 0 12px 0" }}
            />
            {/* Image card with enhanced glass effect */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                width: "min(270px, 72vw)",
                height: "min(350px, 94vw)",
                border: "1px solid rgba(200,230,68,0.2)",
                background: "linear-gradient(145deg, rgba(17,29,38,0.9), rgba(10,20,28,0.95))",
                backdropFilter: "blur(2px)",
                boxShadow: "0 25px 40px -12px rgba(0,0,0,0.6)",
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(200,230,68,0.08) 0%, transparent 60%, rgba(200,230,68,0.03) 100%)" }}
              />
              <img
                src={profile}
                alt="Md Shakil Islam"
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.96) contrast(1.04)" }}
              />
              {/* Available badge - refined */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: "rgba(8,12,16,0.85)",
                  border: "0.5px solid rgba(200,230,68,0.35)",
                  backdropFilter: "blur(8px)",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#c8e644", animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                <span className="text-[10px] font-medium tracking-wide text-[#c8e644]">Available for hire</span>
              </div>
            </div>
          </div>

          {/* Stat cards - more premium */}
          <div className="flex flex-row gap-4 mt-6 justify-center">
            {[
              { n: "1+", l: "Years Exp." },
              { n: "12+", l: "Projects" },
              { n: "8+", l: "Technologies" },
            ].map((stat, i) => (
              <div
                key={stat.l}
                className="rounded-xl px-4 py-3 text-center backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[rgba(200,230,68,0.6)]"
                style={{
                  background: "rgba(12,18,24,0.85)",
                  border: "1px solid rgba(200,230,68,0.2)",
                  minWidth: 85,
                  opacity: 0,
                  animation: `fade-stat 0.5s ease forwards ${0.9 + i * 0.15}s`,
                }}
              >
                <p className="font-bold text-[#c8e644]" style={{ fontSize: "clamp(20px,4vw,24px)", fontFamily: "serif" }}>
                  {stat.n}
                </p>
                <p className="text-[9px] tracking-wider uppercase mt-1 text-[#5a7080]">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="flex-1 w-full text-center lg:text-left">
          {/* Eyebrow with dot accent */}
          <div ref={eyebrowRef} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="hidden lg:block w-8 h-px bg-[#c8e644]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#c8e644] bg-[rgba(200,230,68,0.08)] px-3 py-1 rounded-full">
              ✨ Available for work
            </span>
          </div>

          {/* Greeting with subtle gradient */}
          <p ref={greetRef} className="text-sm font-light tracking-widest text-[#6a7f8c] mb-2">
            Hello, I'm
          </p>

          {/* Name with gradient text */}
          <h1
            ref={nameRef}
            className="font-black leading-none mb-3 bg-gradient-to-r from-white via-white to-[#c8e644] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(38px, 7vw, 68px)",
              letterSpacing: "-0.02em",
              fontFamily: "serif",
              minHeight: "1.15em",
            }}
          >
            {displayedName}
            {displayedName.length < "Md Shakil Islam".length && (
              <span
                className="inline-block w-[3px] ml-1 align-middle bg-[#c8e644]"
                style={{ height: "0.85em", animation: "blink 1s step-end infinite" }}
              />
            )}
          </h1>

          {/* Role with underline accent */}
          <div
            ref={roleRef}
            className="font-bold italic mb-6 text-[#a0b5c0]"
            style={{
              fontSize: "clamp(18px, 3.5vw, 36px)",
              fontFamily: "serif",
              minHeight: "1.35em",
            }}
          >
            A passionate{" "}
            <span className="text-[#c8e644] relative inline-block">
              {displayedRole}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#c8e644] opacity-40 rounded-full" />
            </span>
            <span
              className="inline-block w-[3px] ml-1 align-middle bg-[#c8e644]"
              style={{ height: "0.8em", animation: "blink 1s step-end infinite" }}
            />
          </div>

          {/* Divider - longer and more elegant */}
          <div
            ref={divRef}
            className="mb-6 rounded-full mx-auto lg:mx-0"
            style={{ width: 70, height: 2, background: "linear-gradient(to right, #c8e644, rgba(200,230,68,0.2))" }}
          />

          {/* Bio - improved readability */}
          <p
            ref={bioRef}
            className="text-[15px] font-light leading-[1.85] text-[#6a7f8c] mb-8 mx-auto lg:mx-0"
            style={{ maxWidth: 480 }}
          >
            Focused on creating{" "}
            <span className="text-[#c8e644] font-medium">clean, responsive</span> and
            user-friendly web interfaces. Turning ideas into modern designs using{" "}
            <span className="text-white/80 font-medium">HTML, CSS, JavaScript</span> and{" "}
            <span className="text-white/80 font-medium">React</span>.
          </p>

          {/* CTA Buttons - refined */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
            <button
              onClick={scrollToProjects}
              className="text-[11px] font-bold tracking-[0.15em] uppercase rounded-full bg-[#c8e644] text-[#080c10] px-8 py-3.5 transition-all duration-300 hover:bg-[#d8f060] hover:-translate-y-1 hover:shadow-lg active:scale-95"
            >
              View My Work
            </button>
            <a
              href="/CV.pdf"
              download
              className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full px-8 py-3.5 transition-all duration-300 text-[#c8e644] border border-[#c8e644] bg-transparent hover:bg-[rgba(200,230,68,0.1)] hover:-translate-y-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-y-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Skill tags - improved hover */}
          <div ref={tagsRef} className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-medium tracking-[0.08em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200 text-[#6a7f8c] border border-[rgba(200,230,68,0.25)] hover:bg-[rgba(200,230,68,0.1)] hover:text-[#c8e644] hover:border-[#c8e644] cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint - more subtle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 z-10 opacity-60">
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#4a5a68]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#c8e644]" />
      </div>

      {/* Custom Keyframes - enhanced */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fade-stat {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Banner;












