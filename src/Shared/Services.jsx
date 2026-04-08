import { useEffect, useRef } from "react";

function useFadeIn(dir = "up", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from =
      dir === "left"  ? "translateX(-36px)" :
      dir === "right" ? "translateX(36px)"  :
                        "translateY(32px)";
    el.style.opacity  = "0";
    el.style.transform = from;
    el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity   = "1";
        el.style.transform = "translate(0)";
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, dir]);
  return ref;
}

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M2 9h20" />
      </svg>
    ),
    title: "Experience",
    tag: "01",
    desc: "I work with modern front-end technologies — HTML, CSS, JavaScript, and React — to build responsive, performant interfaces. I enjoy learning new tools and staying updated with the latest trends.",
    pills: ["React", "JavaScript", "HTML/CSS"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.2-4 9.5-9 9.9v-4a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v4C2 16.5 6 12 12 2z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M19 4l-2 2M21 8l-2-2" />
      </svg>
    ),
    title: "Ideas",
    tag: "02",
    desc: "I transform creative ideas into polished digital products. From wireframe to production, I focus on clean UI development, intuitive UX, and interactive features that delight users.",
    pills: ["UI Design", "UX Thinking", "Prototyping"],
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: "Technology",
    tag: "03",
    desc: "I offer front-end development services including responsive website design, clean UI components, and interactive features built with modern tools and best practices.",
    pills: ["Tailwind CSS", "Next.js", "Git"],
  },
];

const Services = () => {
  const headRef  = useFadeIn("up",  0);
  const card0Ref = useFadeIn("up",  0.1);
  const card1Ref = useFadeIn("up",  0.25);
  const card2Ref = useFadeIn("up",  0.4);
  const cardRefs = [card0Ref, card1Ref, card2Ref];

  return (
    <section className="relative py-24 px-5 sm:px-10 lg:px-16 overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.2),transparent)" }} />

      {/* Section heading */}
      <div ref={headRef} className="text-center mb-16">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#c8e644] mb-3">
          What I offer
        </p>
        <h2
          className="font-black text-[#f0f4f0] mb-4"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontFamily: "serif" }}
        >
          My <span style={{ color: "#c8e644" }}>Services</span>
        </h2>
        <div className="w-12 h-px mx-auto mb-5"
          style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.6),transparent)" }} />
        <p className="text-sm font-light text-[#6a7f8c] mx-auto" style={{ maxWidth: 480 }}>
          My goal is to deliver fast, modern, and user-friendly interfaces that
          work smoothly across all devices.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ icon, title, tag, desc, pills, featured }, i) => (
          <div
            key={title}
            ref={cardRefs[i]}
            className="group relative rounded-2xl p-7 flex flex-col transition-all duration-400 cursor-default"
            style={{
              background: featured
                ? "rgba(200,230,68,0.04)"
                : "rgba(255,255,255,0.02)",
              border: featured
                ? "0.5px solid rgba(200,230,68,0.3)"
                : "0.5px solid rgba(200,230,68,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,230,68,0.5)";
              e.currentTarget.style.background  = "rgba(200,230,68,0.06)";
              e.currentTarget.style.transform   = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = featured
                ? "rgba(200,230,68,0.3)" : "rgba(200,230,68,0.1)";
              e.currentTarget.style.background  = featured
                ? "rgba(200,230,68,0.04)" : "rgba(255,255,255,0.02)";
              e.currentTarget.style.transform   = "translateY(0)";
            }}
          >
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.6),transparent)" }} />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
              style={{ borderTop: "1.5px solid rgba(200,230,68,0.45)", borderLeft: "1.5px solid rgba(200,230,68,0.45)", borderRadius: "12px 0 0 0" }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
              style={{ borderBottom: "1.5px solid rgba(200,230,68,0.2)", borderRight: "1.5px solid rgba(200,230,68,0.2)", borderRadius: "0 0 12px 0" }} />

            {/* Tag number */}
            <div className="flex items-start justify-between mb-4">
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: "rgba(200,230,68,0.35)", fontFamily: "serif" }}
              >
                {tag}
              </span>
              {featured && (
                <span className="text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(200,230,68,0.12)", color: "#c8e644", border: "0.5px solid rgba(200,230,68,0.25)" }}>
                  Popular
                </span>
              )}
            </div>

            {/* SVG Icon with animated hover */}
            <div className="w-16 h-16 mx-auto mb-5 text-[#c8e644] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <div className="w-full h-full" style={{ color: "#c8e644" }}>
                {icon}
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-xl font-bold text-[#f0f4f0] mb-3 text-center"
              style={{ fontFamily: "serif" }}
            >
              {title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-px mx-auto mb-4"
              style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.5),transparent)" }} />

            {/* Description */}
            <p className="text-[13px] font-light leading-[1.85] text-[#6a7f8c] text-center mb-6 flex-1">
              {desc}
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {pills.map((p) => (
                <span
                  key={p}
                  className="text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{
                    color: "#c8e644",
                    background: "rgba(200,230,68,0.07)",
                    border: "0.5px solid rgba(200,230,68,0.18)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-14">
        <p className="text-sm text-[#3d5060] mb-4 tracking-wide">
          Interested in working together?
        </p>
        <button
          className="text-[11px] font-semibold tracking-[0.14em] uppercase px-8 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-[#080c10]"
          style={{ background: "#c8e644" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d8f060")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#c8e644")}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Let's Talk
        </button>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.12),transparent)" }} />
    </section>
  );
};

export default Services;