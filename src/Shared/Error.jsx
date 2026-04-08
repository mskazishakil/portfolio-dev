// src/components/Error.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // if using React Router
import img1 from "../assets/404.png";

const Error = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(20px)";
      containerRef.current.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
          containerRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#080c10] to-[#0f1820] flex items-center justify-center px-4 py-16 overflow-hidden">
      
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(200,230,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,230,68,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-[#c8e644]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-[#38bdf8]/5 blur-3xl pointer-events-none" />

      <div
        ref={containerRef}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {/* Image */}
        <div className="mb-8 flex justify-center">
          <img
            src={img1}
            alt="404 Illustration"
            className="max-w-[280px] sm:max-w-[360px] w-full h-auto drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 20px 25px -5px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Error code */}
        <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#c8e644] to-[#a0c030] mb-4 tracking-tighter">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#eef4ff] mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[#6a7f8c] text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#c8e644] text-[#080c10] font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#d8f060] hover:-translate-y-1 hover:shadow-lg active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#c8e644]/40 text-[#c8e644] font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#c8e644]/10 hover:border-[#c8e644] hover:-translate-y-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Optional fun fact / suggestion */}
        <p className="text-xs text-[#3d5060] mt-12">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default Error;