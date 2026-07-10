import type { Project } from '@/lib/types';
import { FitTitle } from '@/components/fit-title';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-face flip-front">
          <div className="flip-front-content">
            <div className="flip-logo-zone">
              <span className="flip-badge">{project.title.charAt(0)}</span>
            </div>
            <FitTitle className="flip-title-centered">{project.title}</FitTitle>
            <p className="flip-desc-box flip-desc-justify">
              {project.shortDescription}
            </p>
          </div>
        </div>

        <div className="flip-face flip-back">
          <div className="flip-border-ring" aria-hidden="true" />
          <div className="flip-back-content">
            <span className="flip-stack-title">Tech Stack</span>
            <div className="flip-tags">
              {project.skillTags.map((tag) => (
                <span key={tag} className="flip-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
