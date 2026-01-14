
import React, { useState, useCallback, useEffect } from 'react';
import Layout from './components/Layout';
import Fretboard from './components/Fretboard';
import Tuner from './components/Tuner';
import ChordDictionary from './components/ChordDictionary';
import { AppView, AIResponse, LessonSection } from './types';
import { NOTES, SCALES, GUITAR_CURRICULUM, CurriculumLesson } from './constants';
import { getAITutorResponse } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [selectedScale, setSelectedScale] = useState<any>(SCALES[0]);
  const [rootNote, setRootNote] = useState<string>('C');
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);

  // States for Curriculum Lessons
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(null);
  const [showLessonIndex, setShowLessonIndex] = useState(false); // Index state for lessons
  
  // Progress State
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('guitar_master_progress');
    if (savedProgress) {
      try {
        setCompletedLessons(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem('guitar_master_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const getScaleNotes = useCallback((root: string, scaleFormula: number[]) => {
    const rootIdx = NOTES.indexOf(root);
    return scaleFormula.map(interval => NOTES[(rootIdx + interval) % 12]);
  }, []);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    setAiLoading(true);
    try {
      const result = await getAITutorResponse(aiInput);
      setAiResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const loadLesson = (lesson: CurriculumLesson) => {
    setActiveLesson(lesson);
    setShowLessonIndex(false); // Hide mini-index on select
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };

  const progressPercentage = Math.round((completedLessons.length / GUITAR_CURRICULUM.length) * 100);

  const renderSection = (section: LessonSection, index: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <h3 key={index} className="text-xl lg:text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-500 pl-4">
            {section.content as string}
          </h3>
        );
      case 'text':
        return (
          <p key={index} className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6">
            {section.content as string}
          </p>
        );
      case 'list':
        return (
          <ul key={index} className="space-y-2 mb-6 ml-4">
            {(section.content as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm lg:text-base">
                <span className="text-amber-500 mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'fretboard':
        return (
          <div key={index} className="my-8 bg-slate-900/50 p-2 lg:p-4 rounded-xl border border-slate-700">
            <Fretboard 
              compact={true}
              highlightedNotes={section.fretboardConfig?.notes}
              highlightedPositions={section.fretboardConfig?.positions}
              rootNote={section.fretboardConfig?.root}
              label={section.fretboardConfig?.label || section.title}
            />
          </div>
        );
      case 'tip':
        return (
          <div key={index} className="my-6 p-4 lg:p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl flex gap-3 lg:gap-4">
            <div className="text-xl lg:text-2xl">💡</div>
            <div>
              <h4 className="font-bold text-amber-500 mb-2 text-sm lg:text-base">{section.title || 'Dica Pro'}</h4>
              <p className="text-slate-300 text-xs lg:text-sm">{section.content as string}</p>
            </div>
          </div>
        );
      case 'warning':
        return (
          <div key={index} className="my-6 p-4 lg:p-6 bg-red-500/10 border border-red-500/30 rounded-xl flex gap-3 lg:gap-4">
            <div className="text-xl lg:text-2xl">⚠️</div>
            <div>
              <h4 className="font-bold text-red-400 mb-2 text-sm lg:text-base">{section.title || 'Atenção'}</h4>
              <p className="text-slate-300 text-xs lg:text-sm">{section.content as string}</p>
            </div>
          </div>
        );
      case 'table':
        return (
          <div key={index} className="my-6 overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-left text-xs lg:text-sm">
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  {section.tableData?.headers.map((h, i) => (
                    <th key={i} className="p-3 lg:p-4 font-bold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {section.tableData?.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 lg:p-4 text-slate-400">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const renderHome = () => (
    <div className="space-y-8 lg:space-y-12 pb-12">
      <section className="text-center py-8 lg:py-12">
        <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent px-2">
          Domine a Teoria na Guitarra
        </h2>
        <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
          Um currículo completo e estruturado para levar você do zero ao domínio da harmonia e improvisação.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
          <button 
            onClick={() => setView(AppView.CHORDS)}
            className="w-full sm:w-auto px-8 py-3 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            Dicionário de Acordes
          </button>
          <button 
            onClick={() => setView(AppView.LESSONS)}
            className="w-full sm:w-auto px-8 py-3 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Ver Currículo
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto px-4">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 transition-all hover:border-amber-500/30">
          <div className="text-3xl mb-4">📖</div>
          <h3 className="text-xl font-bold mb-2">Dicionário de Acordes</h3>
          <p className="text-slate-400 text-sm">Aprenda a cifrar e visualizar qualquer acorde instantaneamente.</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 transition-all hover:border-amber-500/30">
          <div className="text-3xl mb-4">🎸</div>
          <h3 className="text-xl font-bold mb-2">Aplicação Prática</h3>
          <p className="text-slate-400 text-sm">Teoria aplicada diretamente ao braço da guitarra para visualização imediata.</p>
        </div>
      </section>
    </div>
  );

  const renderFretboard = () => {
    const scaleNotes = getScaleNotes(rootNote, selectedScale.formula);
    
    return (
      <div className="space-y-6 pb-12">
        <div className="bg-slate-900 p-4 lg:p-8 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Selecione o Tom</label>
              <div className="flex flex-wrap gap-1.5 lg:gap-2">
                {NOTES.map(note => (
                  <button
                    key={note}
                    onClick={() => setRootNote(note)}
                    className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg font-bold text-sm transition-all ${
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
            
            <div className="w-full lg:w-64">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Tipo de Escala</label>
              <select 
                value={selectedScale.name}
                onChange={(e) => setSelectedScale(SCALES.find(s => s.name === e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {SCALES.map(scale => (
                  <option key={scale.name} value={scale.name}>{scale.name}</option>
                ))}
              </select>
            </div>
          </div>

          <Fretboard 
            highlightedNotes={scaleNotes} 
            rootNote={rootNote}
            onNoteClick={(note) => console.log('Note clicked:', note)}
          />

          <div className="mt-8 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Notas na Escala:</h4>
            <div className="flex flex-wrap gap-3 lg:gap-4 justify-center sm:justify-start">
              {scaleNotes.map((note, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full font-bold text-base lg:text-lg mb-1 ${note === rootNote ? 'bg-amber-500 text-black shadow-md' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {note}
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-slate-500 font-mono">
                    {idx === 0 ? 'Root' : idx + 1 + 'ª'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAITutor = () => (
    <div className="space-y-6 pb-12">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[500px] shadow-xl">
        <div className="p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 bg-blue-500/10 rounded-lg">🤖</span>
            Tutor de Dúvidas
          </h3>
          <p className="text-xs lg:text-sm text-slate-400 mt-1">Pergunte detalhes sobre o conteúdo que está estudando.</p>
        </div>

        <div className="flex-1 p-4 lg:p-6 overflow-y-auto max-h-[400px]">
          {aiResult ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold mb-3 uppercase tracking-wider text-[10px]">Resposta do Especialista</h4>
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {aiResult.explanation}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 px-4 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-2xl mb-2 grayscale">🎸</div>
              <p className="text-sm">O Tutor está pronto para ajudar com dúvidas teóricas e práticas.</p>
            </div>
          )}
        </div>

        <div className="p-4 lg:p-6 border-t border-slate-800 bg-slate-900">
          <form onSubmit={handleAiAsk} className="flex gap-2 lg:gap-4">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ex: Como solar em Am?"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 lg:px-6 py-3 rounded-xl transition-all disabled:opacity-50 text-sm"
            >
              {aiLoading ? '...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderLessons = () => {
    if (activeLesson) {
      const isCompleted = completedLessons.includes(activeLesson.id);
      
      return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 pb-12 relative">
          
          {/* Collapsible Mini-Index Sidebar for Lessons */}
          <div className={`
            fixed lg:sticky top-0 lg:top-4 z-30 h-fit transition-all duration-300
            ${showLessonIndex ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16'}
            w-72 lg:w-72 bg-slate-900 lg:bg-transparent border-r lg:border-none border-slate-800 p-6 lg:p-0
          `}>
            <div className="lg:bg-slate-900/50 lg:border lg:border-slate-800 lg:rounded-2xl lg:p-4 lg:backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-xs font-bold text-slate-500 uppercase tracking-widest ${!showLessonIndex && 'lg:hidden'}`}>Aulas do Módulo</h4>
                <button 
                  onClick={() => setShowLessonIndex(!showLessonIndex)}
                  className="hidden lg:block p-1 text-slate-500 hover:text-white"
                  title={showLessonIndex ? "Recolher Índice" : "Expandir Índice"}
                >
                  {showLessonIndex ? '❮' : '❯'}
                </button>
                <button 
                  className="lg:hidden p-2 text-slate-400"
                  onClick={() => setShowLessonIndex(false)}
                >✕</button>
              </div>
              
              <div className={`space-y-2 max-h-[70vh] overflow-y-auto pr-2 ${!showLessonIndex && 'lg:hidden'}`}>
                {GUITAR_CURRICULUM.sort((a,b) => a.order - b.order).map(l => (
                  <button
                    key={l.id}
                    onClick={() => loadLesson(l)}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center gap-3 ${
                      activeLesson.id === l.id 
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 font-bold' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold">
                      {completedLessons.includes(l.id) ? '✓' : l.order}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </button>
                ))}
              </div>

              {!showLessonIndex && (
                <div className="hidden lg:flex flex-col items-center space-y-4 py-4">
                  <button 
                    onClick={() => setShowLessonIndex(true)}
                    className="p-3 bg-slate-800 rounded-xl text-amber-500 hover:bg-amber-500/10 transition-colors"
                  >📖</button>
                </div>
              )}
            </div>
          </div>

          {/* Main Lesson Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setActiveLesson(null)}
                className="text-amber-500 hover:text-amber-400 font-bold flex items-center gap-2 text-sm"
              >
                ← <span className="hidden sm:inline">Voltar ao Currículo</span><span className="sm:hidden">Voltar</span>
              </button>
              <button 
                className="lg:hidden px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-bold text-slate-300"
                onClick={() => setShowLessonIndex(true)}
              >
                📋 Índice
              </button>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl lg:rounded-3xl p-5 md:p-12 shadow-2xl relative overflow-hidden">
              {isCompleted && (
                 <div className="absolute top-0 right-0 p-3 lg:p-4 bg-green-500/20 text-green-500 rounded-bl-2xl font-bold flex items-center gap-2 text-[10px] lg:text-xs">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   Concluída
                 </div>
              )}

              <div className="mb-6 lg:mb-8">
                <span className="bg-amber-500/10 text-amber-500 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                  {activeLesson.category} • Aula {activeLesson.order}
                </span>
                <h2 className="text-2xl lg:text-4xl font-extrabold mt-4 text-white leading-tight">{activeLesson.title}</h2>
                <p className="text-slate-400 mt-2 text-sm lg:text-lg">{activeLesson.description}</p>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-950/50 p-4 md:p-10 rounded-xl lg:rounded-2xl border border-slate-800/50">
                  {activeLesson.sections && activeLesson.sections.length > 0 ? (
                    activeLesson.sections.map((section, index) => renderSection(section, index))
                  ) : (
                    <div className="text-slate-500 italic text-center py-12">Conteúdo não disponível para este formato.</div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-800 pt-8">
                 <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Nível: <span className="text-amber-500">{activeLesson.level}</span></p>
                 <button 
                   onClick={() => toggleLessonCompletion(activeLesson.id)}
                   className={`w-full sm:w-auto px-6 py-2.5 rounded-xl transition-all text-xs font-bold ${
                     isCompleted 
                     ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700' 
                     : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                   }`}
                 >
                   {isCompleted ? 'Marcar como não concluída' : 'Finalizar Aula'}
                 </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 lg:space-y-10 pb-12 px-2 lg:px-0">
        <header className="max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">Currículo de Fundamentos</h2>
          <p className="text-sm lg:text-base text-slate-400 leading-relaxed">
            Siga esta trilha de aprendizado organizada para construir uma base sólida na guitarra. Cada aula abre um novo universo de possibilidades.
          </p>
        </header>

        <div className="relative space-y-4">
          {/* Vertical line connector - Hidden on mobile */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-800 hidden md:block"></div>

          {GUITAR_CURRICULUM.sort((a, b) => a.order - b.order).map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div 
                key={lesson.id} 
                className="relative pl-0 md:pl-16 group cursor-pointer"
                onClick={() => loadLesson(lesson)}
              >
                {/* Order Badge - Hidden on mobile */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all z-10 hidden md:flex ${
                  isCompleted 
                  ? 'bg-green-500/20 border-green-500 text-green-500' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-500 shadow-sm'
                }`}>
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : lesson.order}
                </div>

                <div className={`bg-slate-900/50 p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted 
                  ? 'border-green-500/30 bg-green-500/5' 
                  : 'border-slate-800 group-hover:bg-slate-800/80 group-hover:border-amber-500/30'
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-tighter">
                        {lesson.category}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${
                        lesson.level === 'Iniciante' ? 'text-green-400 bg-green-400/10' :
                        lesson.level === 'Intermediário' ? 'text-amber-400 bg-amber-400/10' :
                        'text-red-400 bg-red-400/10'
                      }`}>
                        {lesson.level}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold mb-1 transition-colors ${
                      isCompleted ? 'text-green-400' : 'text-slate-100 group-hover:text-amber-400'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{lesson.description}</p>
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center justify-end gap-4 mt-2 md:mt-0">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-slate-800 text-slate-400 group-hover:bg-amber-500 group-hover:text-black'
                    }`}>
                      {isCompleted ? '✓' : '→'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Layout currentView={view} onNavigate={setView} progress={progressPercentage}>
      {view === AppView.HOME && renderHome()}
      {view === AppView.FRETBOARD && renderFretboard()}
      {view === AppView.TUNER && <Tuner />}
      {view === AppView.AI_TUTOR && renderAITutor()}
      {view === AppView.LESSONS && renderLessons()}
      {view === AppView.CHORDS && <ChordDictionary />}
    </Layout>
  );
};

export default App;
