
import { LessonSection, ChordPosition } from './types';

export const GUITAR_STRINGS = ['E', 'B', 'G', 'D', 'A', 'E']; // [0, 1, 2, 3, 4, 5] index mapping
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CHORD_QUALITIES = [
  { name: 'Maior', suffix: '', formula: [0, 4, 7] },
  { name: 'Menor', suffix: 'm', formula: [0, 3, 7] },
  { name: 'Sétima de Dominante', suffix: '7', formula: [0, 4, 7, 10] },
  { name: 'Sétima Maior', suffix: '7M', formula: [0, 4, 7, 11] },
  { name: 'Menor com Sétima', suffix: 'm7', formula: [0, 3, 7, 10] },
  { name: 'Suspenso 4', suffix: 'sus4', formula: [0, 5, 7] },
  { name: 'Suspenso 2', suffix: 'sus2', formula: [0, 2, 7] },
  { name: 'Aumentado', suffix: 'aug', formula: [0, 4, 8] },
  { name: 'Diminuto', suffix: 'dim', formula: [0, 3, 6] },
  { name: 'Meio-Diminuto', suffix: 'm7(b5)', formula: [0, 3, 6, 10] },
];

// Mapping: 5 (Low E), 4 (A), 3 (D), 2 (G), 1 (B), 0 (High E)
export const OPEN_CHORDS: Record<string, Record<string, ChordPosition[]>> = {
  'C': {
    '': [{string: 5, fret: -1}, {string: 4, fret: 3}, {string: 3, fret: 2}, {string: 2, fret: 0}, {string: 1, fret: 1}, {string: 0, fret: 0}],
    '7': [{string: 5, fret: -1}, {string: 4, fret: 3}, {string: 3, fret: 2}, {string: 2, fret: 3}, {string: 1, fret: 1}, {string: 0, fret: 0}],
    '7M': [{string: 5, fret: -1}, {string: 4, fret: 3}, {string: 3, fret: 2}, {string: 2, fret: 0}, {string: 1, fret: 0}, {string: 0, fret: 0}],
  },
  'A': {
    '': [{string: 5, fret: -1}, {string: 4, fret: 0}, {string: 3, fret: 2}, {string: 2, fret: 2}, {string: 1, fret: 2}, {string: 0, fret: 0}],
    'm': [{string: 5, fret: -1}, {string: 4, fret: 0}, {string: 3, fret: 2}, {string: 2, fret: 2}, {string: 1, fret: 1}, {string: 0, fret: 0}],
    '7': [{string: 5, fret: -1}, {string: 4, fret: 0}, {string: 3, fret: 2}, {string: 2, fret: 0}, {string: 1, fret: 2}, {string: 0, fret: 0}],
    'm7': [{string: 5, fret: -1}, {string: 4, fret: 0}, {string: 3, fret: 2}, {string: 2, fret: 0}, {string: 1, fret: 1}, {string: 0, fret: 0}],
    '7M': [{string: 5, fret: -1}, {string: 4, fret: 0}, {string: 3, fret: 2}, {string: 2, fret: 1}, {string: 1, fret: 2}, {string: 0, fret: 0}],
  },
  'G': {
    '': [{string: 5, fret: 3}, {string: 4, fret: 2}, {string: 3, fret: 0}, {string: 2, fret: 0}, {string: 1, fret: 0}, {string: 0, fret: 3}],
    '7': [{string: 5, fret: 3}, {string: 4, fret: 2}, {string: 3, fret: 0}, {string: 2, fret: 0}, {string: 1, fret: 0}, {string: 0, fret: 1}],
  },
  'E': {
    '': [{string: 5, fret: 0}, {string: 4, fret: 2}, {string: 3, fret: 2}, {string: 2, fret: 1}, {string: 1, fret: 0}, {string: 0, fret: 0}],
    'm': [{string: 5, fret: 0}, {string: 4, fret: 2}, {string: 3, fret: 2}, {string: 2, fret: 0}, {string: 1, fret: 0}, {string: 0, fret: 0}],
    '7': [{string: 5, fret: 0}, {string: 4, fret: 2}, {string: 3, fret: 0}, {string: 2, fret: 1}, {string: 1, fret: 0}, {string: 0, fret: 0}],
    'm7': [{string: 5, fret: 0}, {string: 4, fret: 2}, {string: 3, fret: 0}, {string: 2, fret: 0}, {string: 1, fret: 0}, {string: 0, fret: 0}],
  },
  'D': {
    '': [{string: 5, fret: -1}, {string: 4, fret: -1}, {string: 3, fret: 0}, {string: 2, fret: 2}, {string: 1, fret: 3}, {string: 0, fret: 2}],
    'm': [{string: 5, fret: -1}, {string: 4, fret: -1}, {string: 3, fret: 0}, {string: 2, fret: 2}, {string: 1, fret: 3}, {string: 0, fret: 1}],
    '7': [{string: 5, fret: -1}, {string: 4, fret: -1}, {string: 3, fret: 0}, {string: 2, fret: 2}, {string: 1, fret: 1}, {string: 0, fret: 2}],
    'm7': [{string: 5, fret: -1}, {string: 4, fret: -1}, {string: 3, fret: 0}, {string: 2, fret: 2}, {string: 1, fret: 1}, {string: 0, fret: 1}],
    '7M': [{string: 5, fret: -1}, {string: 4, fret: -1}, {string: 3, fret: 0}, {string: 2, fret: 2}, {string: 1, fret: 2}, {string: 0, fret: 2}],
  },
  'B': {
    '7': [{string: 5, fret: -1}, {string: 4, fret: 2}, {string: 3, fret: 1}, {string: 2, fret: 2}, {string: 1, fret: 0}, {string: 0, fret: 2}],
  }
};

