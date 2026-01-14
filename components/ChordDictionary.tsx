
import React, { useState, useMemo } from 'react';
import { NOTES, CHORD_QUALITIES, GUITAR_STRINGS, OPEN_CHORDS } from '../constants';
import Fretboard from './Fretboard';
import { ChordPosition } from '../types';

interface ShapeTemplate {
  name: string;
  rootStringIdx: number; // 0 (High e) to 5 (Low E)
  rootFretRef: number;   // The fret of the root in the "open" configuration
  shapes: Record<string, number[]>; // [E, A, D, G, B, e] offsets
}

// Complete CAGED System Templates
const CAGED_SHAPES: Record<string, ShapeTemplate> = {
  'E': {
    name: 'Shape de Mi (E)',
    rootStringIdx: 5, // Low E
    rootFretRef: 0,
    shapes: {
      '': [0, 2, 2, 1, 0, 0],         
      'm': [0, 2, 2, 0, 0, 0],        
      '7': [0, 2, 0, 1, 0, 0],        
      '7M': [0, 2, 1, 1, 0, 0],       
      'm7': [0, 2, 0, 0, 0, 0],       
      'sus4': [0, 2, 2, 2, 0, 0],     
      'sus2': [0, 2, 4, 4, 0, 0],
      'aug': [0, 3, 2, 1, 1, 0],      
      'dim': [0, 1, 2, 0, -1, -1],    
      'm7(b5)': [0, 1, 0, 0, -1, -1], 
    }
  },
  'A': {
    name: 'Shape de Lá (A)',
    rootStringIdx: 4, // A string
    rootFretRef: 0,
    shapes: {
      '': [-1, 0, 2, 2, 2, 0],        
      'm': [-1, 0, 2, 2, 1, 0],       
      '7': [-1, 0, 2, 0, 2, 0],       
      '7M': [-1, 0, 2, 1, 2, 0],      
      'm7': [-1, 0, 2, 0, 1, 0],      
      'sus4': [-1, 0, 2, 2, 3, 0],    
      'sus2': [-1, 0, 2, 2, 0, 0],    
      'aug': [-1, 0, 3, 2, 2, 1],     
      'dim': [-1, 0, 1, 2, 1, -1],
      'm7(b5)': [-1, 0, 1, 0, 1, -1], 
    }
  },
  'D': {
    name: 'Shape de Ré (D)',
    rootStringIdx: 3, // D string
    rootFretRef: 0,
    shapes: {
      '': [-1, -1, 0, 2, 3, 2],
      'm': [-1, -1, 0, 2, 3, 1],
      '7': [-1, -1, 0, 2, 1, 2],
      '7M': [-1, -1, 0, 2, 2, 2],
      'm7': [-1, -1, 0, 2, 1, 1],
      'sus4': [-1, -1, 0, 2, 3, 3],
      'sus2': [-1, -1, 0, 2, 3, 0],
    }
  },
  'C': {
    name: 'Shape de Dó (C)',
    rootStringIdx: 4, // A string
    rootFretRef: 3, // Root is at fret 3 for open C
    shapes: {
      '': [-1, 3, 2, 0, 1, 0],
      '7': [-1, 3, 2, 3, 1, 0],
      '7M': [-1, 3, 2, 0, 0, 0],
      'sus2': [-1, 3, 0, 0, 1, -1], 
      'sus4': [-1, 3, 3, 0, 1, 1],
      // Minor shapes in C form are awkward/rare, usually modified, but here is the theoretical shape
      'm': [-1, 3, 1, 0, 1, -1], 
    }
  },
  'G': {
    name: 'Shape de Sol (G)',
    rootStringIdx: 5, // Low E
    rootFretRef: 3, // Root is at fret 3 for open G
    shapes: {
      '': [3, 2, 0, 0, 0, 3],
      '7': [3, 2, 0, 0, 0, 1],
      '7M': [3, 2, 0, 0, 0, 2],
      'sus4': [3, 3, 0, 0, 1, 3],
      // G minor shape is extremely stretchy as a barre, often avoided or played as partial.
      'm': [3, 1, 0, 0, 3, 3], 
    }
  }
};

