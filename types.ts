export type Category = 'todos' | 'comercial' | 'interiores' | 'arquitetonico' | 'paisagismo';

export type View = 'home' | 'projects' | 'history' | 'contact';

export interface ImageCaption {
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ProjectData {
  code: string;       // Folder Name
  title: string;
  category: Category;
  location: string;
  count: number;      // Number of images in folder
  description: string;
  tags: string[];     // New: List of environments (e.g., 'Sala', 'Quarto')
  captions?: Record<number, ImageCaption>; // Specific caption for specific slide index
}