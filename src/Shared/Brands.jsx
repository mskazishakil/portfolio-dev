import { useEffect, useRef, useState } from "react";

function useFadeIn(dir = "up", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from =
      dir === "left"  ? "translateX(-36px)" :
      dir === "right" ? "translateX(36px)"  :
                        "translateY(28px)";
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
  }, [delay, dir]);
  return ref;
}

// Custom typing hook for the code snippet
function useTypingCode(lines, speed = 50, delay = 600) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
        if (charIndex < currentLine.length) {
          const nextChar = currentLine[charIndex];
          const timeout = setTimeout(() => {
            setDisplayedLines(prev => {
              const updated = [...prev];
              if (updated[lineIndex]) {
                updated[lineIndex] += nextChar;
              } else {
                updated[lineIndex] = nextChar;
              }
              return updated;
            });
            setCharIndex(charIndex + 1);
          }, speed);
          return () => clearTimeout(timeout);
        } else {
          // Move to next line
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [lineIndex, charIndex, lines, speed, delay]);

  return displayedLines;
}

const Brands = () => {
  const leftRef  = useFadeIn("left",  0.1);
  const rightRef = useFadeIn("right", 0.25);
  const headRef  = useFadeIn("up",    0);

  const badges = ["React.js", "Tailwind CSS", "JavaScript", "HTML & CSS"];

  // Code snippet to display
  const codeLines = [
    "const developer = {",
    "  name: 'Md Shakil Islam',",
    "  role: 'Front-End Developer',",
    "  skills: ['React', 'Tailwind', 'JS'],",
    "  passion: 'building awesome UIs'",
    "};",
    "",
    "developer.work(); // 🚀 Ready to contribute"
  ];

  const typedCode = useTypingCode(codeLines, 35, 400);

  return (
    <section className="relative py-24 px-5 sm:px-10 lg:px-16 overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.2),transparent)" }} />

      {/* Glow top-right */}
      <div className="absolute -top-32 -right-20 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(200,230,68,0.07) 0%,transparent 70%)" }} />

      {/* Glow bottom-left */}
      <div className="absolute -bottom-24 -left-16 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(8,145,178,0.06) 0%,transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">

        {/* Main card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "0.5px solid rgba(200,230,68,0.12)",
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-10"
            style={{ borderTop: "1.5px solid rgba(200,230,68,0.5)", borderLeft: "1.5px solid rgba(200,230,68,0.5)", borderRadius: "12px 0 0 0" }} />
          <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-10"
            style={{ borderTop: "1.5px solid rgba(200,230,68,0.2)", borderRight: "1.5px solid rgba(200,230,68,0.2)", borderRadius: "0 12px 0 0" }} />
          <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-10"
            style={{ borderBottom: "1.5px solid rgba(200,230,68,0.2)", borderLeft: "1.5px solid rgba(200,230,68,0.2)", borderRadius: "0 0 0 12px" }} />
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none z-10"
            style={{ borderBottom: "1.5px solid rgba(200,230,68,0.5)", borderRight: "1.5px solid rgba(200,230,68,0.5)", borderRadius: "0 0 12px 0" }} />

          {/* Subtle grid inside card */}
          <div className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,230,68,0.025) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(200,230,68,0.025) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }} />

          {/* Inner glow top */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.35),transparent)" }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 p-8 sm:p-12">

            {/* LEFT: Text */}
            <div ref={leftRef} className="flex-1 lg:pr-12">

              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-6 h-px bg-[#c8e644]" />
                <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#c8e644]">
                  Currently Learning
                </span>
              </div>

              <h2
                ref={headRef}
                className="font-black text-[#f0f4f0] mb-5 leading-[1.1]"
                style={{ fontSize: "clamp(26px,4vw,46px)", fontFamily: "serif" }}
              >
                Front-End{" "}
                <span style={{ color: "#c8e644", fontStyle: "italic" }}>
                  Web Development
                </span>
              </h2>

              <div className="mb-5 rounded-full"
                style={{ width: 48, height: 1, background: "linear-gradient(to right,rgba(200,230,68,0.6),transparent)" }} />

              <div className="space-y-3 mb-7">
                {[
                  "Seeking my first professional role to grow alongside experienced developers.",
                  "Aiming for financial independence and a strong career start in the tech industry.",
                  "A real job environment will accelerate my learning and build my confidence.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-2 w-1 h-1 rounded-full bg-[#c8e644] opacity-70" />
                    <p className="text-sm font-light leading-[1.85] text-[#6a7f8c]">{text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full transition-all duration-200 cursor-default"
                    style={{
                      color: "#c8e644",
                      background: "rgba(200,230,68,0.07)",
                      border: "0.5px solid rgba(200,230,68,0.2)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,230,68,0.14)"; e.currentTarget.style.borderColor = "rgba(200,230,68,0.45)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200,230,68,0.07)"; e.currentTarget.style.borderColor = "rgba(200,230,68,0.2)"; }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {/* <a 
                  href="/cv.pdf"
                  download
                  className="group flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase px-6 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-[#080c10]"
                  style={{ background: "#c8e644", boxShadow: "0 0 18px rgba(200,230,68,0.2)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#d8f060"; e.currentTarget.style.boxShadow = "0 0 26px rgba(200,230,68,0.35)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#c8e644"; e.currentTarget.style.boxShadow = "0 0 18px rgba(200,230,68,0.2)"; }}
                >
                  <svg
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                  Download CV
                </a> */}

                <button
                  className="flex items-center gap-2.5 text-[11px] tracking-[0.12em] uppercase px-6 py-3 rounded-sm transition-all duration-200 text-[#6a7f8c] bg-transparent hover:border-[#c8e644] hover:text-[#c8e644] active:scale-95"
                  style={{ border: "0.5px solid rgba(106,127,140,0.3)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8e644"; e.currentTarget.style.color = "#c8e644"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(106,127,140,0.3)"; e.currentTarget.style.color = "#6a7f8c"; }}
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Projects
                </button>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block flex-shrink-0 w-px self-stretch my-4"
              style={{ background: "linear-gradient(to bottom,transparent,rgba(200,230,68,0.15),transparent)" }} />

            {/* RIGHT: Code Editor Mockup (No Lottie) */}
            <div ref={rightRef} className="flex-shrink-0 w-full lg:w-[440px] flex flex-col items-center lg:pl-10">
              
              <div className="relative w-full">
                {/* Glow behind */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle,rgba(200,230,68,0.08) 0%,transparent 70%)", filter: "blur(20px)" }} />

                {/* Code window */}
                <div className="relative rounded-xl overflow-hidden backdrop-blur-sm"
                  style={{
                    background: "rgba(10, 18, 26, 0.85)",
                    border: "1px solid rgba(200,230,68,0.2)",
                    boxShadow: "0 20px 35px -12px rgba(0,0,0,0.5)",
                  }}>
                  
                  {/* Window toolbar */}
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(200,230,68,0.1)]">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[9px] text-[#4a5a68] font-mono ml-auto">developer.js</span>
                    <span className="text-[9px] text-[#4a5a68] ml-2">─ □ ✕</span>
                  </div>

                  {/* Code content with typing effect */}
                  <div className="p-4 font-mono text-xs leading-relaxed">
                    {codeLines.map((_, idx) => {
                      const line = typedCode[idx] || "";
                      const isLastTyped = idx === typedCode.length - 1 && typedCode.length < codeLines.length;
                      return (
                        <div key={idx} className="whitespace-pre-wrap break-all">
                          <span className="text-[#6a9fb5] select-none">{(idx+1).toString().padStart(2, ' ')}  </span>
                          <span className="text-[#c8e644]">{line}</span>
                          {isLastTyped && <span className="inline-block w-[2px] h-3 bg-[#c8e644] animate-pulse ml-0.5 align-middle" />}
                        </div>
                      );
                    })}
                    {typedCode.length === codeLines.length && (
                      <div className="mt-2 text-[#4a5a68] text-[10px] italic">
                        {/* Optional: blinking cursor after full code */}
                        <span className="inline-block w-[2px] h-3 bg-[#c8e644] animate-pulse ml-1 align-middle" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status card (unchanged) */}
              <div
                className="mt-5 flex items-center gap-3 rounded-xl px-5 py-3 w-full max-w-xs justify-center"
                style={{
                  background: "rgba(8,12,16,0.8)",
                  border: "0.5px solid rgba(200,230,68,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#c8e644", animation: "pulseDot 2s ease-in-out infinite" }} />
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#3d5060]">Status</p>
                  <p className="text-[13px] font-medium text-[#c8e644]">Open to Opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.12),transparent)" }} />

      <style>{`
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }
      `}</style>
    </section>
  );
};

export default Brands;