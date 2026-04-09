



import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayout = () => {
  const canvasRef = useRef(null);

  // ক্যানভাস পার্টিকেল (আগের মতোই)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200,230,68,${0.06 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,68,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "#060a0d" }}>
      {/* Canvas + backgrounds (pointer-events-none) */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(200,230,68,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(200,230,68,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* অন্যান্য ডেকোরেশন (orb, scan line, etc) - আগের মতো রাখুন, কিন্তু pointer-events-none নিশ্চিত করুন */}

      {/* মূল কন্টেন্ট - Navbar কে বাইরে এনে দিন */}
      <Navbar />

      <div className="relative z-10 w-full pt-16 sm:pt-20">
        {/* pt-16/sm:pt-20 নাভবারের উচ্চতা অনুযায়ী দিয়েছি, যাতে কন্টেন্ট নাভবারের আড়ালে না যায় */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
          <Outlet />
          <Footer />
        </div>
      </div>

      {/* আগের মতো pageEnter অ্যানিমেশন থাকতে পারে, কিন্তু Navbar যেন প্রভাবিত না হয় */}
      <style>{`
        /* আপনার আগের কীফ্রেমগুলি রাখুন */
      `}</style>
    </div>
  );
};

export default MainLayout;