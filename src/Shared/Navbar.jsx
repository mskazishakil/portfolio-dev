import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("banner");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ===== স্ক্রল ফাংশন =====
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);

    // যদি home page এ না থাকি, তাহলে আগে home এ যাও তারপর scroll করো
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300);
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) {
      setTimeout(() => {
        const retry = document.getElementById(sectionId);
        if (retry) {
          const y = retry.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);
      return;
    }
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // ===== অ্যাক্টিভ সেকশন ট্র্যাকিং =====
  useEffect(() => {
    const sections = ["banner", "about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-70px 0px -30% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // ===== স্ক্রল ইভেন্ট =====
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

          setScrolled(currentScrollY > 20);
          setScrollPct(maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0);

          if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 80) {
            setVisible(false);
          } else if (currentScrollY < lastScrollY.current - 8) {
            setVisible(true);
          }
          if (currentScrollY <= 20) setVisible(true);

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "banner", label: "Home" },
    { id: "about", label: "About" },
    // { id: "brands", label: "Brands" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: visible ? 0 : "-100px",
          background: scrolled ? "rgba(8, 12, 16, 0.85)" : "rgba(8, 12, 16, 0.4)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(200,230,68,0.15)"
            : "1px solid rgba(200,230,68,0.05)",
          boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ✅ Logo — যেকোনো page থেকে home এ ফিরে যাবে */}
            <Link
              to="/"
              className="relative group flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#c8e644] to-[#a0c030] flex items-center justify-center shadow-lg shadow-[#c8e644]/20 group-hover:scale-105 transition-transform duration-300">
                <span className="font-black text-base text-[#0a0f14]">S</span>
              </div>
              <span className="font-bold tracking-[0.2em] text-[#f0f4f0] text-sm sm:text-base uppercase">
                SHAKIL<span className="text-[#c8e644]">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`relative px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-md ${
                      activeSection === id
                        ? "text-[#c8e644]"
                        : "text-[#8a9ca8] hover:text-white"
                    }`}
                  >
                    {label}
                    {activeSection === id && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c8e644] shadow-glow" />
                    )}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#c8e644] transition-all duration-300 ${
                        activeSection === id ? "w-5" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Hire Me + Hamburger */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase rounded-full bg-gradient-to-r from-[#c8e644] to-[#b0d030] text-[#0a0f14] shadow-md shadow-[#c8e644]/30 hover:shadow-lg hover:shadow-[#c8e644]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a0f14] animate-pulse" />
                Hire Me
              </button>
              <button
                className="lg:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className={`block w-5 h-0.5 bg-[#c8e644] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-[#c8e644] rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
                <span className={`block w-5 h-0.5 bg-[#c8e644] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-400 ease-in-out"
          style={{
            maxHeight: menuOpen ? "380px" : "0",
            opacity: menuOpen ? 1 : 0,
            background: "rgba(8,12,16,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: menuOpen ? "1px solid rgba(200,230,68,0.1)" : "none",
          }}
        >
          <div className="px-6 py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map(({ id, label }, i) => (
                <li
                  key={id}
                  style={{
                    transitionDelay: `${i * 50}ms`,
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                  className="transition-all duration-300"
                >
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 ${
                      activeSection === id
                        ? "bg-[#c8e644]/10 text-[#c8e644] border-l-4 border-[#c8e644]"
                        : "text-[#8a9ca8] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full transition-all ${activeSection === id ? "bg-[#c8e644] scale-125" : "bg-[#8a9ca8]"}`} />
                    {label}
                  </button>
                </li>
              ))}
              <li className="mt-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 text-center text-sm font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#c8e644] to-[#b0d030] text-[#0a0f14] shadow-md"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c8e644]/20 to-transparent">
          <div
            className="h-full bg-gradient-to-r from-[#c8e644] via-[#e0ff70] to-[#c8e644] shadow-[0_0_10px_#c8e644] transition-all duration-150"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      </nav>

      <style>{`
        .shadow-glow { box-shadow: 0 0 8px #c8e644; }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(0.7); }
        }
        .animate-pulse { animation: pulseDot 2s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default Navbar;