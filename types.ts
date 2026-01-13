
export enum AppView {
  HOME = 'HOME',
  FRETBOARD = 'FRETBOARD',
  LESSONS = 'LESSONS',
  AI_TUTOR = 'AI_TUTOR',
  GLOSSARY = 'GLOSSARY'
}

export interface Note {
  name: string;
  octave: number;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'Basics' | 'Theory' | 'Technique' | 'Rhythm';
  description: string;
  content: string;
}

export interface FretboardState {
  highlightedNotes: string[];
  scaleName?: string;
  rootNote?: string;
}

export interface AIResponse {
  explanation: string;
  exercises: string[];
  tips: string[];
}
