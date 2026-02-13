import { ProjectData } from './types';

export const projectsData: ProjectData[] = [
    {
      code: 'RECEPCAO',
      title: 'Hospital Veterinário',
      category: 'interiores',
      location: 'São Paulo, Guarulhos', // Updated Location
      count: 3,
      description: 'Um espaço de acolhimento que foge da estética clínica tradicional. A marcenaria sofisticada e a iluminação quente criam uma atmosfera de tranquilidade para tutores e pacientes no primeiro contato com o hospital veterinário.',
      tags: ['Recepção', 'Interiores', 'Sala de Espera', 'Comercial']
    },
    {
      code: 'LETICIA',
      title: 'Residência Letícia',
      category: 'interiores',
      location: 'Ipatinga, MG',
      count: 5,
      description: 'Um projeto de interiores que respira aconchego e personalidade. A integração entre sala e cozinha é enriquecida por pontos de cor vibrantes que quebram a sobriedade, criando um ambiente dinâmico e acolhedor para o convívio diário.',
      tags: ['Sala', 'Cozinha', 'Interiores', 'Decoração']
    },
    { 
      code: 'WANDERSON', 
      title: 'Academia Wanderson', 
      category: 'comercial', 
      location: 'Caratinga, MG', 
      count: 7, 
      description: 'Projeto arquitetônico e de interiores para uma academia onde a performance encontra o bem-estar. O foco principal foi a integração visual e sensorial dos espaços de treino com o paisagismo, criando um respiro verde em meio à estrutura de concreto e metal.',
      tags: ['Academia', 'Interiores', 'Fachada', 'Paisagismo', 'Recepção'],
      captions: {
        7: {
          text: "Paisagismo autoral desenvolvido por ",
          linkText: "@katiuscia.godoy",
          linkUrl: "https://www.instagram.com/katiuscia.godoy"
        }
      }
    },
    { 
      code: 'MARINA', 
      title: 'Residência Marina', 
      category: 'interiores', 
      location: 'Ipatinga, MG', 
      count: 4, 
      description: 'Projeto de interiores focado nas áreas sociais. A curadoria de mobiliário e a iluminação cênica nas salas de estar e jantar criam uma atmosfera de sofisticação e acolhimento para a família.',
      tags: ['Sala', 'Sala de Jantar']
    },
    { 
      code: 'A', 
      title: 'Cartório Viviane', 
      category: 'comercial', 
      location: 'Virginópolis, MG', 
      count: 10, 
      description: 'Interiores com foco em seriedade e acolhimento. O uso de madeira e iluminação quente contrapõe a frieza burocrática.',
      tags: ['Recepção', 'Sala de Reunião', 'Escritório', 'Hall']
    },
    { 
      code: 'B', 
      title: 'Residência Mike', 
      category: 'arquitetonico', 
      location: 'Caratinga, MG', 
      count: 8, 
      description: 'Reforma e ampliação residencial. Volumes puros se destacam na paisagem montanhosa.',
      tags: ['Fachada', 'Área Externa', 'Piscina', 'Varanda']
    },
    { 
      code: 'C', 
      title: 'Interiores Sara', 
      category: 'interiores', 
      location: 'Ipatinga, MG', 
      count: 6, 
      description: 'Design contemporâneo e funcional. Uma paleta monocromática com texturas ricas.',
      tags: ['Sala', 'Quarto', 'Cozinha', 'Banheiro']
    },
    { 
      code: 'D', 
      title: 'Escritório Israel', 
      category: 'comercial', 
      location: 'Belo Horizonte, MG', 
      count: 5, 
      description: 'Espaço corporativo integrado. Transparência e fluidez foram os conceitos chave.',
      tags: ['Escritório', 'Sala de Reunião', 'Copa']
    },
    { 
      code: 'E', 
      title: 'Florestar', 
      category: 'paisagismo', 
      location: 'Nova Lima, MG', 
      count: 7, 
      description: 'Conexão entre arquitetura e natureza. O jardim invade a sala de estar.',
      tags: ['Jardim', 'Área Externa', 'Piscina']
    }
];