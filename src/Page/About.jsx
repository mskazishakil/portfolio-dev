
import { useEffect, useRef } from "react";
import profile from "../assets/598046888_883163744663033_7820751169310015500_n.jpg";


function useFadeIn(dir = "up", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from =
      dir === "left"  ? "translateX(-36px)" :
      dir === "right" ? "translateX(36px)"  :
                        "translateY(32px)";
    el.style.opacity   = "0";
    el.style.transform = from;
    el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity   = "1";
        el.style.transform = "translate(0)";
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const stats = [
  { value: "1+",  label: "Years Experience", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { value: "10+", label: "Projects Done",    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  { value: "5+",  label: "Technologies",     icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { value: "100%",label: "Dedication",       icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
];

const qualities = [
  {
    title: "Clean Code",
    desc:  "Writing readable, maintainable, and scalable code following modern best practices.",
    icon:  "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Responsive Design",
    desc:  "Pixel-perfect interfaces that look and feel great on every screen size.",
    icon:  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Performance First",
    desc:  "Optimized builds, fast load times, and smooth interactions as a priority.",
    icon:  "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Always Learning",
    desc:  "Staying current with the latest tools, frameworks, and industry trends.",
    icon:  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
];

const About = () => {
  const headRef    = useFadeIn("up",    0);
  const leftRef    = useFadeIn("left",  0.15);
  const rightRef   = useFadeIn("right", 0.25);
  const statsRef   = useFadeIn("up",    0.3);
  const qualRef    = useFadeIn("up",    0.4);

  return (
    <section id="about" className="relative py-24 px-5 sm:px-10 lg:px-16 overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.2),transparent)" }} />

      {/* Section heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#c8e644] mb-3">
          Get to know me
        </p>
        <h2 className="font-black text-[#f0f4f0] mb-4"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontFamily: "serif" }}>
          About <span style={{ color: "#c8e644" }}>Me</span>
        </h2>
        <div className="w-12 h-px mx-auto"
          style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.6),transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ── TOP: image + bio ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-14">

          {/* Image */}
          <div ref={leftRef} className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="relative">

              {/* Rotating ring */}
              <div className="absolute rounded-full pointer-events-none"
                style={{ width: 290, height: 290, top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  border: "1px dashed rgba(200,230,68,0.18)",
                  animation: "spin 22s linear infinite" }} />

              {/* Corner accents */}
              <div className="absolute z-10 pointer-events-none"
                style={{ top: -8, left: -8, width: 36, height: 36,
                  borderTop: "1.5px solid rgba(200,230,68,0.55)",
                  borderLeft: "1.5px solid rgba(200,230,68,0.55)" }} />
              <div className="absolute z-10 pointer-events-none"
                style={{ bottom: -8, right: -8, width: 36, height: 36,
                  borderBottom: "1.5px solid rgba(200,230,68,0.3)",
                  borderRight: "1.5px solid rgba(200,230,68,0.3)" }} />

              {/* Photo */}
              <div className="rounded-xl overflow-hidden"
                style={{ width: "min(260px,72vw)", height: "min(320px,88vw)",
                  border: "0.5px solid rgba(200,230,68,0.15)",
                  background: "linear-gradient(145deg,#111d26,#0a141c)",
                  animation: "floatY 5s ease-in-out infinite" }}>
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(135deg,rgba(200,230,68,0.06) 0%,transparent 55%)" }} />
                <img src={profile} alt="Md Shakil Islam"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.95) contrast(1.04)" }} />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg px-4 py-2"
                style={{ background: "rgba(8,12,16,0.92)", border: "0.5px solid rgba(200,230,68,0.25)",
                  backdropFilter: "blur(10px)", whiteSpace: "nowrap" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#c8e644", animation: "pulseDot 2s ease-in-out infinite" }} />
                <span className="text-[11px] tracking-wide text-[#8a9ba8]">Open to Work</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={rightRef} className="flex-1">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#c8e644] mb-2 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-[#c8e644]" />
              Introduction
            </p>
            <h3 className="text-2xl font-black text-[#f0f4f0] mb-5 leading-snug"
              style={{ fontFamily: "serif" }}>
              I'm a{" "}
              <span style={{ color: "#c8e644" }}>Front-End Developer</span>
              <br />based in Bangladesh
            </h3>

            {[
              "I am Md Shakil Islam, a passionate Front-End Developer focused on creating clean, responsive, and user-friendly web interfaces. I enjoy turning ideas into modern, visually appealing designs using HTML, CSS, JavaScript, and React.",
              "My experience includes building reusable components and optimized UI layouts focused on performance and accessibility. I follow modern best practices and always keep the end user in mind.",
              "I'm eager to collaborate with development teams, contribute to real-world projects, and continuously grow as a professional Front-End Developer.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 mb-4 last:mb-0">
                <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full bg-[#c8e644] opacity-60" />
                <p className="text-sm font-light leading-[1.9] text-[#6a7f8c]">{text}</p>
              </div>
            ))}

            {/* Quote card */}
            <div className="relative rounded-xl mt-7 p-5 overflow-hidden"
              style={{ background: "rgba(200,230,68,0.03)", border: "0.5px solid rgba(200,230,68,0.15)" }}>
              <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                style={{ borderTop: "1.5px solid rgba(200,230,68,0.4)", borderLeft: "1.5px solid rgba(200,230,68,0.4)", borderRadius: "10px 0 0 0" }} />
              <p className="text-sm italic font-light text-[#8a9ba8] leading-relaxed">
                "Code is not just instructions for machines — it's a craft, a language, and an art form."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#c8e644] opacity-60" />
                <span className="text-[11px] tracking-widest uppercase text-[#3d5060]">Md Shakil Islam</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-7">
              <button
                className="text-[11px] font-semibold tracking-[0.12em] uppercase px-7 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-[#080c10]"
                style={{ background: "#c8e644" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#d8f060")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#c8e644")}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Let's Work Together
              </button>
              <button
                className="text-[11px] tracking-[0.12em] uppercase px-7 py-3 rounded-sm transition-all duration-200 text-[#6a7f8c] border border-[rgba(106,127,140,0.3)] bg-transparent hover:border-[#c8e644] hover:text-[#c8e644] active:scale-95"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View Projects
              </button>
            </div>
          </div>
        </div>

        {/* ── STATS ── */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map(({ value, label, icon }, i) => (
            <div key={label}
              className="group relative rounded-xl p-5 text-center transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "0.5px solid rgba(200,230,68,0.1)",
                opacity: 0,
                animation: `fadeStatIn 0.5s ease forwards ${0.4 + i * 0.12}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.1)";  e.currentTarget.style.transform = "translateY(0)"; }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.5),transparent)" }} />
              <div className="w-9 h-9 mx-auto mb-3 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(200,230,68,0.07)", border: "0.5px solid rgba(200,230,68,0.15)" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c8e644" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
              </div>
              <p className="font-black text-[#c8e644] leading-none mb-1"
                style={{ fontSize: "clamp(20px,3vw,28px)", fontFamily: "serif" }}>{value}</p>
              <p className="text-[10px] tracking-widest uppercase text-[#3d5060]">{label}</p>
            </div>
          ))}
        </div>

        {/* ── QUALITIES ── */}
        <div ref={qualRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualities.map(({ title, desc, icon }, i) => (
            <div key={title}
              className="group relative rounded-xl p-5 transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "0.5px solid rgba(200,230,68,0.08)",
                opacity: 0,
                animation: `fadeStatIn 0.5s ease forwards ${0.5 + i * 0.12}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.35)"; e.currentTarget.style.background = "rgba(200,230,68,0.04)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.08)";  e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.5),transparent)" }} />
              <div className="w-9 h-9 mb-4 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(200,230,68,0.07)", border: "0.5px solid rgba(200,230,68,0.15)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8e644" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-[#f0f4f0] mb-2" style={{ fontFamily: "serif" }}>{title}</h4>
              <p className="text-[12px] font-light leading-relaxed text-[#5a7080]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.12),transparent)" }} />

      <style>{`
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin       { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes pulseDot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }
        @keyframes fadeStatIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      
    </section>
  );
};

export default About;










