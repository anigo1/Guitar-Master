
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
    title: 'Anatomia Completa e Afinação de Precisão',
    category: 'Basics',
    description: 'Do headstock à ponte: entendendo a física do instrumento e técnicas profissionais de afinação.',
    level: 'Iniciante',
    order: 1,
    content: `
# Anatomia da Guitarra e Afinação Profissional

Tocar bem começa com um instrumento bem ajustado e compreendido. Vamos dissecar a guitarra.

## 1. Anatomia Detalhada
### O Corpo (Body)
É onde a ressonância acontece (em guitarras acústicas) ou onde a vibração é sustentada (em sólidas).
* **Captadores (Pickups):** Os "microfones" da guitarra.
    * *Single Coil:* Som brilhante, estalado (Ex: Fender Stratocaster).
    * *Humbucker:* Som gordo, encorpado, cancela ruídos (Ex: Gibson Les Paul).
* **Ponte (Bridge):** Onde as cordas se fixam. Pode ser fixa (mais estabilidade) ou flutuante (com alavanca/tremolo).
* **Potenciômetros:** Volume e Tone. Dica: Usar o volume um pouco abaixo do máximo pode limpar o som de um amplificador distorcido.

### O Braço (Neck)
* **Tensor (Truss Rod):** Uma barra de metal dentro do braço que compensa a tensão das cordas. Se o braço estiver curvado, o tensor precisa de ajuste (feito por luthier).
* **Escala (Fretboard):** A madeira colada sobre o braço onde os trastes são fixados.
* **Nut (Pestana):** Peça branca (osso ou plástico) na junção do braço com a mão. Define a altura das cordas soltas.

### A Mão (Headstock)
* **Tarraxas (Tuners):** Mecanismos para esticar as cordas. Tarraxas com trava (Locking Tuners) ajudam a manter a afinação.

---

## 2. As Cordas e Calibres
As cordas são numeradas de baixo para cima (da mais fina para a mais grossa).
1. **E (Mizinha)** - 1ª Corda
2. **B (Si)** - 2ª Corda
3. **G (Sol)** - 3ª Corda
4. **D (Ré)** - 4ª Corda
5. **A (Lá)** - 5ª Corda
6. **E (Mizão)** - 6ª Corda

*Dica Pro:* O "calibre" (ex: 0.09, 0.10) refere-se à espessura da corda Mizinha. Cordas mais grossas (0.11, 0.12) têm som mais encorpado, mas são mais duras de tocar.

---

## 3. Métodos de Afinação

### A. Método Eletrônico (O Padrão)
Sempre o mais preciso. Afinadores de pedal ou clip ("clip-on") captam a vibração da madeira, sendo imunes a ruído externo.

### B. Método Relativo (5ª Casa) - Para emergências
Afine a corda 6 (Mizão) com uma referência externa. Depois:
1. Casa 5 na corda 6 = Corda 5 Solta (A)
2. Casa 5 na corda 5 = Corda 4 Solta (D)
3. Casa 5 na corda 4 = Corda 3 Solta (G)
4. **Casa 4** na corda 3 = Corda 2 Solta (B) *(A exceção!)*
5. Casa 5 na corda 2 = Corda 1 Solta (E)

### C. Método dos Harmônicos (Avançado)
Oferece mais precisão auditiva pois os harmônicos continuam soando enquanto você ajusta a tarraxa.
* Toque o harmônico natural na **Casa 5** da corda mais grossa (apenas encoste o dedo sobre o traste, não aperte).
* Toque o harmônico natural na **Casa 7** da corda logo abaixo.
* Os sons devem ser idênticos (exceto entre as cordas G e B).

## 4. Oitavas e Entonação
Se sua guitarra afina as cordas soltas mas soa desafinada nas casas agudas, a "oitava" está desregulada.
*Teste:* Toque a corda solta e depois a mesma corda na casa 12. O afinador deve marcar exatamente a mesma nota. Se não, a ponte precisa de ajuste (luthieria).
    `
  },
  {
    id: 'f2',
    title: 'Mapeamento Absoluto do Braço',
    category: 'Basics',
    description: 'Domine a localização de notas, enarmonia e atalhos de oitavas para nunca mais se perder.',
    level: 'Iniciante',
    order: 2,
    content: `
# Mapeamento Absoluto do Braço

Entender o braço não é decorar casa por casa, é entender os padrões geométricos.

## 1. O Sistema Cromático e Enarmonia
Existem apenas 12 notas na música ocidental.
**A - A# - B - C - C# - D - D# - E - F - F# - G - G#**

### O Conceito de Enarmonia
Uma nota pode ter dois nomes.
* **C# (Dó Sustenido)** é a mesma nota que **Db (Ré Bemol)**.
* **D# (Ré Sustenido)** é a mesma nota que **Eb (Mi Bemol)**.
*Visualmente:* É a mesma casa no braço da guitarra. O nome muda dependendo da tonalidade da música (contexto teórico).

### As Duas Regras de Ouro
Existem dois pares de notas que **não têm sustenido/bemol** entre elas (distância de meio tom apenas):
1. **B para C** (Si para Dó)
2. **E para F** (Mi para Fá)

---

## 2. A Geometria das Oitavas (Atalhos)
Para achar a mesma nota em outra oitava (mais aguda), use estas formas geométricas fixas:

### Salto de 2 Cordas
* Pule uma corda para baixo e avance 2 casas.
* *Exemplo:* Nota **G** na corda 6 (Casa 3). Pule a corda 5. O próximo **G** está na corda 4 (Casa 5).

### A Exceção da Corda B
* Sempre que cruzar para a corda B (Si), adicione +1 casa à regra.
* *Exemplo:* Nota **C** na corda 3 (Casa 5). Para achar a oitava na corda 1, avance 3 casas (não 2). O **C** estará na casa 8.

---

## 3. As Marcações (Inlays)
As bolinhas no braço não são aleatórias. Elas marcam intervalos importantes a partir da corda solta:
* **Casa 3:** Terça Menor (aprox.)
* **Casa 5:** Quarta Justa (Referência de afinação)
* **Casa 7:** Quinta Justa (Harmônico forte)
* **Casa 9:** Sexta Maior / Sétima
* **Casa 12:** Oitava (O ciclo recomeça!)

**Atenção à Casa 12:** Tudo que acontece na casa 0 (corda solta) se repete na casa 12. Tudo na casa 1 se repete na 13, e assim por diante. A guitarra "zera" na casa 12.
    `
  },
  {
    id: 'f3',
    title: 'Teoria dos Intervalos: O DNA da Música',
    category: 'Theory',
    description: 'Uma análise profunda das distâncias musicais e suas qualidades emocionais.',
    level: 'Iniciante',
    order: 3,
    content: `
# Teoria Completa dos Intervalos

Entender intervalos é o "superpoder" que permite tirar músicas de ouvido. Intervalo é a distância e a relação sonora entre duas notas.

## 1. Tabela Mestra de Intervalos
Usando C (Dó) como Tônica para exemplificar:

| Intervalo | Distância | Nota (Ref C) | Sensação Sonora (Qualidade) |
| :--- | :--- | :--- | :--- |
| **Tônica (1)** | 0 tons | C | Uníssono, Repouso total. |
| **2ª Menor (b2)** | 0.5 tom | Db | Tensão máxima, "Tubarão", dissonante. |
| **2ª Maior (2)** | 1 tom | D | Doce, mas pede movimento. Sus2. |
| **3ª Menor (b3)** | 1.5 tom | Eb | Triste, Sombria. Define o Acorde Menor. |
| **3ª Maior (3)** | 2 tons | E | Feliz, Brilhante. Define o Acorde Maior. |
| **4ª Justa (4)** | 2.5 tons | F | Solene, "Amém". Sus4. |
| **4ª Aum / 5ª Dim (b5/#4)** | 3 tons | F#/Gb | O "Trítono". Diabólico, instável, bluesy. |
| **5ª Justa (5)** | 3.5 tons | G | Potência, Estabilidade. Power Chord. |
| **6ª Menor (b6)** | 4 tons | Ab | Dramática, Angustiante. |
| **6ª Maior (6)** | 4.5 tons | A | Doce, Nostálgica. MPB/Dorian. |
| **7ª Menor (b7)** | 5 tons | Bb | Bluesy, Funk, Tensão média. |
| **7ª Maior (7M)** | 5.5 tons | B | Jazz, Sonhadora, Sofisticada. |
| **8ª Justa (8)** | 6 tons | C | A mesma nota, mais aguda. |

---

## 2. Intervalos Compostos (Extensões)
Quando passamos da oitava, os intervalos ganham novos nomes (usados em acordes de Jazz/Neo-Soul):
* **9ª (Nona)** = É a 2ª, uma oitava acima.
* **11ª (Décima Primeira)** = É a 4ª, uma oitava acima.
* **13ª (Décima Terceira)** = É a 6ª, uma oitava acima.

---

## 3. Visualização Prática (Shapes)
Memorize a localização relativa à Tônica (R) na corda 6 (E):
* **5ª Justa:** Uma corda abaixo, +2 casas.
* **3ª Maior:** Uma corda abaixo, -1 casa.
* **3ª Menor:** Uma corda abaixo, -2 casas.
* **4ª Justa:** Mesma casa, corda de baixo.
* **Oitava:** Duas cordas abaixo, +2 casas.

*Exercício:* Escolha uma nota aleatória no braço e tente encontrar sua 5ª e sua 3ª Maior instantaneamente.
    `
  },
  // Módulo 2: Harmonia e Acordes
  {
    id: 'h1',
    title: 'Tríades, Inversões e Sus chords',
    category: 'Theory',
    description: 'Aprofundamento na construção de acordes, voicings abertos e fechados.',
    level: 'Iniciante',
    order: 4,
    content: `
# Tríades, Inversões e Variações

Você já sabe que Tônica, 3ª e 5ª formam o acorde. Agora vamos manipular isso.

## 1. Fórmulas de Construção
| Tipo de Acorde | Fórmula | Exemplo (C) | Sonoridade |
| :--- | :--- | :--- | :--- |
| **Maior** | 1 - 3 - 5 | C - E - G | Feliz, Resolvido |
| **Menor** | 1 - b3 - 5 | C - Eb - G | Triste, Sério |
| **Diminuto** | 1 - b3 - b5 | C - Eb - Gb | Tenso, Terror |
| **Aumentado** | 1 - 3 - #5 | C - E - G# | Onírico, Flutuante |
| **Sus2** | 1 - 2 - 5 | C - D - G | Aberto, Moderno |
| **Sus4** | 1 - 4 - 5 | C - F - G | Tensão que pede resolução p/ Maior |

*Nota:* Acordes SUS (Suspensos) não têm terça, por isso não são nem maiores nem menores. Eles soam ambíguos.

---

## 2. Inversões de Acordes
Não é obrigatório que a Tônica seja a nota mais grave (o baixo). Mudar a nota do baixo cria uma "Inversão".

* **Estado Fundamental:** Baixo na Tônica (C-E-G). Som sólido.
* **Primeira Inversão:** Baixo na Terça (E-G-C). Representado como C/E. Som mais doce e lírico.
* **Segunda Inversão:** Baixo na Quinta (G-C-E). Representado como C/G. Som instável, pede movimento.

*Aplicação:* Use inversões para criar linhas de baixo melódicas sem mudar os acordes da música.
Ex: C -> G/B -> Am (O baixo faz a linha descendente Dó -> Si -> Lá).

---

## 3. Close vs. Open Voicings
* **Close Voicing (Fechado):** As notas estão o mais próximas possível (dentro de uma oitava). Ex: Tríades básicas nas cordas agudas.
* **Open Voicing (Aberto):** Espalhamos as notas por mais de uma oitava. Produz um som rico, largo e ressonante. A maioria dos acordes de "folky" ou "campfrie" (Dó aberto, Sol aberto) são Open Voicings.
    `
  },
  {
    id: 'h2',
    title: 'Domínio Total do Sistema CAGED',
    category: 'Technique',
    description: 'Como conectar os 5 shapes para tocar qualquer acorde em qualquer lugar do braço.',
    level: 'Intermediário',
    order: 5,
    content: `
# Domínio Total do Sistema CAGED

O CAGED não serve apenas para fazer acordes. Ele é o mapa para visualizar **escalas** e **arpejos** sobrepostos aos acordes.

## 1. A Lógica da Conexão
Os desenhos se conectam como peças de quebra-cabeça. O fim de um desenho é o começo do próximo. A ordem é sempre C-A-G-E-D.

Se você está tocando um **Dó (C)**:
1. Começa com o formato de **C** (casas 0-3).
2. O próximo formato de Dó será o shape de **A** (na casa 3).
3. O próximo será o shape de **G** (na casa 5 - difícil de montar, use partes dele).
4. O próximo será o shape de **E** (na casa 8 - a famosa pestana).
5. O próximo será o shape de **D** (na casa 12).
6. Reinicia no shape de **C** (casa 12+).

## 2. Simplificando os Shapes "Impossíveis"
Os formatos de G e D completos com pestana são desconfortáveis.
*Dica Pro:* Não toque todas as cordas!
* Para o shape de **G**: Toque apenas as cordas 2, 3 e 4 (tríade aguda) ou 4, 3 e 2 (power chord invertido). Isso é muito usado por Keith Richards (Rolling Stones) e Jimi Hendrix.
* Para o shape de **D**: Mova a "triângulo" das cordas 1, 2 e 3 pelo braço. É uma tríade portátil perfeita.

## 3. Exercício de Conexão
Toque um acorde de C Maior e tente movê-lo pelo braço usando o CAGED, mas toque apenas as **4 cordas do meio** (D-G-B-e).
Isso força você a ver as conexões harmônicas sem depender tanto da força bruta das pestanas de 6 cordas.
    `
  },
  {
    id: 'h3',
    title: 'Análise Funcional e Campo Harmônico',
    category: 'Theory',
    description: 'Entenda as funções Tônica, Subdominante e Dominante para compor e rearmonizar.',
    level: 'Intermediário',
    order: 6,
    content: `
# Análise Funcional e Campo Harmônico

Saber os acordes do campo harmônico é o passo 1. O passo 2 é entender a **Função** (o "emprego") de cada um deles dentro da música.

## 1. As Três Funções Harmônicas

### A. Tônica (Repouso / Casa)
Onde a música "relaxa" e se resolve.
* **Graus:** I, iii, vi
* *Em Dó Maior:* C, Em, Am
* O **vi (Am)** é a tônica da relativa menor, por isso substitui tão bem o I (C).

### B. Subdominante (Movimento / Viagem)
Cria um afastamento da casa, mas sem urgência excessiva. Uma tensão suave.
* **Graus:** IV, ii
* *Em Dó Maior:* F, Dm
* O **ii (Dm)** é o acorde de jazz/bossa favorito para preparar o final (ii-V-I).

### C. Dominante (Tensão / Perigo)
Cria uma tensão forte que "implora" para voltar à Tônica.
* **Graus:** V, vii°
* *Em Dó Maior:* G, Bm7(b5)
* O **V7 (G7)** contém o "Trítono" (intervalo tenso entre as notas F e B) que precisa ser resolvido.

---

## 2. A Cadência Mais Famosa: ii - V - I
90% do Jazz e da MPB se baseia nisso.
1. **ii (Subdominante):** Prepara. (Dm7)
2. **V (Dominante):** Tensiona. (G7)
3. **I (Tônica):** Resolve. (C7M)

*Exercício:* Pegue uma música simples (só C, F, G) e tente substituir os acordes por seus "primos" funcionais.
* Troque C por Am.
* Troque F por Dm.
* Veja como a música muda de "alegre" para "melancólica" mas a estrutura harmônica funciona perfeitamente.

## 3. Campo Harmônico Menor
Apenas lembre que a ordem muda. Se a música está em Lá Menor (Am), a tônica agora é o Am.
* i (Am) - ii° (Bm7b5) - III (C) - iv (Dm) - v (Em) - VI (F) - VII (G).
    `
  },
  // Módulo 3: Escalas e Melodia
  {
    id: 'e1',
    title: 'Segredos da Pentatônica: Blue Note e Bends',
    category: 'Technique',
    description: 'Vá além do shape 1. Adicione a Blue Note e aprenda os "Target Notes" para bends.',
    level: 'Iniciante',
    order: 7,
    content: `
# Segredos da Pentatônica

A "Penta" é fácil de aprender, mas difícil de dominar. O segredo não está nas notas que você toca, mas em *como* você toca.

## 1. As 5 Caixas (Boxes)
Assim como o CAGED, a pentatônica tem 5 desenhos que cobrem o braço todo.
* O **Shape 1** (Am na casa 5) é o clássico.
* O **Shape 2** conecta-se logo à frente (iniciando na nota C, casa 8). Este é o "Shape Maior" da pentatônica.

*Dica:* Alterne entre o Shape 1 (som de Rock/Blues menor) e o Shape 2 (som de Country/Allman Brothers "alegre") sobre a mesma tonalidade para variar a intenção do solo.

## 2. A "Blue Note" (A Nota Secreta)
É a nota que transforma a pentatônica em **Escala de Blues**.
* Fórmula: Adicione uma **5ª Diminuta (b5)** à pentatônica menor.
* *Em Lá Menor:* A nota é **Eb** (Ré Sustenido/Mi Bemol).
* *Localização no Shape 1:* Corda A (Casa 6) e Corda G (Casa 8).

*Como usar:* Use a Blue Note apenas como nota de passagem. Não repouse nela, ou soará desafinado. É como um tempero picante: passe rápido por ela em direção à nota vizinha.

## 3. Bends e Target Notes
Não dê bends aleatórios. Você deve "mirar" em uma nota da escala.
* **Bend na corda G (Casa 7):** Você está levantando a nota D para chegar na nota E (Tônica do acorde de Am no Shape 1 na casa 5 da corda B).
* **Bend na corda B (Casa 8):** Você está levantando a nota G para chegar na nota A (Tônica).

*Regra:* Saiba qual nota você quer atingir antes de levantar a corda. O ouvido agradece.
    `
  },
  {
    id: 'e2',
    title: 'Escala Maior: 3 Notas por Corda e Modos',
    category: 'Technique',
    description: 'Padrões de velocidade e a estrutura completa da escala diatônica.',
    level: 'Intermediário',
    order: 8,
    content: `
# Escala Maior (Diatônica) Avançada

A escala maior não é apenas Dó-Ré-Mi. É a régua pela qual medimos toda a música ocidental.

## 1. Estrutura de Intervalos
Memorize o padrão de Tons (T) e Semitons (S):
**T - T - S - T - T - T - S**
*C para D (T)* | *D para E (T)* | *E para F (S)* ...

Essa estrutura cria as tensões naturais. Os semitons (E-F e B-C) são onde a "gravidade" da escala atua. O B (Sétima Maior) quer desesperadamente resolver no C (Oitava).

## 2. Sistema "3 Notas Por Corda" (3NPS)
Diferente do CAGED (que mantém você numa "caixa"), o sistema 3NPS é projetado para velocidade e fluidez horizontal.
* Vantagem: O padrão de palhetada é consistente (baixo-cima-baixo, cima-baixo-cima...).
* É o sistema favorito de guitarristas "shredders" como Paul Gilbert e John Petrucci.

## 3. Harmonizando a Escala
Se você empilhar terças sobre cada nota da escala, você cria o Campo Harmônico.
1. C (+E+G) = C (Maior)
2. D (+F+A) = Dm (Menor)
3. E (+G+B) = Em (Menor)
...
Isso prova que escalas e acordes são a mesma coisa: Acorde é a escala tocada simultaneamente; Escala é o acorde tocado sequencialmente.
    `
  },
  {
    id: 'e3',
    title: 'Guia Definitivo dos Modos Gregos',
    category: 'Theory',
    description: 'Compreenda a "nota característica" de cada modo e quando usar cada um.',
    level: 'Avançado',
    order: 9,
    content: `
# Guia Definitivo dos Modos Gregos

Esqueça a ideia de que "Dórico é começar a escala de C em D". Isso é teoria de papel. Na prática, Modos são **sonoridades**.

Para ouvir um modo, você precisa de um contexto harmônico (um baixo ou acorde soando no fundo).

## Tabela de Sonoridades e Notas Características

| Modo | Família | Nota Característica | Intervalo Chave | Vibe / Estilo |
| :--- | :--- | :--- | :--- | :--- |
| **Jônio** | Maior | 4ª Justa (Evite!) | T-T-S-T-T-T-S | Feliz, Infantil, Top 40. |
| **Lídio** | Maior | **#4 (Quarta Aum)** | A 4ª sobe meio tom | Mágico, Simpsons, Steve Vai. |
| **Mixolídio** | Maior | **b7 (Sétima Menor)** | A 7ª desce meio tom | Rock, AC/DC, Blues, Nordeste. |
| **Eólio** | Menor | b6 (Sexta Menor) | T-S-T-T-S-T-T | Tristeza clássica, Iron Maiden. |
| **Dórico** | Menor | **6 (Sexta Maior)** | A 6ª sobe meio tom | Funk, Pink Floyd, Santana. Menor mas "esperançoso". |
| **Frígio** | Menor | **b2 (Segunda Menor)** | A 2ª desce meio tom | Metal, Flamenco, Maligno. |
| **Lócrio** | Diminuto | b5 (Quinta Dim) | 2ª e 5ª descem | Estranho, Tenso. Quase nunca usado como tônica. |

## Como Estudar (Pitch Axis Theory)
Não mude a tonalidade, mude o modo!
Grave um baixo contínuo em nota **Mi (E)**.
1. Toque E Maior (Jônio).
2. Toque E Lídio (coloque um A# na escala). Sinta a mudança de "feliz" para "mágico".
3. Toque E Mixolídio (coloque um D natural na escala). Sinta virar "Rock".
4. Toque E Menor (Eólio).
5. Toque E Frígio (coloque um F natural). Sinta virar "Metal".

Essa comparação com o *mesmo baixo* é a chave para seus ouvidos entenderem os modos.
    `
  },
  // Módulo 4: Avançado
  {
    id: 'a1',
    title: 'Arpejos, Sweep e Superimposição',
    category: 'Technique',
    description: 'Técnicas avançadas para solar seguindo a harmonia (Chord Tones).',
    level: 'Avançado',
    order: 10,
    content: `
# Arpejos Avançados

Solar com arpejos é a diferença entre um "tocador de escalas" e um músico melódico. Você delineia a harmonia explicitamente.

## 1. Arpejos de Sétima
Adicionar a sétima nota traz sofisticação (Jazz/Fusion).
* **Maj7 (7M):** 1 - 3 - 5 - 7 (Som suave)
* **Dom7 (7):** 1 - 3 - 5 - b7 (Som bluesy/tensão)
* **Min7 (m7):** 1 - b3 - 5 - b7 (Som aveludado)
* **m7b5 (Meio Dim):** 1 - b3 - b5 - b7 (Som tenso)

## 2. Superimposição (O Pulo do Gato)
Você pode tocar um arpejo *diferente* do acorde da base para gerar extensões coloridas (9, 11, 13) automaticamente.

*Exemplo:* A base está tocando **Am7**.
* Se você tocar um arpejo de **Cmaj7** (C-E-G-B) sobre o baixo de A:
    * C = b3 de Am
    * E = 5 de Am
    * G = b7 de Am
    * B = **9 (Nona)** de Am
*Resultado:* Você está tocando um som de **Am9** sofisticado, usando apenas um arpejo simples de Cmaj7 que você já conhece!

*Regra Geral:* Toque o arpejo da terça menor acima da tônica para acordes menores (Cmaj7 sobre Am7). Toque o arpejo da quinta justa para acordes maiores (Gmaj7 sobre Cmaj7 = Cmaj9).

## 3. Mecânica do Sweep Picking
O segredo não é a mão direita rápida, é a **mão esquerda precisa**.
Você precisa "desligar" (mutar) a nota anterior exatamente no momento que toca a próxima. Se deixar as duas soarem, vira um acorde rasqueado, não um sweep.
O movimento da palheta deve ser contínuo, como se estivesse "caindo" pelas cordas, sem travar.
    `
  },
  {
    id: 'a2',
    title: 'O Ciclo de Quintas na Prática',
    category: 'Theory',
    description: 'Ferramenta mestra para modulação, composição e encontrar acidentes.',
    level: 'Avançado',
    order: 11,
    content: `
# O Ciclo de Quintas Desmistificado

O Ciclo não é apenas um diagrama bonito para pendurar na parede. É uma calculadora harmônica.

## 1. Descobrindo a Armadura de Clave
Quantos sustenidos tem em Si (B) Maior?
Conte no ciclo sentido horário a partir de C (0):
C(0) -> G(1) -> D(2) -> A(3) -> E(4) -> **B(5)**.
Tem 5 sustenidos.
*Quais são?* A ordem de entrada dos sustenidos é sempre F-C-G-D-A-E-B (Fa-Do-Sol-Re-La-Mi-Si).
Então B Maior tem: F#, C#, G#, D#, A#.

## 2. Encontrando o Campo Harmônico Rapidamente
Olhe para qualquer nota no ciclo (Ex: C no topo).
* **Os vizinhos imediatos** são os acordes maiores do tom: F (Subdominante) à esquerda e G (Dominante) à direita.
* **Os acordes logo abaixo** de cada um desses são os relativos menores: Dm (abaixo de F), Am (abaixo de C), Em (abaixo de G).
*Pronto!* Você achou os 6 principais acordes do tom de C Maior apenas olhando o agrupamento no ciclo.

## 3. Modulação (Mudança de Tom)
* **Modulação Suave:** Mude para um tom vizinho no ciclo (ex: de C para G). Apenas 1 nota muda na escala (F vira F#). É quase imperceptível.
* **Modulação Dramática:** Pule para o lado oposto do ciclo (ex: de C para F#). Todas as notas mudam. Causa impacto "épico" (comum em finais de músicas pop).

## 4. Empréstimo Modal
Músicas em tom Maior frequentemente pegam acordes emprestados do tom Menor paralelo.
* Exemplo: Música em C Maior usando um acorde Bb (Si Bemol).
* Onde está o Bb? No ciclo, ele está no lado dos bemóis, "perto" do C menor. O ciclo te ajuda a ver o quão "distante" ou "exótico" um acorde emprestado vai soar.
    `
  }
];

export const INITIAL_LESSONS = GUITAR_CURRICULUM.slice(0, 3);
