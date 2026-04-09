// Projects.jsx
import React, { useEffect, useState } from 'react';
import ProjectsCard from '../Shared/ProjectsCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/data/project.json')
      .then(res => res.json())
      .then(data => setProjects(data));
      
  }, []);

  return (
    <div className="min-h-screen py-20 px-4" >

      {/* Section Header */}
      <div className="text-center mb-16">
        <span
          className="inline-block text-[11px] font-medium tracking-[2.5px] uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{ color: '#22d3c8', border: '1px solid rgba(34,211,200,0.3)', background: 'rgba(34,211,200,0.06)' }}
        >
          Portfolio
        </span>

        <h2 className="text-4xl font-medium text-white mb-3">
          My <span style={{ color: '#22d3c8' }}>Projects</span>
        </h2>

        <p className="text-sm max-w-md mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)' }}>
          Here are some of my best projects that showcase my skills and experience
        </p>

        <div className="mx-auto mt-4 rounded-full"
          style={{ width: 48, height: 2, background: '#22d3c8' }} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <ProjectsCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Projects;