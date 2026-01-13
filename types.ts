
export enum AppView {
  HOME = 'HOME',
  FRETBOARD = 'FRETBOARD',
  LESSONS = 'LESSONS',
  AI_TUTOR = 'AI_TUTOR',
  TUNER = 'TUNER'
}

export interface Note {
  name: string;
  octave: number;
}

export type LessonSectionType = 'text' | 'heading' | 'fretboard' | 'tip' | 'warning' | 'list' | 'table';

export interface LessonSection {
  type: LessonSectionType;
  content?: string | string[]; // string for text/heading, array for lists
  title?: string;
  // For Fretboard sections
  fretboardConfig?: {
    notes: string[];
    root?: string;
    label?: string;
  };
  // For Tables
  tableData?: {
    headers: string[];
    rows: string[][];
  };
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
