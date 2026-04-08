// Contact.jsx
import { useRef, useEffect, useState } from "react";

function useFadeIn(dir = "up", delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from =
      dir === "left"  ? "translateX(-36px)" :
      dir === "right" ? "translateX(36px)"  :
                        "translateY(28px)";
    el.style.opacity    = "0";
    el.style.transform  = from;
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

const contactInfo = [
  {
    label: "Email",
    value: "mdkazishakil5@gmail.com",
    sub:   "Reply within 24 hours",
    icon:  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Location",
    value: "Bangladesh",
    sub:   "Available remotely worldwide",
    icon:  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Phone",
    value: "+880 01942171149",
    sub:   "Mon–Fri, 9am–6pm",
    icon:  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
];

const socials = [
  {
    label: "GitHub",
    href:  "https://github.com",
    icon:  "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com",
    icon:  "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4",
  },
  {
    label: "Twitter",
    href:  "https://twitter.com",
    icon:  "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "Facebook",
    href:  "https://facebook.com",
    icon:  "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
];

// Custom Toast component (lightweight)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-md shadow-2xl"
        style={{
          background: type === "success" ? "rgba(200,230,68,0.95)" : "rgba(255,80,80,0.95)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: type === "success" ? "#080c10" : "white",
        }}
      >
        {type === "success" ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="text-sm font-medium tracking-wide">{message}</span>
      </div>
    </div>
  );
};

const Contact = () => {
  const headRef  = useFadeIn("up",    0);
  const leftRef  = useFadeIn("left",  0.15);
  const rightRef = useFadeIn("right", 0.25);

  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [focus, setFocus] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call (replace with actual backend)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Show success toast
    setToast({ message: "Message sent successfully! I'll get back to you soon.", type: "success" });
    setForm({ name: "", email: "", subject: "", message: "" });
    setIsLoading(false);
    
    // Auto-clear toast after 3 seconds (handled by Toast component)
  };

  const inputBase = {
    background:  "rgba(255,255,255,0.025)",
    border:      "0.5px solid rgba(200,230,68,0.12)",
    color:       "#f0f4f0",
    outline:     "none",
    transition:  "all 0.2s ease",
  };

  const inputFocus = {
    borderColor: "rgba(200,230,68,0.55)",
    boxShadow:   "0 0 0 3px rgba(200,230,68,0.08)",
    background:  "rgba(255,255,255,0.04)",
  };

  return (
    <section id="contact" className="relative py-24 px-5 sm:px-10 lg:px-16 overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.2),transparent)" }} />

      {/* Glow orbs - enhanced */}
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle,rgba(200,230,68,0.07) 0%,transparent 70%)" }} />
      <div className="absolute bottom-1/4 -left-20 w-[350px] h-[350px] rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle,rgba(56,189,248,0.05) 0%,transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headRef} className="text-center mb-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#c8e644] mb-3">
            Get in touch
          </p>
          <h2 className="font-black text-[#f0f4f0] mb-4"
            style={{ fontSize: "clamp(28px,5vw,48px)", fontFamily: "serif" }}>
            Contact <span style={{ color: "#c8e644" }}>Me</span>
          </h2>
          <div className="w-12 h-px mx-auto mb-5"
            style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.6),transparent)" }} />
          <p className="text-sm font-light text-[#6a7f8c] mx-auto" style={{ maxWidth: 480 }}>
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's build something great together.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* LEFT: Info */}
          <div ref={leftRef} className="lg:w-80 flex-shrink-0 flex flex-col gap-5">

            {contactInfo.map(({ label, value, sub, icon }) => (
              <div key={label}
                className="group relative flex items-start gap-4 rounded-xl p-5 transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(200,230,68,0.1)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.1)";  e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.5),transparent)" }} />
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                  style={{ background: "rgba(200,230,68,0.07)", border: "0.5px solid rgba(200,230,68,0.15)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c8e644" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#3d5060] mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-[#f0f4f0] truncate">{value}</p>
                  <p className="text-[11px] text-[#4a6070] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl p-5 transition-all duration-300 hover:border-[rgba(200,230,68,0.25)]"
              style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(200,230,68,0.1)" }}>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#3d5060] mb-4">Find me on</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ label, href, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="group w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(200,230,68,0.12)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.5)"; e.currentTarget.style.background = "rgba(200,230,68,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,230,68,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    title={label}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a9ba8" strokeWidth="1.8"
                      className="group-hover:stroke-[#c8e644] transition-colors duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5 flex items-center gap-3 transition-all duration-200 hover:bg-[rgba(200,230,68,0.05)]"
              style={{ background: "rgba(200,230,68,0.03)", border: "0.5px solid rgba(200,230,68,0.18)" }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: "#c8e644", animation: "pulseDot 2s ease-in-out infinite" }} />
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#3d5060]">Availability</p>
                <p className="text-sm font-medium text-[#c8e644]">Open to Opportunities</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div ref={rightRef} className="flex-1">
            <div className="relative rounded-2xl p-7 sm:p-9 transition-all duration-300 hover:border-[rgba(200,230,68,0.2)]"
              style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(200,230,68,0.12)" }}>

              <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none"
                style={{ borderTop: "1.5px solid rgba(200,230,68,0.5)", borderLeft: "1.5px solid rgba(200,230,68,0.5)", borderRadius: "12px 0 0 0" }} />
              <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
                style={{ borderBottom: "1.5px solid rgba(200,230,68,0.25)", borderRight: "1.5px solid rgba(200,230,68,0.25)", borderRadius: "0 0 12px 0" }} />

              <div className="absolute top-0 left-8 right-8 h-px"
                style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.3),transparent)" }} />

              <p className="text-[11px] tracking-[0.22em] uppercase text-[#c8e644] mb-1 flex items-center gap-2">
                <span className="inline-block w-5 h-px bg-[#c8e644]" />
                Send a Message
              </p>
              <h3 className="text-xl font-bold text-[#f0f4f0] mb-7" style={{ fontFamily: "serif" }}>
                Let's <span style={{ color: "#c8e644" }}>Talk</span>
              </h3>

              <form onSubmit={submit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name",  placeholder: "Your name",    label: "Name",  type: "text"  },
                    { name: "email", placeholder: "your@email.com",label: "Email", type: "email" },
                  ].map(({ name, placeholder, label, type }) => (
                    <div key={name}>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3d5060] mb-2">{label}</label>
                      <input
                        type={type} name={name} required
                        value={form[name]} onChange={handle}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-[#2d4050] transition-all duration-200"
                        style={focus === name ? { ...inputBase, ...inputFocus } : inputBase}
                        onFocus={() => setFocus(name)}
                        onBlur={() => setFocus("")}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3d5060] mb-2">Subject</label>
                  <input
                    type="text" name="subject" required
                    value={form.subject} onChange={handle}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-[#2d4050] transition-all duration-200"
                    style={focus === "subject" ? { ...inputBase, ...inputFocus } : inputBase}
                    onFocus={() => setFocus("subject")}
                    onBlur={() => setFocus("")}
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#3d5060] mb-2">Message</label>
                  <textarea
                    name="message" required rows={5}
                    value={form.message} onChange={handle}
                    placeholder="Tell me about your project or idea..."
                    className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-[#2d4050] resize-none transition-all duration-200"
                    style={focus === "message" ? { ...inputBase, ...inputFocus } : inputBase}
                    onFocus={() => setFocus("message")}
                    onBlur={() => setFocus("")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading ? "rgba(200,230,68,0.6)" : "#c8e644",
                    color: "#080c10",
                    boxShadow: isLoading ? "none" : "0 0 20px rgba(200,230,68,0.2)",
                  }}
                  onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.background = "#d8f060"; e.currentTarget.style.boxShadow = "0 0 28px rgba(200,230,68,0.35)"; } }}
                  onMouseLeave={(e) => { if (!isLoading) { e.currentTarget.style.background = "#c8e644"; e.currentTarget.style.boxShadow = "0 0 20px rgba(200,230,68,0.2)"; } }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(200,230,68,0.12),transparent)" }} />

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <style>{`
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease forwards;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;