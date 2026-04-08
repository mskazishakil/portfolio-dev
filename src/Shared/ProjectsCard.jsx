

import { Link } from "react-router-dom";

const ProjectsCard = ({ project }) => {
  const { id, name, description, image, skilled, project_link, category } = project;

  // Extract live URL safely
  const liveUrl = project_link?.live || null;

  const dotColors = {
    React: "#61dafb",
    "Node.js": "#6cc24a",
    MongoDB: "#47a248",
    Firebase: "#FFA000",
    Express: "#aaa",
  };

  const visibleSkills = skilled?.slice(0, 3) || [];
  const extraCount = (skilled?.length || 0) - 3;

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ background: "#0d1b2a", borderColor: "rgba(255,255,255,0.08)", width: "340px" }}
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Title + Category */}
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-white font-medium text-[17px]">{name}</h2>
          <span className="text-xs font-medium" style={{ color: "#22d3c8" }}>{category}</span>
        </div>

        {/* Description */}
        <p className="text-sm mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.6" }}>
          {description}
        </p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: dotColors[skill] || "#aaa" }}
              />
              {skill}
            </span>
          ))}
          {extraCount > 0 && (
            <span
              className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              +{extraCount}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-85"
              style={{ background: "#22d3c8", color: "#0d1b2a" }}
            >
              Live <span>↗</span>
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium cursor-not-allowed opacity-50"
              style={{ background: "#2d3e4e", color: "#aaa" }}
            >
              Live (unavailable)
            </button>
          )}

          <Link
            to={`/details/${project.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            View Details <span>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;