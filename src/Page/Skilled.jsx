

import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "HTML",        value: 70, icon: "🌐" },
  { name: "CSS",         value: 75, icon: "🎨" },
  { name: "JavaScript",  value: 98, icon: "⚡" },
  { name: "React",       value: 90, icon: "⚛️" },
  { name: "Tailwind CSS",value: 85, icon: "💨" },
  { name: "Next.js",     value: 60, icon: "▲"  },
  { name: "Git & GitHub",value: 75, icon: "🔗" },
  { name: "UI/UX Design",value: 65, icon: "✦"  },
];

// Animate bar when visible
function SkillBar({ name, value, index }) {
  const [width, setWidth]   = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setWidth(value), index * 120);
    return () => clearTimeout(t);
  }, [visible, value, index]);

  const getColor = (v) => {
    if (v >= 90) return { bar: "#c8e644", glow: "rgba(200,230,68,0.35)" };
    if (v >= 75) return { bar: "#a8d020", glow: "rgba(168,208,32,0.3)"  };
    if (v >= 60) return { bar: "#7ab800", glow: "rgba(122,184,0,0.25)"  };
    return              { bar: "#5a9000", glow: "rgba(90,144,0,0.2)"    };
  };

  const { bar, glow } = getColor(value);

  return (
    <div ref={ref} className="group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#8a9ba8] group-hover:text-[#f0f4f0] transition-colors duration-200">
          {name}
        </span>
        <span
          className="text-[13px] font-bold tabular-nums"
          style={{ color: bar, fontFamily: "serif" }}
        >
          {visible ? value : 0}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-[3px] rounded-full overflow-visible"
        style={{ background: "rgba(255,255,255,0.05)" }}>

        {/* Fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: `${width}%`,
            background: `linear-gradient(to right, ${bar}88, ${bar})`,
            transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
            boxShadow: `0 0 10px ${glow}`,
          }}
        />

        {/* Tip dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2"
          style={{
            left: `calc(${width}% - 5px)`,
            background: "#080c10",
            borderColor: bar,
            boxShadow: `0 0 8px ${glow}`,
            transition: `left 1.1s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
          }}
        />
      </div>
    </div>
  );
}

// Fade-in on scroll
function useFadeIn(dir = "up", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = dir === "left" ? "translateX(-36px)" : dir === "right" ? "translateX(36px)" : "translateY(32px)";
    el.style.opacity = "0";
    el.style.transform = from;
    el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translate(0)";
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Skilled = () => {
  const leftRef  = useFadeIn("left",  0.1);
  const rightRef = useFadeIn("right", 0.2);
  const headRef  = useFadeIn("up",    0);

  return (
    <section className="relative py-24 px-5 sm:px-10 lg:px-16 overflow-hidden">

      {/* Top section divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.2),transparent)" }} />

      {/* Section heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#c8e644] mb-3">
          What I know
        </p>
        <h2
          className="font-black text-[#f0f4f0] mb-4"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontFamily: "serif" }}
        >
          My <span style={{ color: "#c8e644" }}>Skills</span>
        </h2>
        <div className="w-12 h-px mx-auto"
          style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.6),transparent)" }} />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── LEFT ── */}
        <div ref={leftRef}>

          {/* Card */}
          <div className="relative rounded-2xl p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "0.5px solid rgba(200,230,68,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Accent corner */}
            <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none"
              style={{ borderTop: "1.5px solid rgba(200,230,68,0.5)", borderLeft: "1.5px solid rgba(200,230,68,0.5)", borderRadius: "12px 0 0 0" }} />
            <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
              style={{ borderBottom: "1.5px solid rgba(200,230,68,0.25)", borderRight: "1.5px solid rgba(200,230,68,0.25)", borderRadius: "0 0 12px 0" }} />

            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c8e644] mb-5 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-[#c8e644]" />
              About me
            </p>

            <h3 className="text-xl font-bold text-[#f0f4f0] mb-5 leading-snug" style={{ fontFamily: "serif" }}>
              Passionate <span className="text-[#c8e644]">Front-End Developer</span>{" "}
              specializing in React.js
            </h3>

            {[
              "I enjoy building clean, responsive, and user-friendly web applications using modern JavaScript technologies.",
              "My experience includes HTML5, CSS3, Tailwind CSS, and React.js — creating reusable components optimized for performance and accessibility.",
              "I'm eager to collaborate with development teams and continuously grow as a professional Front-End Developer.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 mb-4 last:mb-0">
                <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[#c8e644] opacity-70" />
                <p className="text-sm font-light leading-[1.85] text-[#6a7f8c]">{text}</p>
              </div>
            ))}
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { n: "1+",  l: "Years Exp."  },
              { n: "10+", l: "Projects"    },
              { n: "8+",  l: "Technologies"},
            ].map((s) => (
              <div key={s.l}
                className="rounded-xl p-4 text-center transition-all duration-200 cursor-default group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "0.5px solid rgba(200,230,68,0.12)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(200,230,68,0.4)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(200,230,68,0.12)"}
              >
                <p className="font-black text-[#c8e644] leading-none mb-1"
                  style={{ fontSize: "clamp(20px,3vw,26px)", fontFamily: "serif" }}>{s.n}</p>
                <p className="text-[10px] tracking-widest uppercase text-[#3d5060]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div ref={rightRef}>
          <div className="relative rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "0.5px solid rgba(200,230,68,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Accent corners */}
            <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none"
              style={{ borderTop: "1.5px solid rgba(200,230,68,0.5)", borderLeft: "1.5px solid rgba(200,230,68,0.5)", borderRadius: "12px 0 0 0" }} />
            <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
              style={{ borderBottom: "1.5px solid rgba(200,230,68,0.25)", borderRight: "1.5px solid rgba(200,230,68,0.25)", borderRadius: "0 0 12px 0" }} />

            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c8e644] mb-2 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-[#c8e644]" />
              Skill Scan
            </p>
            <h3 className="text-xl font-bold text-[#f0f4f0] mb-7" style={{ fontFamily: "serif" }}>
              Technical <span style={{ color: "#c8e644" }}>Proficiency</span>
            </h3>

            <div className="space-y-6">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} index={i} />
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-8 pt-6 flex items-center gap-3"
              style={{ borderTop: "0.5px solid rgba(200,230,68,0.08)" }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#c8e644", animation: "pulseDot 2s ease-in-out infinite" }} />
              <p className="text-[11px] tracking-wide text-[#3d5060]">
                Actively learning and improving every day
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.12),transparent)" }} />

      <style>{`
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.3; transform:scale(.7); }
        }
      `}</style>
    </section>
  );
};

export default Skilled;




