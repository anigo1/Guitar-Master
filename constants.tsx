
import { LessonSection, ChordPosition, QuizQuestion } from './types';

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

export const CATEGORIES = ['Estudo de Guitarra', 'Estudo de Música'];

export interface CurriculumLesson {
  id: string;
  title: string;
  category: string;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  order: number;
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export const GUITAR_CURRICULUM: CurriculumLesson[] = [
  // --- MÓDULO 1: O INÍCIO ---
  {
    id: 'l1',
    title: '1. Anatomia e Afinação',
    category: 'Estudo de Guitarra',
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
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Qual é o nome da 1ª corda (a mais fina)?',
        options: ['Mizão (E grave)', 'Lá (A)', 'Si (B)', 'Mizinha (E agudo)'],
        correctAnswer: 3
      },
      {
        id: 'q1-2',
        question: 'Qual é a sequência correta das cordas da mais grossa (6ª) para a mais fina (1ª)?',
        options: ['E A D G B E', 'E B G D A E', 'E A D B G E', 'D A G B E E'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'l2',
    title: '2. A Escala Cromática',
    category: 'Estudo de Música',
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
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Quais pares de notas NÃO possuem sustenido entre elas?',
        options: ['D e E / G e A', 'E e F / B e C', 'C e D / F e G', 'A e B / E e F'],
        correctAnswer: 1
      },
      {
        id: 'q2-2',
        question: 'Se você está na nota C (Dó) e avança uma casa, qual nota você toca?',
        options: ['D (Ré)', 'Cb (Dó bemol)', 'C# (Dó sustenido)', 'B (Si)'],
        correctAnswer: 2
      }
    ]
  },
  
