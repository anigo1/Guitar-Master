
import React, { useState, useEffect } from 'react';
import { GUITAR_STRINGS, NOTES, SCALES } from '../constants';

interface FretboardProps {
  highlightedNotes?: string[];
  rootNote?: string;
  onNoteClick?: (note: string) => void;
}

const Fretboard: React.FC<FretboardProps> = ({ highlightedNotes = [], rootNote, onNoteClick }) => {
  const frets = 15; // Standard learning range
  
  const getNoteAtFret = (openNote: string, fret: number) => {
    const startIndex = NOTES.indexOf(openNote);
    return NOTES[(startIndex + fret) % 12];
  };

  const isHighlighted = (note: string) => highlightedNotes.includes(note);
  const isRoot = (note: string) => note === rootNote;

  return (
    <div className="overflow-x-auto pb-6">
      <div className="min-w-[1000px] bg-amber-900/10 rounded-xl p-8 fretboard-shadow border border-slate-700">
        <div className="relative">
          {/* Fret Markers */}
          <div className="flex mb-2 ml-12">
            {Array.from({ length: frets }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-slate-500 font-mono">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Strings */}
          {GUITAR_STRINGS.map((openNote, stringIdx) => {
            const isOpenHighlighted = isHighlighted(openNote);
            const isOpenRoot = isRoot(openNote);

            return (
              <div key={stringIdx} className="relative flex items-center h-12">
                {/* Open String / Nut Indicator */}
                <div className="w-12 flex justify-center pr-4">
                  <button
                     onClick={() => onNoteClick?.(openNote)}
                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        isOpenHighlighted 
                        ? (isOpenRoot ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20')
                        : 'text-slate-500 hover:text-slate-300'
                     }`}
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
                        className={`flex-1 flex justify-center items-center relative h-12 border-r border-slate-700/50 ${fretIdx === 1 ? 'border-l-4 border-l-slate-400' : ''}`}
                      >
                        {/* Inlays */}
                        {[3, 5, 7, 9, 12, 15].includes(fretIdx) && stringIdx === 2 && (
                          <div className="absolute top-[110%] w-2 h-2 bg-slate-600 rounded-full"></div>
                        )}
                        {fretIdx === 12 && stringIdx === 4 && (
                          <div className="absolute top-[110%] w-2 h-2 bg-slate-600 rounded-full"></div>
                        )}

                        {/* Note Circle */}
                        <button
                          onClick={() => onNoteClick?.(currentNote)}
                          className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 transform
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
