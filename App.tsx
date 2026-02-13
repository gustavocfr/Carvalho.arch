import React, { useState, useMemo } from 'react';
import { projectsData } from './constants';
import { getProjectImage } from './utils';
import { Navigation } from './components/Navigation';
import { ProjectModal } from './components/ProjectModal';
import { Hero } from './components/Hero';
import { History } from './components/History';
import { Contact } from './components/Contact';
import { AiAssistant } from './components/AiAssistant';
import { Category, ProjectData, View } from './types';
import { Instagram, ArrowUpRight, Filter, ChevronRight, ChevronLeft } from 'lucide-react';

// List of available environment tags for filtering
const ENVIRONMENT_TAGS = ['Sala', 'Sala de Jantar', 'Quarto', 'Cozinha', 'Banheiro', 'Escritório', 'Área Externa', 'Fachada', 'Academia', 'Paisagismo'];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('todos');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Filter Logic
  const filteredProjects = projectsData.filter(p => {
    // 1. Filter by Category
    const categoryMatch = activeCategory === 'todos' || p.category === activeCategory;
    // 2. Filter by Tag (Environment)
    const tagMatch = activeTag === null || p.tags.includes(activeTag);
    
    return categoryMatch && tagMatch;
  });

  // Display Logic: 
  // On Home: Specific Order (Wanderson, Marina, then others)
  // On Projects: Filtered List
  const displayProjects = useMemo(() => {
    if (currentView === 'home') {
      const p1 = projectsData.find(p => p.code === 'WANDERSON');
      const p2 = projectsData.find(p => p.code === 'MARINA');
      const others = projectsData.filter(p => p.code !== 'WANDERSON' && p.code !== 'MARINA').slice(0, 2);
      
      // Filter out undefined if a code is missing/changed in constants
      return [p1, p2, ...others].filter((p): p is ProjectData => !!p);
    }
    return filteredProjects;
  }, [currentView, filteredProjects]);

  const handleContactClick = () => {
    setCurrentView('contact');
    window.scrollTo(0, 0);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setActiveCategory('todos'); 
    setActiveTag(null);
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    // Optional: Reset tag when category changes to avoid empty states, 
    // or keep it if you want to find "Office in Residential"
    setActiveTag(null); 
  };

  return (
    <div className="min-h-screen bg-background text-ink font-sans antialiased selection:bg-accent selection:text-white relative">
      
      <Navigation 
        currentView={currentView}
        onChangeView={handleViewChange}
      />

      {/* Main Content Area */}
      <main>
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <>
            <Hero onCtaClick={handleContactClick} />
            
            {/* Project Teaser Section */}
            <div className="container mx-auto px-6 md:px-12 py-32">
              <div className="flex justify-between items-baseline mb-16">
                 <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Projetos Selecionados</h2>
                 <button onClick={() => handleViewChange('projects')} className="font-sans font-bold text-xs uppercase tracking-widest hover:underline hover:text-accent transition-colors">Ver Todos</button>
              </div>
              <ProjectGrid projects={displayProjects} onSelect={setSelectedProject} />
            </div>
          </>
        )}

        {/* VIEW: PROJECTS (The Gallery) */}
        {currentView === 'projects' && (
          <div className="container mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 animate-fade-in">
            
            <div className="mb-16 md:mb-20">
              <h2 className="font-display font-bold text-6xl md:text-8xl mb-8 tracking-tighter text-center md:text-left">Projetos.</h2>
              
              {/* MAIN FILTER: Categories */}
              <div className="flex flex-wrap gap-6 md:gap-8 font-sans text-sm tracking-widest uppercase mb-8 border-b border-gray-100 pb-8">
                {(['todos', 'comercial', 'interiores', 'arquitetonico', 'paisagismo'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`transition-colors duration-300 ${
                      activeCategory === cat 
                        ? 'font-bold text-accent border-b-2 border-accent pb-1' 
                        : 'font-light text-gray-400 hover:text-accent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* SECONDARY FILTER: Environments (Tags) */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  <Filter size={12} />
                  <span>Filtrar por ambiente:</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {ENVIRONMENT_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)} // Toggle behavior
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider border rounded-full transition-all duration-300 ${
                        activeTag === tag
                          ? 'bg-accent text-white border-accent'
                          : 'bg-transparent text-gray-500 border-gray-200 hover:border-accent hover:text-accent'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  {activeTag && (
                    <button 
                      onClick={() => setActiveTag(null)}
                      className="px-3 py-1 text-[10px] uppercase tracking-wider text-red-400 hover:text-red-600 ml-2"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results Status */}
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center opacity-50 font-sans font-light">
                <p>Nenhum projeto encontrado com os filtros selecionados.</p>
                <button onClick={() => { setActiveCategory('todos'); setActiveTag(null); }} className="mt-4 underline text-accent">Limpar filtros</button>
              </div>
            ) : (
              <ProjectGrid projects={displayProjects} onSelect={setSelectedProject} />
            )}
            
          </div>
        )}

        {/* VIEW: HISTORY */}
        {currentView === 'history' && <History />}

        {/* VIEW: CONTACT */}
        {currentView === 'contact' && <Contact />}

      </main>

      {/* Minimal Footer */}
      {currentView !== 'home' && (
        <footer className="w-full py-12 bg-background border-t border-gray-100">
          <div className="container mx-auto px-6 md:px-12 flex justify-between items-center opacity-50 text-[10px] uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Carvalho Arch.</p>
            <a 
              href="https://instagram.com/carvalho.arch" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Instagram size={14} />
              <span>Instagram</span>
            </a>
          </div>
        </footer>
      )}

      {/* Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* AI Assistant */}
      <AiAssistant />
      
    </div>
  );
}

// Sub-component: Stateful Project Card
const ProjectCard: React.FC<{ 
  project: ProjectData; 
  index: number; 
  onSelect: (p: ProjectData) => void;
}> = ({ project, index, onSelect }) => {
  const [imgIndex, setImgIndex] = useState(1);
  const [leavingImage, setLeavingImage] = useState<string | null>(null);

  // Custom logic to handle specific image cropping/positioning needs
  // Modified to support the new animation state
  const getImageStyles = (code: string, isLeaving = false) => {
    const baseClasses = "w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";
    
    // Interactive classes only apply to the resting state or the leaving image if we want hover effects there (optional)
    // Here we disable hover zoom on the leaving image to keep the slide clean
    const interactiveClasses = isLeaving 
      ? "grayscale-0" 
      : "grayscale group-hover:grayscale-0 group-hover:scale-105";

    // Determine which image index logic to follow for cropping
    const effectiveIndex = isLeaving 
      ? (imgIndex === 1 ? project.count : imgIndex - 1) 
      : imgIndex;

    // Default crop logic
    if (effectiveIndex !== 1) {
       return `${baseClasses} ${interactiveClasses}`;
    }

    // "Crop a little from the bottom" - Anchor Top, Zoom in
    if (code === 'LETICIA') {
       return `${baseClasses} object-top scale-110 ${!isLeaving ? 'group-hover:scale-125' : ''} ${interactiveClasses}`;
    }

    // "Zoom in so @carvalho on top disappears" - Anchor Bottom, Zoom in heavily
    if (code === 'RECEPCAO') {
       return `${baseClasses} object-bottom scale-125 ${!isLeaving ? 'group-hover:scale-[1.35]' : ''} ${interactiveClasses}`;
    }

    // Default
    return `${baseClasses} ${interactiveClasses}`;
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
    
    // 1. Current image becomes the one leaving (sliding down)
    const currentImgUrl = getProjectImage(project.code, imgIndex);
    setLeavingImage(currentImgUrl);
    
    // 2. Set new index immediately (it renders behind)
    setImgIndex((prev) => (prev >= project.count ? 1 : prev + 1));
    
    // 3. Clear leaving image after animation finishes
    // OPTIMIZED: Reduced wait time from 750ms to 500ms to match accelerated CSS animation
    setTimeout(() => setLeavingImage(null), 500);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Same animation effect ("discarding top card"), but changing index backwards
    const currentImgUrl = getProjectImage(project.code, imgIndex);
    setLeavingImage(currentImgUrl);

    setImgIndex((prev) => (prev === 1 ? project.count : prev - 1));

    // OPTIMIZED: Reduced wait time from 750ms to 500ms
    setTimeout(() => setLeavingImage(null), 500);
  };

  return (
    <div 
      className={`group cursor-pointer relative ${index % 2 !== 0 ? 'md:mt-24' : ''}`} // Asymmetrical Layout
      onClick={() => onSelect(project)}
    >
      {/* Cover Image Container */}
      {/* ADDED: perspective-1000 class for 3D depth */}
      <div className="relative overflow-hidden w-full aspect-[4/5] bg-stone mb-4 perspective-1000">
        
        {/* BACKGROUND IMAGE (The New Card - Enter Animation) */}
        {/* Renders at z-0. If transition is active, it scales up. */}
        <div className={`absolute inset-0 z-0 ${leavingImage ? 'animate-card-enter' : ''}`}>
           <img 
            src={getProjectImage(project.code, imgIndex)}
            alt={project.title}
            className={getImageStyles(project.code, false)}
            loading="lazy"
            decoding="async" // OPTIMIZED: Async decoding prevents main thread jank
          />
        </div>

        {/* FOREGROUND IMAGE (The Old Card - Exit Animation) */}
        {/* Renders at z-10 on top. Slides right and rotates. */}
        {leavingImage && (
          <div className="absolute inset-0 z-10 animate-card-exit shadow-2xl">
            <img 
              src={leavingImage}
              alt="Leaving Card"
              className={getImageStyles(project.code, true)} 
              decoding="async"
            />
          </div>
        )}

        {/* Darken Effect on Hover (Only applies when not animating) */}
        {!leavingImage && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 ease-out pointer-events-none z-20" />
        )}
        
        {/* Hover Tags Overlay (Top Left) */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-wrap gap-2 pointer-events-none z-30">
           {project.tags.slice(0, 3).map(tag => (
             <span key={tag} className="bg-white/90 text-ink text-[9px] uppercase tracking-widest px-2 py-1 font-bold">
               {tag}
             </span>
           ))}
        </div>

        {/* PREVIOUS Button (Left) */}
        <button 
          onClick={handlePrevImage}
          className="absolute left-0 top-0 bottom-0 w-1/4 z-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-black/20 to-transparent cursor-pointer"
          title="Imagem anterior"
        >
          <div className="w-8 h-8 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-ink transition-all duration-300 shadow-lg transform group-hover:scale-110">
             <ChevronLeft size={16} />
          </div>
        </button>

        {/* NEXT Button (Right) */}
        <button 
          onClick={handleNextImage}
          className="absolute right-0 top-0 bottom-0 w-1/4 z-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-l from-black/20 to-transparent cursor-pointer"
          title="Próxima imagem"
        >
          <div className="w-8 h-8 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-ink transition-all duration-300 shadow-lg transform group-hover:scale-110">
             <ChevronRight size={16} />
          </div>
        </button>
        
        {/* Slide Counter (Bottom Right on Hover) */}
        <div className="absolute bottom-4 right-4 text-white text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none drop-shadow-md z-30">
           {String(imgIndex).padStart(2, '0')} / {String(project.count).padStart(2, '0')}
        </div>

      </div>
      
      {/* Text Info */}
      <div className="flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity duration-500">
        <div>
          <h3 className="font-sans font-bold text-lg text-ink uppercase tracking-tight mb-1 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="font-sans font-light text-xs uppercase tracking-widest text-gray-500 group-hover:text-accent/70 transition-colors duration-300">{project.category} — {project.location}</p>
        </div>
        {/* Arrow with scale and translate animation */}
        <ArrowUpRight 
          size={20} 
          strokeWidth={1.5}
          className="text-accent transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 ease-out" 
        />
      </div>
    </div>
  );
};

// Sub-component: Project Grid
const ProjectGrid: React.FC<{ projects: ProjectData[], onSelect: (p: ProjectData) => void }> = ({ projects, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-24">
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.code} 
          project={project} 
          index={index} 
          onSelect={onSelect} 
        />
      ))}
    </div>
  );
};