  // --- MÓDULO 2: FUNDAMENTOS TEÓRICOS ---
  {
    id: 'l3',
    title: '3. Intervalos Musicais',
    category: 'Estudo de Música',
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
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Quantas casas equivalem a 1 Tom?',
        options: ['1 Casa', '2 Casas', '3 Casas', '4 Casas'],
        correctAnswer: 1
      },
      {
        id: 'q3-2',
        question: 'Qual intervalo é formado por uma distância de 7 casas (3 tons e meio)?',
        options: ['Terça Maior', 'Oitava', 'Quinta Justa', 'Sétima Menor'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l4',
    title: '4. A Escala Maior',
    category: 'Estudo de Música',
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
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Qual é a fórmula de intervalos da Escala Maior?',
        options: ['T-T-T-S-T-T-S', 'T-S-T-T-S-T-T', 'T-T-S-T-T-T-S', 'S-T-T-T-S-T-T'],
        correctAnswer: 2
      },
      {
        id: 'q4-2',
        question: 'Na escala de C (Dó) Maior, onde estão os semitons?',
        options: ['Entre C-D e G-A', 'Entre E-F e B-C', 'Entre D-E e A-B', 'Não existem semitons'],
        correctAnswer: 1
      }
    ]
  },

  // --- MÓDULO 3: RITMO E TÉCNICA ---
  {
    id: 'l5',
    title: '5. Fundamentos de Ritmo',
    category: 'Estudo de Música',
    description: 'Aprenda sobre compassos, semínimas, colcheias e como manter o tempo.',
    level: 'Iniciante',
    order: 5,
    sections: [
      { type: 'heading', content: 'O Pulso da Música' },
      { type: 'text', content: 'A maioria das músicas pop/rock está em 4/4. Isso significa que contamos "1, 2, 3, 4" repetidamente.' },
      { type: 'list', content: [
        'Semínima (1 batida): Toca-se em cada número (1, 2, 3, 4).',
        'Colcheia (1/2 batida): Toca-se no número e no "e" (1 e 2 e 3 e 4 e).',
        'Semicolcheia (1/4 batida): Toca-se 4 notas por tempo (1 e e a...).'
      ]},
      { type: 'tip', title: 'Palhetada Alternada', content: 'Para colcheias, use Palhetada para Baixo no tempo forte (números) e Palhetada para Cima no contratempo ("e").' }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Em um compasso 4/4, como você conta Colcheias?',
        options: ['1, 2, 3, 4', '1 e 2 e 3 e 4 e', '1 e a 2 e a', 'Um, Dois, Três, Quatro'],
        correctAnswer: 1
      },
      {
        id: 'q5-2',
        question: 'Qual a direção sugerida da palheta para os contratempos ("e")?',
        options: ['Para Baixo', 'Para Cima', 'Circular', 'Aleatória'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l6',
    title: '6. Técnicas Essenciais',
    category: 'Estudo de Guitarra',
    description: 'Hammer-ons, Pull-offs e Slides: Como fazer sua guitarra "cantar".',
    level: 'Intermediário',
    order: 6,
    sections: [
      { type: 'heading', content: 'Legato' },
      { type: 'text', content: 'Legato é a técnica de tocar notas de forma suave e conectada.' },
      { type: 'table', tableData: {
        headers: ['Técnica', 'Símbolo na Tab', 'Como fazer'],
        rows: [
          ['Hammer-on', 'h', 'Toque uma nota e " martele" o dedo em uma casa à frente sem palhetar novamente.'],
          ['Pull-off', 'p', 'O inverso do hammer-on. Puxe o dedo para soar a nota de trás.'],
          ['Slide', '/', 'Deslize o dedo de uma casa para outra mantendo a pressão.']
        ]
      }},
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 2, fret: 5}, 
          {string: 2, fret: 7},
        ],
        label: 'Treino: Toque casa 5, Hammer para 7, Pull-off para 5.' 
      }}
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'O que é um Hammer-on?',
        options: ['Deslizar o dedo de uma casa para outra', 'Tocar uma nota e "martelar" a próxima sem palhetar', 'Puxar a corda para soar a nota anterior', 'Tocar a corda com o polegar'],
        correctAnswer: 1
      },
      {
        id: 'q6-2',
        question: 'Qual símbolo representa o Slide na tablatura?',
        options: ['h', 'p', '/', 'x'],
        correctAnswer: 2
      }
    ]
  },

  // --- MÓDULO 4: HARMONIA APLICADA ---
  {
    id: 'l7',
    title: '7. Formação de Acordes',
    category: 'Estudo de Música',
    description: 'Como as tríades maiores e menores são construídas a partir da escala.',
    level: 'Intermediário',
    order: 7,
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
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'Quais são os 3 graus que formam uma tríade maior?',
        options: ['1, 2, 3', '1, 3M, 5J', '1, 3m, 5J', '1, 4, 5'],
        correctAnswer: 1
      },
      {
        id: 'q7-2',
        question: 'Qual nota define se o acorde é Maior ou Menor?',
        options: ['A Tônica', 'A Quinta', 'A Terça', 'A Sétima'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l8',
    title: '8. O Campo Harmônico Maior',
    category: 'Estudo de Música',
    description: 'O segredo para entender quais acordes "funcionam" juntos em uma tonalidade.',
    level: 'Avançado',
    order: 8,
    sections: [
      { type: 'heading', content: 'A Família de Acordes' },
      { type: 'text', content: 'Se empilharmos terças sobre cada nota da Escala Maior, geramos 7 acordes que soam bem juntos. Isso é o Campo Harmônico.' },
      { type: 'text', content: 'Estrutura fixa: Maior, Menor, Menor, Maior, Maior, Menor, Diminuto.' },
      { type: 'table', tableData: {
        headers: ['Grau', 'Tipo', 'Exemplo em C'],
        rows: [
          ['I', 'Maior (7M)', 'Cmaj7'],
          ['ii', 'Menor (m7)', 'Dm7'],
          ['iii', 'Menor (m7)', 'Em7'],
          ['IV', 'Maior (7M)', 'Fmaj7'],
          ['V', 'Dominante (7)', 'G7'],
          ['vi', 'Menor (m7)', 'Am7'],
          ['vii°', 'Meio-Diminuto', 'Bm7(b5)']
        ]
      }},
      { type: 'tip', title: 'Aplicação', content: 'Para compor em Dó Maior, use qualquer combinação desses acordes. O acorde V (G7) sempre cria tensão para voltar ao I (C).' }
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'Qual é o tipo de acorde do V (quinto) grau no Campo Harmônico Maior?',
        options: ['Menor com Sétima (m7)', 'Maior com Sétima Maior (7M)', 'Meio-Diminuto', 'Dominante (7)'],
        correctAnswer: 3
      },
      {
        id: 'q8-2',
        question: 'No tom de Dó Maior (C), qual é o acorde de grau ii (segundo)?',
        options: ['Dmaj7', 'Dm7', 'Em7', 'G7'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l9',
    title: '9. Sistema CAGED',
    category: 'Estudo de Guitarra',
    description: 'Desbloqueie o braço todo conectando os 5 shapes básicos.',
    level: 'Avançado',
    order: 9,
    sections: [
      { type: 'heading', content: 'Os 5 Formatos' },
      { type: 'text', content: 'Todo acorde pode ser tocado em 5 regiões diferentes usando os formatos dos acordes abertos: C, A, G, E, D.' },
      { type: 'tip', title: 'Conexão', content: 'O final de um shape é o começo do próximo. A ordem é sempre C-A-G-E-D-C...' },
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 5, fret: 0}, {string: 4, fret: 2}, {string: 3, fret: 2}, 
          {string: 2, fret: 1}, {string: 1, fret: 0}, {string: 0, fret: 0}
        ],
        root: 'E', 
        label: 'Exemplo: Shape de E (Mi Maior)' 
      }}
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'Qual é a sequência correta dos shapes no sistema CAGED?',
        options: ['C-D-E-F-G', 'C-A-G-E-D', 'A-B-C-D-E', 'E-A-D-G-B'],
        correctAnswer: 1
      },
      {
        id: 'q9-2',
        question: 'Se você acabou de tocar um acorde com shape de "C", qual é o próximo shape disponível subindo o braço?',
        options: ['A', 'G', 'E', 'D'],
        correctAnswer: 0
      }
    ]
  },

  // --- MÓDULO 5: IMPROVISAÇÃO E ESTILOS ---
  {
    id: 'l10',
    title: '10. Escala Pentatônica',
    category: 'Estudo de Guitarra',
    description: 'A escala mais usada no Rock e Blues. Aprenda o "Shape 1" e como usá-lo.',
    level: 'Intermediário',
    order: 10,
    sections: [
      { type: 'heading', content: 'O Poder das 5 Notas' },
      { type: 'text', content: 'A Pentatônica Menor remove as notas que causam "choque" (trítono) da escala menor natural. É quase impossível soar mal com ela.' },
      { type: 'text', content: 'Fórmula: 1 - b3 - 4 - 5 - b7.' },
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 5, fret: 5}, {string: 5, fret: 8},
          {string: 4, fret: 5}, {string: 4, fret: 7},
          {string: 3, fret: 5}, {string: 3, fret: 7},
          {string: 2, fret: 5}, {string: 2, fret: 8},
          {string: 1, fret: 5}, {string: 1, fret: 8},
          {string: 0, fret: 5}, {string: 0, fret: 8},
        ],
        root: 'A', 
        label: 'Pentatônica de Lá Menor (Am) - Shape 1' 
      }}
    ],
    quiz: [
      {
        id: 'q10-1',
        question: 'Quantas notas tem a escala Pentatônica?',
        options: ['7', '12', '5', '8'],
        correctAnswer: 2
      },
      {
        id: 'q10-2',
        question: 'A fórmula da Pentatônica Menor é:',
        options: ['1 - 2 - 3 - 5 - 6', '1 - b3 - 4 - 5 - b7', '1 - 3 - 5 - 7 - 9', '1 - b2 - 4 - b5 - 7'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'l11',
    title: '11. Relativa Menor',
    category: 'Estudo de Música',
    description: 'Como conectar a escala Maior e Menor sem aprender novos shapes.',
    level: 'Avançado',
    order: 11,
    sections: [
      { type: 'heading', content: 'O Sexto Grau' },
      { type: 'text', content: 'Toda escala Maior tem uma "irmã" Menor que usa EXATAMENTE as mesmas notas. Ela começa no 6º grau.' },
      { type: 'list', content: [
        'Dó Maior (C) = Lá Menor (Am)',
        'Sol Maior (G) = Mi Menor (Em)',
        'Fá Maior (F) = Ré Menor (Dm)'
      ]},
      { type: 'tip', title: 'Truque', content: 'Se você sabe a escala de Dó Maior, você já sabe a de Lá Menor. Só muda a nota de repouso (Tônica).' }
    ],
    quiz: [
      {
        id: 'q11-1',
        question: 'Qual é a escala Relativa Menor de Dó Maior (C)?',
        options: ['Ré Menor (Dm)', 'Mi Menor (Em)', 'Lá Menor (Am)', 'Sol Menor (Gm)'],
        correctAnswer: 2
      },
      {
        id: 'q11-2',
        question: 'Para encontrar a relativa menor de qualquer tom maior, você deve ir para o:',
        options: ['4º Grau', '5º Grau', '6º Grau', '2º Grau'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l12',
    title: '12. Blues Fundamentals',
    category: 'Estudo de Música',
    description: 'A estrutura de 12 compassos e a "Blue Note".',
    level: 'Intermediário',
    order: 12,
    sections: [
      { type: 'heading', content: '12-Bar Blues' },
      { type: 'text', content: 'A forma mais comum de Blues usa apenas 3 acordes dominantes: I7, IV7 e V7.' },
      { type: 'text', content: 'Em Lá (A): 4 compassos de A7, 2 compassos de D7, 2 compassos de A7, 1 de E7, 1 de D7, 1 de A7, 1 de E7 (Turnaround).' },
      { type: 'heading', content: 'A Blue Note' },
      { type: 'text', content: 'Adicione a 5ª diminuta (b5) à pentatônica menor para obter aquele som clássico de blues.' },
      { type: 'fretboard', fretboardConfig: { 
        positions: [
          {string: 4, fret: 5}, {string: 4, fret: 6}, {string: 4, fret: 7}, // 6 is the Blue Note (Eb in Am)
        ],
        label: 'Blue Note (Casa 6) na corda D' 
      }}
    ],
    quiz: [
      {
        id: 'q12-1',
        question: 'Quais são os graus usados no Blues de 12 compassos tradicional?',
        options: ['I, ii, V', 'I, IV, V', 'I, vi, IV', 'ii, V, I'],
        correctAnswer: 1
      },
      {
        id: 'q12-2',
        question: 'Qual nota transforma a Pentatônica Menor na Escala de Blues?',
        options: ['A 3ª Maior', 'A 7ª Maior', 'A 5ª Diminuta (b5) - Blue Note', 'A 2ª Menor'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l13',
    title: '13. Técnicas de Expressão: Bends',
    category: 'Estudo de Guitarra',
    description: 'Como atingir a afinação correta levantando a corda.',
    level: 'Avançado',
    order: 13,
    sections: [
      { type: 'heading', content: 'Full e Half Bends' },
      { type: 'text', content: 'O Bend é a alma da guitarra solo. Você altera a altura da nota esticando a corda.' },
      { type: 'list', content: [
        'Half Bend (1/2 tom): Levanta a corda até soar como a nota de 1 casa à frente.',
        'Full Bend (1 tom): Levanta a corda até soar como a nota de 2 casas à frente.'
      ]},
      { type: 'warning', title: 'Afinação', content: 'O erro mais comum é não chegar na nota alvo. Use seus ouvidos! Toque a nota alvo normal, depois tente igualar o som com o bend.' }
    ],
    quiz: [
      {
        id: 'q13-1',
        question: 'Um "Full Bend" eleva a nota em qual intervalo?',
        options: ['Meio tom (1 casa)', 'Um tom inteiro (2 casas)', 'Um tom e meio (3 casas)', 'Dois tons (4 casas)'],
        correctAnswer: 1
      },
      {
        id: 'q13-2',
        question: 'O que é mais importante ao executar um bend?',
        options: ['Força bruta', 'Velocidade', 'Atingir a afinação correta da nota alvo', 'Usar apenas o dedo indicador'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'l14',
    title: '14. Introdução aos Modos Gregos',
    category: 'Estudo de Música',
    description: 'Desmistificando os modos: Jônio, Dórico, Frígio, Lídio, Mixolídio, Eólio e Lócrio.',
    level: 'Avançado',
    order: 14,
    sections: [
      { type: 'heading', content: 'Mesmas Notas, Outro Centro' },
      { type: 'text', content: 'Modos não são escalas novas. São a escala maior tocada com um centro gravitacional diferente.' },
      { type: 'list', content: [
        'Jônio (I): A escala maior normal. Feliz, brilhante.',
        'Dórico (ii): Menor com 6ª maior. Som de Jazz/Fusion (Ex: Santana).',
        'Frígio (iii): Menor com 2ª menor. Som Espanhol/Metal.',
        'Lídio (IV): Maior com 4ª aumentada. Sonhador, espacial (Ex: Simpsons theme).',
        'Mixolídio (V): Maior com 7ª menor. Som de Rock clássico/Blues.',
        'Eólio (vi): Menor natural. Triste, épico.',
        'Lócrio (vii): Menor com 2ª e 5ª diminuída. Tenso, instável.'
      ]}
    ],
    quiz: [
      {
        id: 'q14-1',
        question: 'Qual modo é conhecido pelo som "Espanhol/Metal" (Menor com 2ª menor)?',
        options: ['Lídio', 'Mixolídio', 'Frígio', 'Dórico'],
        correctAnswer: 2
      },
      {
        id: 'q14-2',
        question: 'O modo Jônio corresponde a qual grau da escala maior?',
        options: ['I (Primeiro)', 'vi (Sexto)', 'V (Quinto)', 'ii (Segundo)'],
        correctAnswer: 0
      }
    ]
  }
];
