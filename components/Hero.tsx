import React from 'react';
import { getProfileImage } from '../utils';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="w-full min-h-screen pt-28 md:pt-32 flex flex-col md:flex-row animate-fade-in items-start">
      
      {/* SIDE A: Image (50%) */}
      {/* Changed: md:h-[90vh] increases the visible area (less aggressive crop) while keeping the bottom edge cut off. */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] min-h-[500px] relative bg-background overflow-hidden">
        <img 
          src={getProfileImage()} 
          alt="Rafael Carvalho" 
          // Scale 110 (normal zoom) + Object Top (Fixed Head Position)
          className="w-full h-full object-cover object-top scale-110 grayscale-0 hover:grayscale transition-all duration-1000 ease-out"
        />
      </div>

      {/* SIDE B: Content (50%) */}
      {/* Matching height to 90vh */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-12 md:py-0 bg-background md:h-[90vh]">
        <div className="max-w-lg">
          
          {/* Typographic Composition */}
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-ink leading-[0.9] tracking-tighter mb-8">
            Essência <br/>
            <span className="text-gray-400 italic font-light">em cada</span> <br/>
            Traço.
          </h1>

          {/* Roboto Light Subtitle */}
          <p className="font-sans font-light text-lg md:text-xl text-ink/70 leading-relaxed mb-12">
            Projetos autorais com foco na experiência humana, desenhados para durar além das tendências.
          </p>

          {/* Button */}
          <button 
            onClick={onCtaClick}
            className="inline-block bg-accent text-white px-10 py-5 font-sans font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-accent border border-accent transition-all duration-300"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>

    </section>
  );
};