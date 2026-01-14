
import React from 'react';
import { GUITAR_STRINGS, NOTES } from '../constants';
import { ChordPosition } from '../types';

interface FretboardProps {
  highlightedNotes?: string[];
  highlightedPositions?: ChordPosition[];
  rootNote?: string;
  onNoteClick?: (note: string) => void;
  label?: string;
  compact?: boolean;
  openStringVisual?: 'note' | 'marker' | 'none'; // 'note' shows bubble, 'marker' shows dot, 'none' shows plain text
}

const Fretboard: React.FC<FretboardProps> = ({ 
  highlightedNotes = [], 
  highlightedPositions,
  rootNote, 
  onNoteClick,
  label,
  compact = false,
  openStringVisual = 'note' // Default to 'note' for lessons
}) => {
  // Logic to determine which frets to show
  // If it's a chord and has positions, find the range
  const pressedFrets = highlightedPositions?.filter(p => p.fret > 0).map(p => p.fret) || [];
  const minFret = pressedFrets.length > 0 ? Math.min(...pressedFrets) : 0;
  const maxFret = pressedFrets.length > 0 ? Math.max(...pressedFrets) : 0;
  const hasOpenStrings = highlightedPositions?.some(p => p.fret === 0);

  // Determine starting fret: 
  // If it's an open chord or all frets are <= 5, start at 1.
  // Otherwise, start at minFret.
  let startFret = 1;
  if (maxFret > 5 && !hasOpenStrings) {
    startFret = minFret;
  }

  const numFretsToShow = compact ? 5 : 15;
  const isOffset = startFret > 1;
  
  const getNoteAtFret = (openNote: string, fret: number) => {
    const startIndex = NOTES.indexOf(openNote);
    return NOTES[(startIndex + fret) % 12];
  };

  const isPositionHighlighted = (stringIdx: number, fretIdx: number) => {
    // 1. Priority: Specific Chord Positions
    if (highlightedPositions && highlightedPositions.length > 0) {
      return highlightedPositions.some(p => p.string === stringIdx && p.fret === fretIdx);
    }
    
    // 2. Fallback: Note names (for Scales)
    if (highlightedNotes && highlightedNotes.length > 0) {
      const openStringNote = GUITAR_STRINGS[stringIdx];
      const currentNote = getNoteAtFret(openStringNote, fretIdx);
      return highlightedNotes.includes(currentNote);
    }

    return false;
  };

  const isStringMuted = (stringIdx: number) => {
    if (highlightedPositions && highlightedPositions.length > 0) {
      return highlightedPositions.some(p => p.string === stringIdx && p.fret === -1);
    }
    return false;
  };

  const isRoot = (note: string) => note === rootNote;

  return (
    <div className={`overflow-x-auto ${compact ? 'pb-2' : 'pb-6'}`}>
      {label && (
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-2">
          {label}
        </div>
      )}
      <div className={`
        ${compact ? 'min-w-[320px] p-4' : 'min-w-[1000px] p-8'} 
        bg-slate-900/50 rounded-2xl border border-slate-800 shadow-2xl
      `}>
        <div className="relative">
          {/* Fret Markers Labels */}
          <div className={`flex mb-2 ${compact ? 'ml-12' : 'ml-16'}`}>
            {Array.from({ length: numFretsToShow }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-slate-600 font-mono font-bold">
                {startFret + i}
              </div>
            ))}
          </div>

          {/* Strings Loop */}
          {GUITAR_STRINGS.map((openNote, stringIdx) => {
            const muted = isStringMuted(stringIdx);
            const isOpenHighlighted = isPositionHighlighted(stringIdx, 0);
            const isOpenRoot = isRoot(openNote) && isOpenHighlighted;
            const stringHeight = compact ? 'h-10' : 'h-14';

            return (
              <div key={stringIdx} className={`relative flex items-center ${stringHeight}`}>
                
                {/* Nut Area / Fret Info */}
                <div className={`flex items-center justify-center pr-4 relative ${compact ? 'w-12' : 'w-16'}`}>
                  {isOffset && stringIdx === 0 && (
                    <div className="absolute -top-6 left-0 text-[10px] font-black text-amber-500 bg-amber-500/10 px-1.5 rounded border border-amber-500/20">
                      {startFret}ª
                    </div>
                  )}

                  {muted ? (
                    <span className="text-red-500 font-black text-xl leading-none">✕</span>
                  ) : isOpenHighlighted && openStringVisual !== 'none' ? (
                     openStringVisual === 'note' ? (
                        <div className={`z-10 rounded-full flex items-center justify-center font-black transition-all shadow-lg
                          ${compact ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs'}
                          ${isOpenRoot ? 'bg-amber-500 text-black ring-4 ring-amber-500/20' : 'bg-blue-600 text-white ring-4 ring-blue-600/20'}
                        `}>
                          {openNote}
                        </div>
                     ) : (
                        <div className={`z-10 rounded-full flex items-center justify-center transition-all shadow-lg
                          ${compact ? 'w-7 h-7' : 'w-9 h-9'}
                          ${isOpenRoot ? 'border-2 border-amber-500' : 'border-2 border-blue-400'}
                          bg-slate-900
                        `}>
                          <div className={`rounded-full ${compact ? 'w-3 h-3' : 'w-4 h-4'} ${isOpenRoot ? 'bg-amber-500' : 'bg-blue-400'} animate-pulse`} />
                        </div>
                     )
                  ) : (
                    // Plain text: Brighter if open & active, darker if generic
                    <span className={`font-bold text-sm uppercase ${isOpenHighlighted ? 'text-slate-200' : 'text-slate-700'}`}>{openNote}</span>
                  )}
                </div>
                
                {/* Fret Grid */}
                <div className="flex-1 flex relative">
                  {/* String Visual Line */}
                  <div className={`absolute top-1/2 left-0 w-full bg-slate-400/30 -translate-y-1/2 shadow-sm
                    ${stringIdx === 0 || stringIdx === 5 ? 'h-[3px]' : 'h-[1.5px]'}
                  `}></div>
                  
                  {Array.from({ length: numFretsToShow }).map((_, i) => {
                    const fretIdx = startFret + i;
                    const currentNote = getNoteAtFret(openNote, fretIdx);
                    const highlighted = isPositionHighlighted(stringIdx, fretIdx);
                    const root = isRoot(currentNote) && highlighted;

                    return (
                      <div 
                        key={fretIdx} 
                        className={`flex-1 flex justify-center items-center relative ${stringHeight} border-r border-slate-800/50 
                          ${fretIdx === startFret && !isOffset ? 'border-l-4 border-l-slate-400' : 'border-l border-l-slate-800/50'}
                        `}
                      >
                        {/* Fret Marker Dots for standard positions */}
                        {stringIdx === 2 && [3, 5, 7, 9, 12, 15].includes(fretIdx) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}

                        {/* Note Marker */}
                        {highlighted && (
                          <div className={`z-10 rounded-full flex items-center justify-center font-black transition-all duration-300 transform scale-110 shadow-lg
                            ${compact ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-[11px]'}
                            ${root ? 'bg-amber-500 text-black ring-4 ring-amber-500/20' : 'bg-blue-600 text-white ring-4 ring-blue-600/20'}
                          `}>
                            {currentNote}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fretboard;
