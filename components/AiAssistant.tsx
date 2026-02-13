import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Mic, ArrowRight, Square } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

// Interface for the structured data extracted by the AI
interface ProjectSummary {
  ready: boolean;
  category: string;
  location: string;
  summary: string;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [whatsappData, setWhatsappData] = useState<ProjectSummary | null>(null);
  
  // Ref to hold the recognition instance so we can stop it manually
  const recognitionRef = useRef<any>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Olá. Tudo bem?\nSou a IA da Carvalho Arch.\nMe conte, o que você está imaginando para o seu espaço?' 
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, whatsappData]);

  // Speech to Text Logic - Toggle based
  const toggleMic = () => {
    // IF already listening, STOP.
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // IF not listening, START.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta entrada de áudio. Por favor, digite sua mensagem.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true; // Allow pauses without stopping automatically
    recognition.interimResults = true; // Show results as they speak
    
    recognitionRef.current = recognition;

    let finalTranscript = input; // Keep existing text if appending

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += (finalTranscript ? ' ' : '') + event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Update input with stable text + current spoken chunk
      setInput(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Erro no reconhecimento de fala", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert("Acesso ao microfone negado. Por favor, permita o uso do microfone no seu navegador para usar esta função.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Stop mic if sending
    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
    }

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const historyContent = messages.map(m => ({
         role: m.role,
         parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...historyContent,
            { role: 'user', parts: [{ text: userText }]}
        ],
        config: {
          systemInstruction: `
            Você é a assistente da Carvalho Arch.
            
            TOM DE VOZ:
            - Breve, direta e clara.
            - Tranquila e leve (sem formalidades excessivas, mas sem gírias).
            - Use frases curtas. Separe ideias distintas com quebra de linha (Enter).
            
            OBJETIVO:
            Entender o que o cliente quer (descrição) e ONDE SERÁ A OBRA (localização do projeto).
            
            ATENÇÃO SOBRE LOCALIZAÇÃO:
            - O cliente pode morar em um lugar e querer o projeto em outro.
            - Certifique-se de perguntar "Onde será o projeto?" ou "Qual a cidade da obra?".
            
            CATEGORIAS:
            1. CONSULTORIA: Só decoração/mobiliário. Sem obra.
            2. PROJETO DE INTERIORES: Obra, revestimentos, gesso, marcenaria.
            3. PROJETO ARQUITETÔNICO: Construção do zero ou fachada.

            ESTRUTURA DA RESPOSTA FINAL (JSON):
            Assim que tiver Descrição e Localização do Projeto, encerre e gere o JSON.
            O campo "summary" do JSON deve ser escrito em PRIMEIRA PESSOA.
            
            ^^^JSON
            {
              "ready": true,
              "category": "Consultoria" | "Projeto de Interiores" | "Projeto Arquitetônico",
              "location": "Cidade/Bairro onde será a obra",
              "summary": "Texto em 1ª pessoa (ex: Gostaria de um projeto para meu apartamento...)"
            }
            ^^^
          `,
        },
      });

      let aiText = response.text || "Não entendi. Pode repetir?";
      
      // Parse JSON if present
      const jsonMatch = aiText.match(/\^\^\^JSON([\s\S]*?)\^\^\^/);
      
      if (jsonMatch && jsonMatch[1]) {
        try {
          const data = JSON.parse(jsonMatch[1]);
          setWhatsappData(data);
          // Remove the JSON block from the visible message
          aiText = aiText.replace(jsonMatch[0], '').trim();
        } catch (e) {
          console.error("Erro parsing JSON", e);
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: aiText }]);

    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Minha conexão oscilou. Pode repetir?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Generate WhatsApp Link
  const getWhatsAppLink = () => {
    if (!whatsappData) return '#';
    const phone = "5531971343827";
    // Formatting content as if the user wrote it
    const text = `Olá, Carvalho Arch.\n\nO projeto será em *${whatsappData.location}*.\n\n${whatsappData.summary}\n\n(Categoria identificada: ${whatsappData.category})`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Helper to split text into bubbles
  const renderMessageBubbles = (msg: Message, idx: number) => {
    const lines = msg.text.split('\n').filter(line => line.trim() !== '');
    
    return (
      <div key={idx} className={`flex flex-col gap-2 w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
        {lines.map((line, lineIdx) => (
          <div 
            key={lineIdx}
            className={`max-w-[85%] p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-ink text-white text-right rounded-tl-xl rounded-bl-xl rounded-tr-sm' 
                : 'bg-white text-ink border border-gray-100 text-left rounded-tr-xl rounded-br-xl rounded-tl-sm shadow-sm'
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`pointer-events-auto bg-background border border-gray-200 shadow-2xl w-[90vw] md:w-96 mb-4 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-accent text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Removed Sparkles Icon */}
            <h3 className="font-display font-bold text-sm tracking-widest uppercase">Solicite Orçamento</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 bg-stone/30 no-scrollbar flex flex-col gap-3">
          {messages.map((msg, idx) => renderMessageBubbles(msg, idx))}
          
          {/* WhatsApp Action Card */}
          {whatsappData && (
            <div className="self-center w-full mt-2 animate-fade-in">
              <div className="bg-white border border-accent/20 p-4 rounded-lg shadow-md">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Pronto para enviar</p>
                <div className="mb-4 text-xs space-y-1 text-ink opacity-70">
                  <p>Preparamos uma mensagem personalizada para você enviar no WhatsApp.</p>
                </div>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Solicitar no WhatsApp
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="self-start bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <Loader2 size={16} className="animate-spin text-accent" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {!whatsappData ? (
          <div className="p-3 bg-background border-t border-gray-100 flex gap-2 items-center">
            
            {/* Mic Button - Toggle Behavior */}
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              title={isListening ? "Parar Gravação" : "Gravar Áudio"}
            >
              {isListening ? <Square size={14} fill="currentColor" /> : <Mic size={14} />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isListening ? "Ouvindo... (Clique para parar)" : "Digite ou grave um áudio..."}
              className="flex-1 bg-gray-50 text-ink text-sm p-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-accent/20 transition-all font-sans"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-accent text-white hover:bg-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={14} />
            </button>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 text-center text-xs text-gray-500 border-t border-gray-100">
            Atendimento finalizado.
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) - Text Pill Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto bg-accent text-white flex items-center gap-3 px-6 py-4 rounded-full shadow-lg hover:bg-ink transition-all duration-300 group ${isOpen ? 'opacity-0 translate-y-10 absolute' : 'opacity-100 translate-y-0'}`}
      >
        <MessageSquare size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
        <span className="font-sans font-bold text-xs uppercase tracking-widest whitespace-nowrap">Como posso ajudar?</span>
      </button>

      {/* Close Button when Open (replaces FAB) */}
       <button
        onClick={() => setIsOpen(false)}
        className={`pointer-events-auto w-12 h-12 bg-gray-200 text-ink flex items-center justify-center shadow-lg hover:bg-gray-300 transition-all duration-300 absolute bottom-0 right-0 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
      >
        <X size={20} strokeWidth={1.5} />
      </button>

    </div>
  );
};