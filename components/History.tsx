import React from 'react';
import { formatTypographicText } from '../utils';

export const History: React.FC = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 animate-fade-in">
      
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        
        {/* TEXT COLUMN */}
        <div className="w-full md:w-5/12 pt-12">
           <span className="block font-sans font-bold text-xs uppercase tracking-[0.2em] mb-8 text-gray-400">Desde 2015</span>
           
           <h2 className="font-display font-bold text-6xl md:text-8xl text-ink mb-12 tracking-tighter">
             História.
           </h2>

           <div className="font-sans font-light text-lg text-ink/80 space-y-8 leading-relaxed text-justify hyphens-auto">
             <p>
               {formatTypographicText("A Carvalho Arch nasceu da inquietação. Da vontade de romper com a produção em massa e retomar a arquitetura como um ofício artesanal, onde cada linha no papel tem um propósito e cada material conta uma história.")}
             </p>
             <p>
               {formatTypographicText("Nossa abordagem é essencialista. Não buscamos o minimalismo apenas como estética, mas como ferramenta para eliminar o ruído e focar no que realmente importa: a luz, o vazio e a experiência humana.")}
             </p>
             <p>
               {formatTypographicText("Acreditamos que um projeto bem sucedido é aquele que desaparece para dar lugar à vida que acontece dentro dele.")}
             </p>
           </div>
        </div>

        {/* IMAGE COLUMN */}
        <div className="w-full md:w-7/12">
           <div className="w-full aspect-[3/4] bg-stone relative">
              <img 
                 src="https://instagram.fipn7-1.fna.fbcdn.net/v/t51.29350-15/457861078_1211778840038783_4057206437897854055_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fipn7-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QHpmbaeBMkn0c6L2UqDrjyVvL5oLZH8o4aZq61pH5hCJVbE0wBAeoTrUJW994amDXxrsRbK5PNh_erff1pOOuFQ&_nc_ohc=n2RiLIT-RRsQ7kNvwHXcuKB&_nc_gid=S2kha4USkEOSaq6REkCOXw&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQ0NzAwOTA1NTMwMTI5MTg5Mw%3D%3D.3-ccb7-5&oh=00_AfsMJnL7L1H-umgM_3BmloPU82DjvrQ0fKdOIcJVFOH7iQ&oe=6994BDBE&_nc_sid=7a9f4b"
                 alt="Formatura na Universidade Federal de Viçosa"
                 className="w-full h-full object-cover grayscale"
              />
           </div>
           <div className="flex justify-between mt-4 font-sans text-xs uppercase tracking-widest text-gray-400">
              <span>Viçosa — MG</span>
              <span>Universidade Federal de Viçosa</span>
           </div>
        </div>

      </div>
    </section>
  );
};