const ChordDictionary: React.FC = () => {
  const [rootNote, setRootNote] = useState('C');
  const [quality, setQuality] = useState(CHORD_QUALITIES[0]);
  const [variationIdx, setVariationIdx] = useState(0);

  const chordNotes = useMemo(() => {
    const rootIdx = NOTES.indexOf(rootNote);
    return quality.formula.map(interval => NOTES[(rootIdx + interval) % 12]);
  }, [rootNote, quality]);

  const variations = useMemo((): { positions: ChordPosition[], label: string }[] => {
    const rootIdx = NOTES.indexOf(rootNote);
    const allVariations: { positions: ChordPosition[], label: string }[] = [];
    const q = quality.suffix;

    // 1. Check for explicit OPEN CHORDS (Highest Priority)
    const openShape = OPEN_CHORDS[rootNote]?.[q];
    if (openShape) {
      allVariations.push({ positions: openShape, label: 'Forma Aberta' });
    }

    // 2. Generate CAGED Shapes
    // We prioritize E and A shapes as they are most common, then C, G, D.
    const searchOrder = ['E', 'A', 'D', 'C', 'G'];

    searchOrder.forEach(shapeKey => {
      const template = CAGED_SHAPES[shapeKey];
      const intervals = template.shapes[q];

      if (intervals) {
        // Find where the root note is on the shape's designated root string
        // We scan frets 0 to 12 to find the root note
        const stringNoteOpen = GUITAR_STRINGS[template.rootStringIdx]; // e.g., 'E'
        const stringNoteIdx = NOTES.indexOf(stringNoteOpen);
        
        let targetRootFret = -1;
        // Simple search for the root note on the string
        for(let f = 0; f < 12; f++) {
            if (NOTES[(stringNoteIdx + f) % 12] === rootNote) {
                targetRootFret = f;
                break;
            }
        }

        if (targetRootFret !== -1) {
            // Calculate the shift needed from the "Open Shape" reference
            // shift = targetRootFret - template.rootFretRef
            // Note: We might need to adjust octaves if the shift pulls frets below 0
            
            let shiftsToCheck = [targetRootFret - template.rootFretRef];
            // Also check octave up if the first position is very low or negative
            shiftsToCheck.push(shiftsToCheck[0] + 12);

            shiftsToCheck.forEach(shift => {
                // Determine if this shift produces a valid playable chord (frets 0-15 roughly)
                const shapePositions: ChordPosition[] = [];
                let isValid = true;
                let maxFret = 0;
                let minFret = 20;

                intervals.forEach((interval, i) => {
                    const stringIdx = 5 - i; // Convert [E, A, D, G, B, e] index to guitar string index 5..0
                    if (interval === -1) {
                        shapePositions.push({ string: stringIdx, fret: -1 });
                    } else {
                        const fret = interval + shift;
                        if (fret < 0) isValid = false; // Cannot play negative frets
                        if (fret > 0) {
                            maxFret = Math.max(maxFret, fret);
                            minFret = Math.min(minFret, fret);
                        }
                        shapePositions.push({ string: stringIdx, fret: fret });
                    }
                });

                // Filtering criteria:
                // 1. Must be valid frets
                // 2. Not too high on the neck (arbitrary limit 15 for readability)
                // 3. If it's the exact same as the "Open Shape" we already added, skip it to avoid duplicates
                if (isValid && maxFret <= 15) {
                    // Check duplicate against open chord
                    const isOpenDuplicate = openShape && shapePositions.every(p => {
                         const match = openShape.find(op => op.string === p.string);
                         return match && match.fret === p.fret;
                    });

                    // Check duplicate against already added variations
                    const isExistingDuplicate = allVariations.some(v => 
                        v.positions.length === shapePositions.length && 
                        v.positions.every(p => {
                            const match = shapePositions.find(sp => sp.string === p.string);
                            return match && match.fret === p.fret;
                        })
                    );

                    if (!isOpenDuplicate && !isExistingDuplicate) {
                         allVariations.push({
                             positions: shapePositions,
                             label: template.name
                         });
                    }
                }
            });
        }
      }
    });

    // 3. Default Procedural Triad fallback (if nothing else found)
    if (allVariations.length === 0) {
      const procedural: ChordPosition[] = [];
      GUITAR_STRINGS.forEach((note, idx) => {
         const openRootIdx = NOTES.indexOf(note);
         let found = false;
         for (let f = 0; f < 5; f++) {
            if (chordNotes.includes(NOTES[(openRootIdx + f) % 12])) {
              procedural.push({string: idx, fret: f});
              found = true;
              break;
            }
         }
         if (!found) procedural.push({string: idx, fret: -1});
      });
      allVariations.push({ positions: procedural, label: 'Gerado (Tríade)' });
    }

    return allVariations;
  }, [rootNote, quality, chordNotes]);

  const chordName = `${rootNote}${quality.suffix}`;
  const currentVariation = variations[variationIdx] || variations[0];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Controls */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Tônica</h3>
            <div className="grid grid-cols-4 gap-2">
              {NOTES.map(note => (
                <button
                  key={note}
                  onClick={() => { setRootNote(note); setVariationIdx(0); }}
                  className={`py-2 rounded-lg font-bold text-sm transition-all ${
                    rootNote === note 
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Qualidade</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {CHORD_QUALITIES.map(q => (
                <button
                  key={q.name}
                  onClick={() => { setQuality(q); setVariationIdx(0); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-all flex justify-between items-center ${
                    quality.name === q.name 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' 
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <span>{q.name}</span>
                  <span className="font-mono opacity-60">{q.suffix || 'M'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-slate-900 p-8 lg:p-12 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[600px]">
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
             
             <div className="mb-8 relative z-10">
               <h2 className="text-7xl lg:text-9xl font-black text-white tracking-tighter drop-shadow-2xl mb-2">
                 {chordName}
               </h2>
               <p className="text-slate-500 font-medium text-lg">{quality.name}</p>
               
               <div className="flex flex-wrap justify-center gap-2 mt-8">
                 {variations.map((v, idx) => (
                   <button
                    key={idx}
                    onClick={() => setVariationIdx(idx)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                      variationIdx === idx 
                      ? 'bg-amber-500 text-black border-amber-400 shadow-lg scale-105' 
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                   >
                     {v.label}
                   </button>
                 ))}
               </div>
             </div>

             <div className="w-full max-w-2xl bg-slate-950/40 p-6 lg:p-10 rounded-3xl border border-slate-800 shadow-inner relative z-10">
               <Fretboard 
                 compact={true}
                 highlightedPositions={currentVariation.positions}
                 rootNote={rootNote}
                 label={currentVariation.label}
                 openStringVisual="none"
               />
             </div>

             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full relative z-10">
               <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-800 text-left">
                  <h4 className="text-[10px] font-bold text-amber-500 uppercase mb-3 tracking-widest">Legenda</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="text-red-500 font-bold">✕</span> <span>Corda não deve soar</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="font-bold text-slate-200">NOTA</span>
                      <span>Corda solta (vibrando)</span>
                    </div>
                  </div>
               </div>
               <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-800 text-left">
                  <h4 className="text-[10px] font-bold text-amber-500 uppercase mb-3 tracking-widest">Intervalos</h4>
                  <div className="flex flex-wrap gap-2">
                    {chordNotes.map((n, i) => (
                      <div key={i} className={`px-2 py-1 rounded text-[10px] font-bold ${n === rootNote ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-200'}`}>
                        {n}
                      </div>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordDictionary;
