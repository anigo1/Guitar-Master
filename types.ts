
export enum AppView {
  HOME = 'HOME',
  FRETBOARD = 'FRETBOARD',
  LESSONS = 'LESSONS',
  AI_TUTOR = 'AI_TUTOR',
  TUNER = 'TUNER',
  CHORDS = 'CHORDS'
}

export interface Note {
  name: string;
  octave: number;
}

export interface ChordPosition {
  string: number; // 0 to 5 (E to e)
  fret: number;   // -1 for Muted (X), 0 for Open (O), 1+ for Fretted
}

export type LessonSectionType = 'text' | 'heading' | 'fretboard' | 'tip' | 'warning' | 'list' | 'table';

export interface LessonSection {
  type: LessonSectionType;
  content?: string | string[];
  title?: string;
  fretboardConfig?: {
    notes?: string[];
    positions?: ChordPosition[]; // Added specific positions support
    root?: string;
    label?: string;
  };
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

export interface AIResponse {
  explanation: string;
  exercises: string[];
  tips: string[];
}
