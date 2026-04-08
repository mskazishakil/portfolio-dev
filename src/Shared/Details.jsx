import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dotColors = {
    React: '#61dafb',
    'Node.js': '#6cc24a',
    MongoDB: '#47a248',
    Firebase: '#FFA000',
    Express: '#8b5cf6',
    Tailwind: '#38bdf8',
    NextJS: '#ffffff',
    PostgreSQL: '#336791',
    Stripe: '#635bff',
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/project.json'); // ✅ public/data/ থেকে
        if (!response.ok) throw new Error('Failed to fetch project');
        const data = await response.json();
        const found = data.find((p) => String(p.id) === String(id)); // ✅ ID দিয়ে খোঁজো
        if (!found) throw new Error('Project not found');
        setProject(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#22d3c8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="text-center px-6">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#22d3c8] text-[#0d1b2a] rounded-xl font-medium hover:opacity-90 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Not found
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="text-center">
          <p className="text-white/70">Project not found.</p>
          <Link to="/" className="text-[#22d3c8] underline mt-2 inline-block">
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { name, image, description, big_description, skilled = [], project_link } = project;
  const liveUrl = project_link?.live || null;
  const githubUrl = project_link?.github || null;

  return (
    <div className="min-h-screen bg-[#0a0f1e] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition"
        >
          <span>←</span> Back to Projects
        </button>

        {/* Main Card */}
        <div className="bg-[#0d1b2a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

          {/* Hero Image */}
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{name}</h1>

            {/* Short Description */}
            <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">
              {description}
            </p>

            {/* Big Description */}
            {big_description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">About this project</h2>
                <p className="text-white/60 leading-relaxed">{big_description}</p>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Technologies used</h2>
              <div className="flex flex-wrap gap-2">
                {skilled.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: dotColors[skill] || '#aaa' }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ background: '#22d3c8', color: '#0d1b2a' }}
                >
                  Live Demo <span>↗</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  GitHub Repository <span>↗</span>
                </a>
              )}
              {!liveUrl && !githubUrl && (
                <p className="text-white/50 italic">No external links available.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;