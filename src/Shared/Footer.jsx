// Footer.jsx
import { useRef, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const footerLinks = [
  { to: "banner",   label: "Home"     },
  { to: "about",    label: "About"    },
  { to: "skills",   label: "Skills"   },
  { to: "projects", label: "Projects" },
  { to: "contact",  label: "Contact"  },
];

const socials = [
  { label: "GitHub",   href: "https://github.com",   icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4" },
  { label: "Twitter",  href: "https://twitter.com",  icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { label: "Facebook", href: "https://facebook.com", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
];

const Footer = () => {
  const ref1 = useFadeIn(0);
  const ref2 = useFadeIn(0.1);
  const ref3 = useFadeIn(0.2);
  const ref4 = useFadeIn(0.3);

  return (
    <footer className="relative overflow-hidden"
      style={{ borderTop: "0.5px solid rgba(200,230,68,0.1)" }}>

      {/* Glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(200,230,68,0.06) 0%,transparent 70%)" }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,230,68,0.02) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(200,230,68,0.02) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-16 pb-8">

        {/* ── TOP ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div ref={ref1} className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 rounded-md flex items-center justify-center font-black text-sm text-[#080c10]"
                style={{ background: "#c8e644", boxShadow: "0 0 14px rgba(200,230,68,0.3)" }}>
                S
              </span>
              <span className="font-bold tracking-[0.18em] uppercase text-[#f0f4f0] text-sm"
                style={{ fontFamily: "serif" }}>
                Shakil<span style={{ color: "#c8e644" }}>.</span>
              </span>
            </div>

            <p className="text-sm font-light leading-[1.85] text-[#5a7080] mb-6" style={{ maxWidth: 300 }}>
              A passionate Front-End Developer focused on building clean, responsive, and user-friendly web interfaces using modern technologies.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="group w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(200,230,68,0.12)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.45)"; e.currentTarget.style.background = "rgba(200,230,68,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  title={label}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6a7f8c" strokeWidth="1.8"
                    className="group-hover:stroke-[#c8e644] transition-colors duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={ref2}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#c8e644] mb-5 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-[#c8e644]" />
              Navigation
            </p>
            <ul className="space-y-3">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <ScrollLink
                    to={to} smooth duration={700} offset={-70}
                    className="group flex items-center gap-2 text-sm font-light text-[#5a7080] hover:text-[#c8e644] transition-colors duration-200 cursor-pointer w-fit"
                  >
                    <span className="w-0 h-px bg-[#c8e644] group-hover:w-3 transition-all duration-200" />
                    {label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={ref3}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#c8e644] mb-5 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-[#c8e644]" />
              Contact
            </p>
            <ul className="space-y-3">
              {[
                { label: "mdkazishakil5@gmail.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { label: "Bangladesh",       icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { label: "+880 1942171149", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
              ].map(({ label, icon }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-light text-[#5a7080]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8e644" strokeWidth="1.8" className="flex-shrink-0 opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div ref={ref4}>
          {/* Divider */}
          <div className="h-px mb-7"
            style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.15),transparent)" }} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#2d4050] tracking-widest uppercase">
              © {new Date().getFullYear()} Md Shakil Islam. All rights reserved.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] text-[#2d4050]">
              Built with
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded"
                style={{ background: "rgba(200,230,68,0.07)", color: "#c8e644", border: "0.5px solid rgba(200,230,68,0.18)" }}>
                React
              </span>
              <span className="text-[#1e2e38]">&</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded"
                style={{ background: "rgba(200,230,68,0.07)", color: "#c8e644", border: "0.5px solid rgba(200,230,68,0.18)" }}>
                Tailwind CSS
              </span>
            </div>

            {/* Back to top */}
            <ScrollLink
              to="banner" smooth duration={800}
              className="group flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#3d5060] hover:text-[#c8e644] transition-colors duration-200 cursor-pointer"
            >
              Back to top
              <span className="w-6 h-6 rounded flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5"
                style={{ border: "0.5px solid rgba(200,230,68,0.2)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </span>
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;