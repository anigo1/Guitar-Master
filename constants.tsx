
export const GUITAR_STRINGS = ['E', 'B', 'G', 'D', 'A', 'E'];
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALES = [
  // Escalas Básicas (e seus nomes modais)
  { name: 'Major (Ionian)', formula: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Natural Minor (Aeolian)', formula: [0, 2, 3, 5, 7, 8, 10] },
  
  // Pentatônicas e Blues
  { name: 'Major Pentatonic', formula: [0, 2, 4, 7, 9] },
  { name: 'Minor Pentatonic', formula: [0, 3, 5, 7, 10] },
  { name: 'Blues Scale', formula: [0, 3, 5, 6, 7, 10] },

  // Modos Gregos Restantes
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
  content?: string;
}

export const GUITAR_CURRICULUM: CurriculumLesson[] = [
  // Módulo 1: Fundamentos
  {
    id: 'f1',
    title: 'Anatomia e Afinação',
    category: 'Basics',
    description: 'Conheça seu instrumento e aprenda a deixá-lo pronto para tocar.',
    level: 'Iniciante',
    order: 1,
    content: `
# Anatomia da Guitarra e Afinação

## 1. As Partes da Guitarra
Para dominar o instrumento, primeiro precisamos falar a mesma língua.
* **Headstock (Mão):** Onde ficam as tarraxas para afinação.
* **Braço (Neck):** Onde você digita as notas. Contém os trastes e as casas.
* **Corpo (Body):** A parte principal onde ficam os captadores, ponte e controles.

## 2. As Cordas
A guitarra padrão tem 6 cordas, contadas de baixo para cima (da mais fina para a mais grossa):
1. **E (Mizinha)** - Corda mais fina
2. **B (Si)**
3. **G (Sol)**
4. **D (Ré)**
5. **A (Lá)**
6. **E (Mizão)** - Corda mais grossa

## 3. Como Afinar (Afinação Padrão)
O método mais comum sem afinador eletrônico é o da "5ª Casa":
1. Afine a 6ª corda (E) com uma referência (ex: diapasão ou outra música).
2. Pressione a 6ª corda na **casa 5**. O som deve ser igual ao da 5ª corda solta.
3. Pressione a 5ª corda na **casa 5**. O som deve ser igual ao da 4ª corda solta.
4. Pressione a 4ª corda na **casa 5**. O som deve ser igual ao da 3ª corda solta.
5. **Atenção:** Pressione a 3ª corda na **casa 4**. O som deve ser igual ao da 2ª corda solta.
6. Pressione a 2ª corda na **casa 5**. O som deve ser igual ao da 1ª corda solta.
    `
  },
  {
    id: 'f2',
    title: 'Notas no Braço (Sistema Cromático)',
    category: 'Basics',
    description: 'Como localizar qualquer nota em qualquer corda e casa.',
    level: 'Iniciante',
    order: 2,
    content: `
# Mapeando o Braço da Guitarra

## O Alfabeto Musical
Na música, usamos as 7 primeiras letras do alfabeto, mas com acidentes (sustenidos e bemóis):
**A - A# - B - C - C# - D - D# - E - F - F# - G - G#**

### Regras de Ouro:
1. Entre **B e C** não existe sustenido.
2. Entre **E e F** não existe sustenido.
*(Lembre-se: "Si" e "Mi" não têm sustenido)*

## Como Encontrar Notas
Cada casa na guitarra avança a nota em meio tom (um passo na sequência acima).

**Exemplo na Corda E (Mizão):**
* Corda Solta: **E**
* Casa 1: **F** (pois E não tem sustenido)
* Casa 2: **F#**
* Casa 3: **G**
* Casa 4: **G#**
* Casa 5: **A**

## Exercício Prático
Tente encontrar todos os **Dó (C)** nas primeiras 12 casas.
* Dica: Na corda A (5ª corda), o C está na casa 3.
* Na corda E (6ª corda), o C está na casa 8.
    `
  },
  {
    id: 'f3',
    title: 'Intervalos Musicais: A Base de Tudo',
    category: 'Theory',
    description: 'Entenda as distâncias entre as notas (Tônicas, 3ªs, 5ªs).',
    level: 'Iniciante',
    order: 3,
    content: `
# Intervalos Musicais

Intervalo é a distância entre duas notas. É o DNA da música; define se o som é feliz, triste, tenso ou relaxado.

## Tom e Semitom
* **Semitom (S):** A menor distância na guitarra (1 casa).
* **Tom (T):** Dois semitons (2 casas).

## Os Intervalos Essenciais
Usando C (Dó) como referência (Tônica):

1. **Segunda Maior (2M):** 1 Tom (C -> D)
2. **Terça Maior (3M):** 2 Tons (C -> E) - *Define o acorde Maior (Feliz)*
3. **Terça Menor (3m):** 1 Tom e meio (C -> Eb) - *Define o acorde Menor (Triste)*
4. **Quinta Justa (5J):** 3 Tons e meio (C -> G) - *O "Power Chord"*
5. **Oitava Justa (8J):** 6 Tons (C -> C agudo)

## Aplicação Visual
Na guitarra, a **Quinta Justa** está quase sempre uma corda abaixo e duas casas à frente da tônica (exceto entre as cordas G e B).
Isso forma o famoso "Power Chord" usado no Rock.
    `
  },
  // Módulo 2: Harmonia e Acordes
  {
    id: 'h1',
    title: 'Formação de Tríades Maiores e Menores',
    category: 'Theory',
    description: 'Como os acordes básicos são construídos.',
    level: 'Iniciante',
    order: 4,
    content: `
# Formação de Tríades

Um acorde básico (tríade) é formado por apenas 3 notas empilhadas.

## A Fórmula Mágica
Todo acorde nasce da Tônica (1), Terça (3) e Quinta (5).

### 1. Acorde Maior
Fórmula: **Tônica + 3ª Maior + 5ª Justa**
* Exemplo (C Maior): C - E - G
* Som: Brilhante, estável, "feliz".

### 2. Acorde Menor
Fórmula: **Tônica + 3ª Menor + 5ª Justa**
* Exemplo (C Menor): C - Eb - G
* Som: Melancólico, sério, "triste".

## Note a Diferença
A única diferença entre um acorde maior e um menor é a **Terça**.
Se você pegar um acorde de E Maior e descer a nota da Terça em 1 casa, ele vira E Menor.
    `
  },
  {
    id: 'h2',
    title: 'O Sistema CAGED',
    category: 'Technique',
    description: 'Visualize o braço da guitarra através de 5 formatos básicos de acordes.',
    level: 'Intermediário',
    order: 5,
    content: `
# O Sistema CAGED

O CAGED é um sistema que permite tocar o **mesmo acorde** em **5 regiões diferentes** do braço, usando os formatos dos acordes abertos que você já conhece:
**C (Dó) | A (Lá) | G (Sol) | E (Mi) | D (Ré)**

## Como Funciona?
Imagine que a pestana do violão é uma barreira móvel. Se você fizer o formato de **A (Lá Maior)** mas usar uma pestana para mover tudo 2 casas para frente (casa 2), você estará tocando um **B (Si Maior)** com formato de A.

## Os 5 Modelos para Dó Maior (C)
1. **Modelo de C:** Acorde aberto normal.
2. **Modelo de A:** Pestana na casa 3 (formato de A).
3. **Modelo de G:** Pestana na casa 5 (formato de G - difícil!).
4. **Modelo de E:** Pestana na casa 8 (formato de E).
5. **Modelo de D:** Formato de D na casa 12.

## Por que usar?
Isso libera você de tocar acordes apenas no início do braço e ajuda a visualizar arpejos e escalas em todo o instrumento.
    `
  },
  {
    id: 'h3',
    title: 'Campo Harmônico Maior',
    category: 'Theory',
    description: 'Descubra quais acordes combinam entre si em uma música.',
    level: 'Intermediário',
    order: 6,
    content: `
# Campo Harmônico Maior

O Campo Harmônico é a "família" de acordes que moram dentro de uma escala. Se você está compondo uma música em Dó Maior, o campo harmônico te diz quais acordes você pode usar sem sair do tom.

## A Regra dos Graus
Para qualquer escala maior, a sequência de acordes (graus) segue sempre esta ordem de qualidade:

1. **I (Maior)**
2. **ii (Menor)**
3. **iii (Menor)**
4. **IV (Maior)**
5. **V (Maior)**
6. **vi (Menor)**
7. **vii° (Meio Diminuto)**

## Exemplo em Dó (C)
1. **C** (Maior)
2. **Dm** (Menor)
3. **Em** (Menor)
4. **F** (Maior)
5. **G** (Maior)
6. **Am** (Menor) - *Relativa Menor*
7. **Bm7(b5)** (Meio Diminuto)

Tente tocar essa sequência. Você perceberá que todos soam bem juntos!
    `
  },
  // Módulo 3: Escalas e Melodia
  {
    id: 'e1',
    title: 'Escala Pentatônica',
    category: 'Technique',
    description: 'A escala mais utilizada no rock e blues.',
    level: 'Iniciante',
    order: 7,
    content: `
# A Escala Pentatônica

Se você quer solar Rock, Blues ou Pop, esta é a escala mais importante. Como o nome diz, ela tem apenas **5 notas**.

## Pentatônica Menor (A mais usada)
Fórmula: **1 - b3 - 4 - 5 - b7**
Em Lá Menor (Am): **A - C - D - E - G**

## O "Shape 1" (Desenho Clássico)
Este é o desenho que 90% dos guitarristas aprendem primeiro. Na tonalidade de Lá Menor (Am), começa na casa 5 da corda E (Mizão).

* Corda E: 5 - 8
* Corda A: 5 - 7
* Corda D: 5 - 7
* Corda G: 5 - 7
* Corda B: 5 - 8
* Corda e: 5 - 8

## Dica de Improviso
Você pode tocar essas notas em qualquer ordem sobre um "Backing Track em Am" e soará correto. As notas de repouso (seguras) são a Tônica (A) nas casas 5 (Mizão), 7 (Corda D) e 5 (Mizinha).
    `
  },
  {
    id: 'e2',
    title: 'Escala Maior e Seus Desenhos',
    category: 'Technique',
    description: 'A fundação para entender tonalidades e solos.',
    level: 'Intermediário',
    order: 8,
    content: `
# Escala Maior Natural

A Escala Maior é a mãe de todas as escalas ocidentais.
Fórmula de intervalos: **Tom - Tom - Semitom - Tom - Tom - Tom - Semitom**

## Os 7 Padrões (Shapes)
Na guitarra, para tocar a escala maior em todo o braço sem grandes saltos, dividimos o braço em regiões. Geralmente usamos o sistema de **3 notas por corda**.

## A Relativa Menor
Todo tom Maior tem um "irmão" Menor que usa exatamente as mesmas notas, mas começa no 6º grau.
* Escala de C Maior: C D E F G A B
* Escala de A Menor: A B C D E F G

Isso significa que se você aprender o desenho da escala de C Maior, você automaticamente já sabe a escala de A Menor Natural. Só muda a nota onde você "sente" que a frase termina (o repouso).
    `
  },
  {
    id: 'e3',
    title: 'Modos Gregos (Introdução)',
    category: 'Theory',
    description: 'Dê cores diferentes aos seus solos usando modos.',
    level: 'Avançado',
    order: 9,
    content: `
# Introdução aos Modos Gregos

Modos não são "escalas novas". São apenas maneiras de tocar a escala maior dando ênfase a uma nota de partida diferente, o que muda a sonoridade (a "cor") da escala.

## Os 7 Modos
Imagine a escala de Dó Maior (C-D-E-F-G-A-B).

1. **Jônio (Ionian):** Começa em C. É a própria escala maior. (Som Feliz/Heroico)
2. **Dórico (Dorian):** Começa em D. Menor com sexta maior. (Som Santana/Pink Floyd/Jazzy)
3. **Frígio (Phrygian):** Começa em E. Menor com segunda menor. (Som Espanhol/Metal)
4. **Lídio (Lydian):** Começa em F. Maior com quarta aumentada. (Som Sonhador/Filme Espacial)
5. **Mixolídio (Mixolydian):** Começa em G. Maior com sétima menor. (Som Blues/Rock clássico)
6. **Eólio (Aeolian):** Começa em A. É a escala menor natural. (Som Triste/Épico)
7. **Lócrio (Locrian):** Começa em B. Meio diminuto. (Som Tenso/Instável - pouco usado)

## Como estudar
Não tente decorar tudo de uma vez. Comece dominando o som do **Dórico** (para blues/rock menor) e do **Mixolídio** (para rock maior).
    `
  },
  // Módulo 4: Avançado
  {
    id: 'a1',
    title: 'Arpejos e Tétrades',
    category: 'Technique',
    description: 'Tocando as notas do acorde individualmente com fluidez.',
    level: 'Avançado',
    order: 10,
    content: `
# Arpejos e Sweep Picking

Arpejar significa tocar as notas de um acorde uma após a outra, em vez de todas juntas.

## Por que usar Arpejos?
Quando você está solando e toca as notas exatas do acorde que está soando no fundo (Chord Tones), seu solo soa incrivelmente melódico e conectado com a música.

## Tétrades
São acordes de 4 notas (Tríade + Sétima).
* **7M (Sétima Maior):** Som de Jazz/MPB.
* **7 (Sétima Menor):** Som de Blues/Funk.

## Técnica: Sweep Picking
Para tocar arpejos rápidos, usamos o "Sweep" (varredura). Em vez de palhetar alternado (baixo-cima), você "arrasta" a palheta em uma única direção através das cordas, como se estivesse varrendo.
Requer muita coordenação entre a mão esquerda e direita para que as notas não soem emboladas (efeito "acorde"), mas sim separadas.
    `
  },
  {
    id: 'a2',
    title: 'Ciclo de Quintas e Quartas',
    category: 'Theory',
    description: 'A ferramenta definitiva para modulação e composição.',
    level: 'Avançado',
    order: 11,
    content: `
# O Ciclo de Quintas

O Ciclo de Quintas é como um relógio dos tons musicais. Ele organiza as tonalidades pela quantidade de sustenidos (#) ou bemóis (b) que elas têm.

## O Sentido Horário (Quintas - Sustenidos)
Partindo de C (0 acidentes), se subirmos uma quinta justa (G), ganhamos 1 sustenido.
* **C:** 0 #
* **G:** 1 # (F#)
* **D:** 2 # (F#, C#)
* **A:** 3 # (F#, C#, G#)
* **E:** 4 # ...

## O Sentido Anti-Horário (Quartas - Bemóis)
Partindo de C, se descermos uma quinta (ou subirmos uma quarta) para F, ganhamos 1 bemol.
* **C:** 0 b
* **F:** 1 b (Bb)
* **Bb:** 2 b (Bb, Eb)
* **Eb:** 3 b ...

## Para que serve?
1. **Saber a armadura de clave:** Quantos sustenidos tem em Mi Maior? (4).
2. **Modulação:** Mudar de tom para um vizinho no ciclo (ex: de C para G) é muito suave.
3. **Composição:** A sequência ii-V-I segue o ciclo de quartas (movimento anti-horário).
    `
  }
];

export const INITIAL_LESSONS = GUITAR_CURRICULUM.slice(0, 3);
