
import { LessonSection } from './types';

export const GUITAR_STRINGS = ['E', 'B', 'G', 'D', 'A', 'E'];
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALES = [
  { name: 'Major (Ionian)', formula: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Natural Minor (Aeolian)', formula: [0, 2, 3, 5, 7, 8, 10] },
  { name: 'Major Pentatonic', formula: [0, 2, 4, 7, 9] },
  { name: 'Minor Pentatonic', formula: [0, 3, 5, 7, 10] },
  { name: 'Blues Scale', formula: [0, 3, 5, 6, 7, 10] },
  { name: 'Dorian', formula: [0, 2, 3, 5, 7, 9, 10] },
  { name: 'Phrygian', formula: [0, 1, 3, 5, 7, 8, 10] },
  { name: 'Lydian', formula: [0, 2, 4, 6, 7, 9, 11] },
  { name: 'Mixolydian', formula: [0, 2, 4, 5, 7, 9, 10] },
  { name: 'Locrian', formula: [0, 1, 3, 5, 6, 8, 10] }
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
  // Módulo 1: Fundamentos
  {
    id: 'f1',
    title: 'Anatomia e Afinação',
    category: 'Basics',
    description: 'A base de tudo: conheça seu instrumento, a física das cordas e como manter a afinação precisa.',
    level: 'Iniciante',
    order: 1,
    sections: [
      {
        type: 'heading',
        content: '1. As Cordas e a Afinação Standard'
      },
      {
        type: 'text',
        content: 'A guitarra padrão possui 6 cordas. A contagem sempre começa de baixo para cima (da mais fina para a mais grossa). A afinação padrão (Standard Tuning) é baseada na frequência de referência A4 = 440Hz. Memorizar a ordem e o nome das cordas soltas é o primeiro passo para qualquer estudante.'
      },
      {
        type: 'list',
        content: [
          '1ª Corda (Mais fina - Embaixo): E (Mizinha) - Frequência aprox. 329.6 Hz',
          '2ª Corda: B (Si) - 246.9 Hz',
          '3ª Corda: G (Sol) - 196.0 Hz',
          '4ª Corda: D (Ré) - 146.8 Hz',
          '5ª Corda: A (Lá) - 110.0 Hz',
          '6ª Corda (Mais grossa - Em cima): E (Mizão) - 82.4 Hz'
        ]
      },
      {
        type: 'fretboard',
        title: 'Visualização das Cordas Soltas',
        fretboardConfig: {
          notes: ['E', 'B', 'G', 'D', 'A'],
          label: 'Cordas Soltas (Casa 0)'
        }
      },
      {
        type: 'heading',
        content: '2. Calibres e Tensão'
      },
      {
        type: 'text',
        content: 'O "calibre" refere-se à espessura das cordas, medida em polegadas. O número do pacote (ex: 0.10) refere-se à espessura da primeira corda (Mizinha).'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Calibre', 'Características', 'Uso Comum'],
          rows: [
            ['0.09 (Super Light)', 'Macias, fáceis de fazer bends', 'Iniciantes, Shredding, Solos rápidos'],
            ['0.10 (Light)', 'Equilíbrio entre corpo e tocabilidade', 'Padrão da indústria, Rock, Blues'],
            ['0.11 (Medium)', 'Som encorpado, exige força', 'Jazz, Blues SRV Style, Afinações baixas'],
            ['0.12+ (Heavy)', 'Muita tensão, som gordo e limpo', 'Jazz tradicional, Metal (Drop Tunings)']
          ]
        }
      },
      {
        type: 'tip',
        title: 'Dica de Setup',
        content: 'Se você trocar o calibre das cordas (ex: sair de 0.09 para 0.11), precisará regular o tensor do braço da guitarra, pois a tensão na madeira mudará drasticamente.'
      },
      {
        type: 'heading',
        content: '3. Afinação por Método Relativo'
      },
      {
        type: 'text',
        content: 'Mesmo com afinadores digitais, todo guitarrista deve saber afinar "de ouvido" usando o próprio instrumento como referência. O método baseia-se em igualar o som de uma corda pressionada com a corda solta logo abaixo.'
      },
      {
        type: 'list',
        content: [
          'Toque a 6ª corda na Casa 5 -> Deve soar igual à 5ª corda solta.',
          'Toque a 5ª corda na Casa 5 -> Deve soar igual à 4ª corda solta.',
          'Toque a 4ª corda na Casa 5 -> Deve soar igual à 3ª corda solta.',
          'ATENÇÃO: Toque a 3ª corda na Casa 4 -> Deve soar igual à 2ª corda solta.',
          'Toque a 2ª corda na Casa 5 -> Deve soar igual à 1ª corda solta.'
        ]
      },
      {
        type: 'warning',
        title: 'A Exceção da Corda G',
        content: 'Devido à afinação da guitarra ser baseada em quartas justas (com uma terça maior no meio), a relação entre a corda Sol (G) e Si (B) é a única que ocorre na casa 4. Todas as outras são na casa 5.'
      }
    ]
  },
  {
    id: 'f2',
    title: 'Mapeamento do Braço',
    category: 'Basics',
    description: 'Como navegar pelo braço, entender o sistema cromático e encontrar qualquer nota instantaneamente.',
    level: 'Iniciante',
    order: 2,
    sections: [
      {
        type: 'heading',
        content: '1. O Sistema Cromático e os 12 Sons'
      },
      {
        type: 'text',
        content: 'A música ocidental divide-se em 12 sons. A distância entre cada casa na guitarra é de um "semitom". Dois semitons formam um "tom". É crucial entender a ordem das notas para não se perder.'
      },
      {
        type: 'list',
        content: [
          'Naturais: C - D - E - F - G - A - B',
          'Acidentes (#): Notas intermediárias (Sustenidos/Bemóis)',
          'Sequência Completa: A -> A# -> B -> C -> C# -> D -> D# -> E -> F -> F# -> G -> G# -> (volta para A)'
        ]
      },
      {
        type: 'tip',
        title: 'Regra de Ouro',
        content: 'Não existe sustenido (#) entre B/C e E/F. Lembre-se: "Si e Mi não têm sustenido" (na prática, vão direto para Dó e Fá).'
      },
      {
        type: 'heading',
        content: '2. Enarmonia: Nomes Diferentes, Mesmo Som'
      },
      {
        type: 'text',
        content: 'Uma mesma nota pode ter dois nomes dependendo do contexto. Exemplo: A nota entre C e D pode ser chamada de C# (Dó Sustenido - subindo) ou Db (Ré Bemol - descendo). Na guitarra, é a mesma casa.'
      },
      {
        type: 'heading',
        content: '3. Encontrando as Oitavas (Padrões Geométricos)'
      },
      {
        type: 'text',
        content: 'A guitarra é um instrumento de padrões visuais. Para encontrar a mesma nota em uma oitava acima (mais aguda), usamos formas fixas. Veja onde estão todas as notas "Dó" (C) nos primeiros 12 trastes:'
      },
      {
        type: 'fretboard',
        title: 'Mapeamento da nota C (Dó)',
        fretboardConfig: {
          notes: ['C'],
          root: 'C',
          label: 'Localização de C'
        }
      },
      {
        type: 'text',
        content: 'Observe o padrão: Se você tem uma nota na corda 6 (Mizão), a oitava dela estará sempre duas casas para a frente na corda 4 (Ré).'
      },
      {
        type: 'list',
        content: [
          'Corda 6 (Casa X) -> Oitava na Corda 4 (Casa X+2)',
          'Corda 5 (Casa X) -> Oitava na Corda 3 (Casa X+2)',
          'Corda 4 (Casa X) -> Oitava na Corda 2 (Casa X+3)',
          'Corda 3 (Casa X) -> Oitava na Corda 1 (Casa X+3)'
        ]
      }
    ]
  },
  {
    id: 'f3',
    title: 'Teoria dos Intervalos',
    category: 'Theory',
    description: 'A gramática da música. Entenda as distâncias entre as notas e como elas criam emoções.',
    level: 'Iniciante',
    order: 3,
    sections: [
      {
        type: 'heading',
        content: '1. O Que é um Intervalo?'
      },
      {
        type: 'text',
        content: 'Intervalo é a distância de altura entre duas notas. É a unidade básica da harmonia e melodia. Se as notas são os tijolos, os intervalos são o cimento. Cada intervalo evoca uma sensação específica (tristeza, alegria, tensão, repouso).'
      },
      {
        type: 'heading',
        content: '2. A Tabela Mestra de Intervalos'
      },
      {
        type: 'text',
        content: 'Usando a nota C (Dó) como referência (Tônica), aqui estão todos os intervalos possíveis dentro de uma oitava:'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Nome', 'Símbolo', 'Distância (Tons)', 'Sensação / Exemplo'],
          rows: [
            ['Uníssono', '1', '0', 'Mesma nota repetida'],
            ['2ª Menor', 'b2', '0.5 (1 casa)', 'Tensão Extrema, Tubarão (Jaws)'],
            ['2ª Maior', '2', '1 (2 casas)', 'Suspensão leve, Parabéns pra Você'],
            ['3ª Menor', 'b3', '1.5 (3 casas)', 'Tristeza, Melancolia (Acordes Menores)'],
            ['3ª Maior', '3', '2 (4 casas)', 'Alegria, Brilho (Acordes Maiores)'],
            ['4ª Justa', '4', '2.5 (5 casas)', 'Solene, Hino Nacional'],
            ['Tritono', '#4/b5', '3 (6 casas)', 'O "Diabo na Música", Tensão máxima, Blues'],
            ['5ª Justa', '5', '3.5 (7 casas)', 'Estabilidade, Power Chord (Rock)'],
            ['6ª Menor', 'b6', '4 (8 casas)', 'Drama, Romance trágico'],
            ['6ª Maior', '6', '4.5 (9 casas)', 'Doçura, MPB'],
            ['7ª Menor', 'b7', '5 (10 casas)', 'Funk, Blues, Rock Clássico'],
            ['7ª Maior', '7M', '5.5 (11 casas)', 'Jazz, Sonhador, Nostálgico'],
            ['Oitava', '8', '6 (12 casas)', 'A mesma nota, mais aguda']
          ]
        }
      },
      {
        type: 'heading',
        content: '3. Visualizando os Mais Importantes'
      },
      {
        type: 'text',
        content: 'Para o guitarrista de Rock/Pop, os intervalos de Quinta Justa (Power Chord) e Terça (Maior/Menor) são os mais cruciais inicialmente.'
      },
      {
        type: 'fretboard',
        title: 'Intervalo de Quinta Justa (C + G)',
        fretboardConfig: {
          notes: ['C', 'G'],
          root: 'C',
          label: 'Power Chord C5'
        }
      },
      {
        type: 'text',
        content: 'A Terça define a "alma" do acorde. Se você mover a terça maior uma casa para trás, ela vira terça menor, e o acorde fica triste.'
      },
      {
        type: 'fretboard',
        title: 'Intervalo de Terça Maior (C + E)',
        fretboardConfig: {
          notes: ['C', 'E'],
          root: 'C',
          label: 'Terça Maior (3M)'
        }
      }
    ]
  },
  {
    id: 'h1',
    title: 'Tríades e Formação de Acordes',
    category: 'Theory',
    description: 'Pare de decorar shapes. Aprenda a construir qualquer acorde Maior ou Menor no braço.',
    level: 'Iniciante',
    order: 4,
    sections: [
      {
        type: 'heading',
        content: '1. O DNA do Acorde'
      },
      {
        type: 'text',
        content: 'Um acorde não é um desenho aleatório. É uma estrutura matemática. As tríades são os acordes mais simples, formados por 3 notas empilhadas em terças.'
      },
      {
        type: 'list',
        content: [
          'Tríade Maior = Tônica (1) + 3ª Maior (3) + 5ª Justa (5)',
          'Tríade Menor = Tônica (1) + 3ª Menor (b3) + 5ª Justa (5)',
          'Tríade Diminuta = Tônica (1) + 3ª Menor (b3) + 5ª Diminuta (b5)'
        ]
      },
      {
        type: 'heading',
        content: '2. Exemplo Prático: C (Dó Maior)'
      },
      {
        type: 'text',
        content: 'Vamos aplicar a fórmula para Dó Maior:\n1. Tônica: C\n2. 3ª Maior de C: E (2 tons acima)\n3. 5ª Justa de C: G (3.5 tons acima)\nNotas: C - E - G.'
      },
      {
        type: 'text',
        content: 'Veja como essas três notas se repetem em várias posições do braço. Um acorde "aberto" de C na verdade toca: C - E - G - C - E (repetindo notas em oitavas diferentes).'
      },
      {
        type: 'fretboard',
        title: 'Notas da Tríade de C no Braço',
        fretboardConfig: {
          notes: ['C', 'E', 'G'],
          root: 'C',
          label: 'Tríade C Major'
        }
      },
      {
        type: 'tip',
        title: 'Exercício de Construção',
        content: 'Tente encontrar as notas da tríade de Lá Menor (Am). Fórmula: A (1) - C (b3) - E (5). Localize onde estão todos os As, Cs e Es próximos e monte seu próprio shape.'
      },
      {
        type: 'heading',
        content: '3. Sistema CAGED (Introdução)'
      },
      {
        type: 'text',
        content: 'O sistema CAGED mostra que existem 5 formas básicas de acordes maiores que se conectam ao longo do braço: C, A, G, E, D. Ao dominar a tríade, você percebe que esses shapes são apenas maneiras confortáveis de segurar as notas 1, 3 e 5.'
      }
    ]
  },
  {
    id: 'e1',
    title: 'Pentatônica Menor: O Segredo do Solo',
    category: 'Technique',
    description: 'A escala mais versátil da guitarra moderna. Aprenda o Shape 1 e como frasear com emoção.',
    level: 'Iniciante',
    order: 5,
    sections: [
      {
        type: 'heading',
        content: '1. Por que a Pentatônica Funciona?'
      },
      {
        type: 'text',
        content: 'A escala menor natural tem 7 notas. Duas dessas notas criam intervalos de semitom (tensão) que podem "chocar" com certos acordes. A Pentatônica REMOVE essas duas notas problemáticas (a 2ª e a 6ª menor). O resultado é uma escala de 5 notas que soa bem sobre quase tudo.'
      },
      {
        type: 'list',
        content: [
          'Menor Natural (Am): A - B - C - D - E - F - G',
          'Pentatônica Menor (Am): A - C - D - E - G',
          'Notas removidas: B (Si) e F (Fá)'
        ]
      },
      {
        type: 'heading',
        content: '2. Shape 1 (O Desenho Clássico)'
      },
      {
        type: 'text',
        content: 'Este é o desenho que todo guitarrista aprende primeiro. Ele se encaixa perfeitamente na mão. Na tonalidade de Am, ele começa na casa 5.'
      },
      {
        type: 'fretboard',
        title: 'Pentatônica de Am (Shape 1)',
        fretboardConfig: {
          notes: ['A', 'C', 'D', 'E', 'G'],
          root: 'A',
          label: 'Am Pentatonic'
        }
      },
      {
        type: 'heading',
        content: '3. Como Transformar Escala em Música'
      },
      {
        type: 'text',
        content: 'Saber a escala não é fazer música. Para soar musical, você precisa usar técnicas expressivas nas notas da pentatônica:'
      },
      {
        type: 'list',
        content: [
          'Bends: Erga a corda para atingir a nota seguinte. O bend na corda G (nota D para E) é clássico.',
          'Vibrato: Faça a nota "tremer" para dar sustentação e emoção.',
          'Slides: Deslize de uma nota para outra em vez de palhetar todas.',
          'Repouso: Termine suas frases na Tônica (A) para dar sensação de conclusão.'
        ]
      },
      {
        type: 'tip',
        title: 'A Blue Note',
        content: 'Quer soar como Blues? Adicione a nota Eb (Ré Sustenido) entre o D e o E. É a "Blue Note" (b5). Use-a apenas de passagem, sem repousar nela.'
      }
    ]
  }
];

export const INITIAL_LESSONS = GUITAR_CURRICULUM.slice(0, 3);
