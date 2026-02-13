import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="font-display font-bold text-5xl md:text-7xl text-ink mb-16 text-center tracking-tighter">Contato.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Direct Links */}
          <div className="space-y-12 py-8">
             <div>
               <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-4">Social</h3>
               <a href="https://instagram.com/carvalho.arch" target="_blank" rel="noreferrer" className="block font-display text-2xl hover:text-accent transition-colors">@carvalho.arch</a>
             </div>
             
             <div>
               <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-4">WhatsApp</h3>
               <a href="https://wa.me/5531999999999" target="_blank" rel="noreferrer" className="block font-display text-2xl hover:text-accent transition-colors">+55 31 99999-9999</a>
             </div>

             <div>
               <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-4">Email</h3>
               <a href="mailto:contato@carvalho.arch" className="block font-display text-2xl hover:text-accent transition-colors">contato@carvalho.arch</a>
             </div>
          </div>

          {/* Form */}
          <form className="space-y-8 bg-stone/30 p-8 md:p-12">
            <div className="space-y-2">
              <label className="font-sans font-bold text-[10px] uppercase tracking-widest text-ink">Nome Completo</label>
              <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 text-ink focus:outline-none focus:border-accent font-sans font-light transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="font-sans font-bold text-[10px] uppercase tracking-widest text-ink">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 text-ink focus:outline-none focus:border-accent font-sans font-light transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="font-sans font-bold text-[10px] uppercase tracking-widest text-ink">Mensagem</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-gray-300 py-3 text-ink focus:outline-none focus:border-accent font-sans font-light transition-colors resize-none"></textarea>
            </div>

            <button type="button" className="group w-full bg-accent text-white py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-accent border border-accent transition-all duration-300 flex items-center justify-center gap-2">
              Enviar
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};