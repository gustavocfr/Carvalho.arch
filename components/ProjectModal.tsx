import React, { useEffect, useState, useCallback } from 'react';
import { ProjectData } from '../types';
import { getProjectImage, formatTypographicText } from '../utils';
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset index when opening a new project
  useEffect(() => {
    if (project) {
      setCurrentIndex(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!project) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }, [project, currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project) return null;

  const nextImage = () => {
    setIsAnimating(true);
    // OPTIMIZED: Reduced wait time from 300ms to 200ms for snappy gallery
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === project.count ? 1 : prev + 1));
      setIsAnimating(false);
    }, 200); 
  };

  const prevImage = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 1 ? project.count : prev - 1));
      setIsAnimating(false);
    }, 200);
  };

  // Check for specific caption for this image index
  const currentCaption = project.captions?.[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12 bg-ink/20 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      
      {/* THE WINDOW CONTAINER */}
      <div className="bg-background w-full h-full md:h-full max-w-[1600px] shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-white/50">
        
        {/* CLOSE BUTTON (Absolute) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-accent hover:text-white rounded-full transition-all duration-300 backdrop-blur-md"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* LEFT COLUMN: EDITORIAL CONTENT (35%) */}
        <div className="w-full md:w-[35%] lg:w-[30%] h-auto md:h-full bg-background flex flex-col justify-between p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-gray-100 relative z-10 order-2 md:order-1">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-accent"></span>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400">{project.category}</p>
            </div>
            
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-ink leading-[0.9] tracking-tighter mb-4">
              {project.title}
            </h2>
            <p className="font-sans font-medium text-xs uppercase tracking-widest text-accent mb-8">
              {project.location}
            </p>

            <p className="font-sans font-light text-base md:text-lg text-ink/70 leading-relaxed text-justify hyphens-auto hidden md:block">
              {formatTypographicText(project.description)}
            </p>
          </div>

          {/* Controls Area */}
          <div className="mt-8 md:mt-0 flex flex-col gap-6">
            
            {/* Mobile Description (Visible only on small screens) */}
            <p className="font-sans font-light text-sm text-ink/70 leading-relaxed text-justify hyphens-auto md:hidden mb-4">
              {formatTypographicText(project.description)}
            </p>
            
            {/* Mobile Dynamic Caption (Fallback if overlay is too cramped on phone) */}
            {currentCaption && (
              <div className="md:hidden mb-4 pt-4 border-t border-gray-100">
                 <p className="font-sans text-xs text-gray-500 italic">
                  {currentCaption.text}
                  {currentCaption.linkUrl && (
                    <a href={currentCaption.linkUrl} target="_blank" rel="noreferrer" className="font-bold text-accent">
                      {currentCaption.linkText}
                    </a>
                  )}
                </p>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              
              {/* Counter */}
              <div className="font-mono text-xs text-gray-400">
                <span className="text-ink font-bold text-lg">
                  {String(currentIndex).padStart(2, '0')}
                </span>
                <span className="mx-2">/</span>
                {String(project.count).padStart(2, '0')}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button 
                  onClick={prevImage}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:border-accent hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <ArrowLeft size={18} />
                </button>
                <button 
                  onClick={nextImage}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:border-accent hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE IMAGE (65%) */}
        <div className="w-full md:w-[65%] lg:w-[70%] h-[50vh] md:h-full bg-stone relative overflow-hidden group order-1 md:order-2">
          
          {/* Image Layer */}
          {/* OPTIMIZED: Faster transition duration 300ms -> 200ms */}
          <div className={`w-full h-full transition-opacity duration-200 ease-in-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <img 
              src={getProjectImage(project.code, currentIndex)} 
              alt={`${project.title} - View ${currentIndex}`}
              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 transform"
              decoding="async" // OPTIMIZED
            />
          </div>

          {/* EDITORIAL OVERLAY BADGE (Desktop) */}
          {currentCaption && (
            <div className="absolute bottom-12 left-12 z-40 hidden md:block animate-[fadeIn_0.8s_ease-out]">
              <div className="bg-white px-6 py-4 shadow-lg border-l-4 border-accent flex flex-col items-start gap-1 max-w-sm">
                 <span className="font-sans text-[9px] uppercase tracking-widest text-gray-400">Colaboração</span>
                 <p className="font-sans text-xs text-ink">
                    {currentCaption.text}
                    {currentCaption.linkUrl && (
                      <a 
                        href={currentCaption.linkUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="font-bold text-ink hover:text-accent transition-colors border-b border-gray-300 hover:border-accent ml-1 pb-px"
                      >
                        {currentCaption.linkText}
                      </a>
                    )}
                 </p>
              </div>
            </div>
          )}

          {/* Interactive Overlay Click Areas (Invisible but usable) */}
          <div className="absolute inset-y-0 left-0 w-1/3 z-20 cursor-w-resize" onClick={prevImage} title="Anterior"></div>
          <div className="absolute inset-y-0 right-0 w-1/3 z-20 cursor-e-resize" onClick={nextImage} title="Próxima"></div>

          {/* Progress Bar (Bottom of image) */}
          <div className="absolute bottom-0 left-0 h-1 bg-accent/20 w-full z-30">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${(currentIndex / project.count) * 100}%` }}
            />
          </div>

        </div>

      </div>
    </div>
  );
};