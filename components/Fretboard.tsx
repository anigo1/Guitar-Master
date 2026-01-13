
import React from 'react';
import { GUITAR_STRINGS, NOTES } from '../constants';

interface FretboardProps {
  highlightedNotes?: string[];
  rootNote?: string;
  onNoteClick?: (note: string) => void;
  label?: string;
  compact?: boolean;
}

const Fretboard: React.FC<FretboardProps> = ({ 
  highlightedNotes = [], 
  rootNote, 
  onNoteClick,
  label,
  compact = false
}) => {
  const frets = compact ? 12 : 15; // Show fewer frets in compact mode
  
  const getNoteAtFret = (openNote: string, fret: number) => {
    const startIndex = NOTES.indexOf(openNote);
    return NOTES[(startIndex + fret) % 12];
  };

  const isHighlighted = (note: string) => highlightedNotes.includes(note);
  const isRoot = (note: string) => note === rootNote;

  return (
    <div className={`overflow-x-auto ${compact ? 'pb-2' : 'pb-6'}`}>
      {label && (
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-2">
          {label}
        </div>
      )}
      <div className={`
        ${compact ? 'min-w-[600px] p-4' : 'min-w-[1000px] p-8'} 
        bg-amber-900/10 rounded-xl fretboard-shadow border border-slate-700
      `}>
        <div className="relative">
          {/* Fret Markers */}
          <div className={`flex mb-2 ${compact ? 'ml-8' : 'ml-12'}`}>
            {Array.from({ length: frets }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-slate-500 font-mono">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Strings */}
          {GUITAR_STRINGS.map((openNote, stringIdx) => {
            const isOpenHighlighted = isHighlighted(openNote);
            const isOpenRoot = isRoot(openNote);
            const stringHeight = compact ? 'h-8' : 'h-12';

            return (
              <div key={stringIdx} className={`relative flex items-center ${stringHeight}`}>
                {/* Open String / Nut Indicator */}
                <div className={`flex justify-center pr-4 ${compact ? 'w-8' : 'w-12'}`}>
                  <button
                     disabled={!onNoteClick}
                     onClick={() => onNoteClick?.(openNote)}
                     className={`
                        rounded-full flex items-center justify-center font-bold transition-all
                        ${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}
                        ${isOpenHighlighted 
                        ? (isOpenRoot ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20')
                        : 'text-slate-500 hover:text-slate-300'}
                     `}
                  >
                    {openNote}
                  </button>
                </div>
                
                <div className="flex-1 flex relative">
                  {/* Horizontal String Line */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-400 -translate-y-1/2 shadow-sm"></div>
                  
                  {Array.from({ length: frets }).map((_, i) => {
                    const fretIdx = i + 1;
                    const currentNote = getNoteAtFret(openNote, fretIdx);
                    const highlighted = isHighlighted(currentNote);
                    const root = isRoot(currentNote);

                    return (
                      <div 
                        key={fretIdx} 
                        className={`flex-1 flex justify-center items-center relative ${stringHeight} border-r border-slate-700/50 ${fretIdx === 1 ? 'border-l-4 border-l-slate-400' : ''}`}
                      >
                        {/* Inlays */}
                        {[3, 5, 7, 9, 12, 15].includes(fretIdx) && stringIdx === 2 && (
                          <div className={`absolute top-[110%] bg-slate-600 rounded-full ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
                        )}
                        {fretIdx === 12 && stringIdx === 4 && (
                          <div className={`absolute top-[110%] bg-slate-600 rounded-full ${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
                        )}

                        {/* Note Circle */}
                        <button
                          disabled={!onNoteClick}
                          onClick={() => onNoteClick?.(currentNote)}
                          className={`z-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 transform
                            ${compact ? 'w-6 h-6 text-[9px]' : 'w-8 h-8 text-[10px]'}
                            ${highlighted 
                              ? (root ? 'bg-amber-500 text-black scale-110 shadow-lg shadow-amber-500/20' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20')
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 opacity-0 hover:opacity-100'}
                          `}
                        >
                          {currentNote}
                        </button>
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