export const SCALES = [
  { name: 'Maior (Jônio)', formula: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Menor Natural (Eólio)', formula: [0, 2, 3, 5, 7, 8, 10] },
  { name: 'Pentatônica Maior', formula: [0, 2, 4, 7, 9] },
  { name: 'Pentatônica Menor', formula: [0, 3, 5, 7, 10] },
  { name: 'Blues', formula: [0, 3, 5, 6, 7, 10] },
  { name: 'Dórico', formula: [0, 2, 3, 5, 7, 9, 10] },
  { name: 'Frígio', formula: [0, 1, 3, 5, 7, 8, 10] },
  { name: 'Lídio', formula: [0, 2, 4, 6, 7, 9, 11] },
  { name: 'Mixolídio', formula: [0, 2, 4, 5, 7, 9, 10] },
  { name: 'Lócrio', formula: [0, 1, 3, 5, 6, 8, 10] },
  { name: 'Menor Harmônica', formula: [0, 2, 3, 5, 7, 8, 11] },
  { name: 'Menor Melódica', formula: [0, 2, 3, 5, 7, 9, 11] },
];

export const CATEGORIES = ['Basics', 'Theory', 'Technique', 'Rhythm'];

export interface CurriculumLesson {
  id: string;
  title: string;
  category: string;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  order: number;
  sections: LessonSection[];
}

export const GUITAR_CURRICULUM: CurriculumLesson[] = [
  {
    id: 'l1',
    title: '1. Anatomia e Afinação',
    category: 'Basics',
    description: 'Entenda como sua guitarra funciona, o nome das cordas soltas e como ler tablaturas básicas.',
    level: 'Iniciante',
    order: 1,
    sections: [
      { type: 'heading', content: 'As Cordas Soltas' },
      { type: 'text', content: 'Memorizar o nome das cordas soltas é o primeiro passo. Contamos de baixo (mais fina) para cima (mais grossa).' },
      { type: 'list', content: [
        '1ª Corda (Mais fina): E (Mizinha)', 
        '2ª Corda: B (Si)', 
        '3ª Corda: G (Sol)', 
        '4ª Corda: D (Ré)', 
        '5ª Corda: A (Lá)', 
        '6ª Corda (Mais grossa): E (Mizão)'
      ]},
      { type: 'tip', title: 'Dica de Memorização', content: 'Use a frase: "Ele Bateu Gato Doido Andando Estrada" (EBGDAE).' },
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 5, fret: 0}, {string: 4, fret: 0}, {string: 3, fret: 0}, 
          {string: 2, fret: 0}, {string: 1, fret: 0}, {string: 0, fret: 0}
        ],
        label: 'As 6 Cordas Soltas (Casa 0)' 
      }}
    ]
  },
  {
    id: 'l2',
    title: '2. A Escala Cromática',
    category: 'Theory',
    description: 'Descubra as 12 notas musicais e como elas se repetem ao longo do braço.',
    level: 'Iniciante',
    order: 2,
    sections: [
      { type: 'heading', content: 'As 12 Notas' },
      { type: 'text', content: 'Na música ocidental, existem apenas 12 notas. A distância entre cada casa da guitarra é de um "Semitom".' },
      { type: 'table', tableData: {
        headers: ['Notas Naturais', 'Acidentes (Sustenidos/Bemóis)'],
        rows: [
          ['C (Dó)', 'C# / Db'],
          ['D (Ré)', 'D# / Eb'],
          ['E (Mi)', 'Não tem sustenido (vai direto para F)'],
          ['F (Fá)', 'F# / Gb'],
          ['G (Sol)', 'G# / Ab'],
          ['A (Lá)', 'A# / Bb'],
          ['B (Si)', 'Não tem sustenido (vai direto para C)']
        ]
      }},
      { type: 'warning', title: 'Exceções Importantes', content: 'Lembre-se sempre: Entre E e F, e entre B e C, NÃO existe sustenido nem bemol. É meio tom direto.' },
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 5, fret: 0}, {string: 5, fret: 1}, {string: 5, fret: 2}, {string: 5, fret: 3}, 
          {string: 5, fret: 4}, {string: 5, fret: 5}, {string: 5, fret: 6}, {string: 5, fret: 7},
          {string: 5, fret: 8}, {string: 5, fret: 9}, {string: 5, fret: 10}, {string: 5, fret: 11}, {string: 5, fret: 12}
        ], 
        label: 'Todas as notas na corda E (Mizão)', 
        root: 'E' 
      }}
    ]
  },
  {
    id: 'l3',
    title: '3. Intervalos Musicais',
    category: 'Theory',
    description: 'A régua da música: entenda Tons e Semitons.',
    level: 'Intermediário',
    order: 3,
    sections: [
      { type: 'heading', content: 'O que é um Intervalo?' },
      { type: 'text', content: 'Intervalo é a distância entre duas notas. Na guitarra, é muito visual:' },
      { type: 'list', content: [
        '1 Casa = 1 Semitom (m2)',
        '2 Casas = 1 Tom (M2)',
        '3 Casas = 1 Tom e meio (m3 - Terça Menor)',
        '4 Casas = 2 Tons (M3 - Terça Maior)',
        '7 Casas = Quinta Justa (P5 - Power Chord)'
      ]},
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 4, fret: 3}, // C (Root)
          {string: 3, fret: 2}, // E (M3)
          {string: 3, fret: 5}, // G (P5) - using 5th fret G for clear interval shape
        ],
        root: 'C', 
        label: 'Visualizando Intervalos: C (Raiz), E (3ª Maior), G (5ª Justa)' 
      }}
    ]
  },
  {
    id: 'l4',
    title: '4. A Escala Maior',
    category: 'Theory',
    description: 'A mãe de todas as escalas. Entenda a fórmula T-T-S-T-T-T-S.',
    level: 'Intermediário',
    order: 4,
    sections: [
      { type: 'heading', content: 'A Fórmula Mágica' },
      { type: 'text', content: 'Para construir qualquer escala maior, usamos a sequência de intervalos: Tom, Tom, Semitom, Tom, Tom, Tom, Semitom.' },
      { type: 'text', content: 'Exemplo em Dó (C): C (T) D (T) E (S) F (T) G (T) A (T) B (S) C.' },
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 4, fret: 3}, // C
          {string: 4, fret: 5}, // D
          {string: 3, fret: 2}, // E
          {string: 3, fret: 3}, // F
          {string: 3, fret: 5}, // G
          {string: 2, fret: 2}, // A
          {string: 2, fret: 4}, // B
          {string: 2, fret: 5}, // C
        ],
        root: 'C', 
        label: 'Escala de Dó Maior (Shape de Lá/A)' 
      }}
    ]
  },
  {
    id: 'l5',
    title: '5. Formação de Acordes',
    category: 'Theory',
    description: 'Como as tríades maiores e menores são construídas a partir da escala.',
    level: 'Avançado',
    order: 5,
    sections: [
      { type: 'heading', content: 'Tríades' },
      { type: 'text', content: 'Acordes são formados empilhando terças. Uma tríade básica tem 3 notas:' },
      { type: 'list', content: [
        'Tônica (1): Dá nome ao acorde',
        'Terça (3): Define se é Maior (3M) ou Menor (3m)',
        'Quinta (5): Dá estabilidade'
      ]},
      { type: 'table', tableData: {
        headers: ['Tipo', 'Fórmula', 'Exemplo em C'],
        rows: [
          ['Maior', '1 - 3M - 5J', 'C - E - G'],
          ['Menor', '1 - 3m - 5J', 'C - Eb - G'],
          ['Diminuto', '1 - 3m - 5dim', 'C - Eb - Gb']
        ]
      }},
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 5, fret: -1}, {string: 4, fret: 3}, {string: 3, fret: 2}, 
          {string: 2, fret: 0}, {string: 1, fret: 1}, {string: 0, fret: 0}
        ],
        root: 'C', 
        label: 'Acorde de Dó Maior (C) Aberto' 
      }}
    ]
  },
  {
    id: 'l6',
    title: '6. Sistema CAGED',
    category: 'Technique',
    description: 'Desbloqueie o braço todo conectando os 5 shapes básicos.',
    level: 'Avançado',
    order: 6,
    sections: [
      { type: 'heading', content: 'Os 5 Formatos' },
      { type: 'text', content: 'Todo acorde pode ser tocado em 5 regiões diferentes usando os formatos dos acordes abertos: C, A, G, E, D.' },
      { type: 'tip', title: 'Conexão', content: 'O final de um shape é o começo do próximo. A ordem é sempre C-A-G-E-D-C...' },
      { type: 'text', content: 'Isso permite tocar o MESMO acorde em qualquer lugar do braço.' },
       { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 5, fret: 0}, {string: 4, fret: 2}, {string: 3, fret: 2}, 
          {string: 2, fret: 1}, {string: 1, fret: 0}, {string: 0, fret: 0}
        ],
        root: 'E', 
        label: 'Exemplo: Shape de E (Mi Maior)' 
      }}
    ]
  }
];
