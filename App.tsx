
import React, { useState, useCallback, useEffect } from 'react';
import Layout from './components/Layout';
import Fretboard from './components/Fretboard';
import Tuner from './components/Tuner';
import { AppView, AIResponse } from './types';
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
  const [lessonContent, setLessonContent] = useState<string | null>(null);

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
    // Use static content immediately
    setLessonContent(lesson.content || "Conteúdo em desenvolvimento.");
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };

  const progressPercentage = Math.round((completedLessons.length / GUITAR_CURRICULUM.length) * 100);

  const renderHome = () => (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Domine a Teoria na Guitarra
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Um currículo completo e estruturado para levar você do zero ao domínio da harmonia e improvisação.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={() => setView(AppView.LESSONS)}
            className="px-8 py-3 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            Ver Currículo
          </button>
          <button 
            onClick={() => setView(AppView.FRETBOARD)}
            className="px-8 py-3 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Praticar no Braço
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 transition-all">
          <div className="text-3xl mb-4">📍</div>
          <h3 className="text-xl font-bold mb-2">Trilha Progressiva</h3>
          <p className="text-slate-400">Aulas organizadas em ordem lógica de dificuldade e dependência teórica.</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 transition-all">
          <div className="text-3xl mb-4">🎸</div>
          <h3 className="text-xl font-bold mb-2">Aplicação Prática</h3>
          <p className="text-slate-400">Teoria aplicada diretamente ao braço da guitarra para visualização imediata.</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 transition-all">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Didática IA</h3>
          <p className="text-slate-400">Conteúdo gerado dinamicamente para explicar cada tópico com clareza absoluta.</p>
        </div>
      </section>
    </div>
  );

  const renderFretboard = () => {
    const scaleNotes = getScaleNotes(rootNote, selectedScale.formula);
    
    return (
      <div className="space-y-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Selecione o Tom</label>
              <div className="flex flex-wrap gap-2">
                {NOTES.map(note => (
                  <button
                    key={note}
                    onClick={() => setRootNote(note)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
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
            
            <div className="w-full md:w-64">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tipo de Escala</label>
              <select 
                value={selectedScale.name}
                onChange={(e) => setSelectedScale(SCALES.find(s => s.name === e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Notas na Escala:</h4>
            <div className="flex gap-4">
              {scaleNotes.map((note, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg mb-1 ${note === rootNote ? 'bg-amber-500 text-black' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {note}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
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
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 bg-blue-500/10 rounded-lg">🤖</span>
            Tutor de Dúvidas
          </h3>
          <p className="text-sm text-slate-400 mt-1">Pergunte detalhes sobre o conteúdo que está estudando.</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto max-h-[400px]">
          {aiResult ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-blue-400 font-bold mb-3 uppercase tracking-wider text-xs">Resposta</h4>
                <div className="prose prose-invert text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {aiResult.explanation}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <p>O Tutor está pronto para ajudar com dúvidas teóricas.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900">
          <form onSubmit={handleAiAsk} className="flex gap-4">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ex: Por que a terça define se o acorde é maior ou menor?"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
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
        <div className="space-y-6 animate-in fade-in duration-500">
          <button 
            onClick={() => { setActiveLesson(null); setLessonContent(null); }}
            className="text-amber-500 hover:text-amber-400 font-bold flex items-center gap-2 mb-4"
          >
            ← Voltar ao Currículo
          </button>
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {isCompleted && (
               <div className="absolute top-0 right-0 p-4 bg-green-500/20 text-green-500 rounded-bl-2xl font-bold flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                 </svg>
                 Concluída
               </div>
            )}

            <div className="mb-8">
              <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                Aula {activeLesson.order}: {activeLesson.category}
              </span>
              <h2 className="text-4xl font-extrabold mt-4 text-white">{activeLesson.title}</h2>
              <p className="text-slate-400 mt-2 text-lg">{activeLesson.description}</p>
            </div>

            <div className="space-y-8">
              {/* Content Section */}
              <div className="bg-slate-950/50 p-6 md:p-10 rounded-2xl border border-slate-800/50">
                <div className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {lessonContent}
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex justify-between items-center border-t border-slate-800 pt-8">
               <p className="text-xs text-slate-500">Nível: <span className="text-amber-500 font-bold">{activeLesson.level}</span></p>
               <button 
                 onClick={() => {
                   toggleLessonCompletion(activeLesson.id);
                 }}
                 className={`px-6 py-2 rounded-xl transition-all text-sm font-bold ${
                   isCompleted 
                   ? 'bg-slate-800 text-slate-400 hover:text-white' 
                   : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                 }`}
               >
                 {isCompleted ? 'Remover Conclusão' : 'Marcar como Concluída'}
               </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-10">
        <header className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Currículo de Fundamentos</h2>
          <p className="text-slate-400">
            Siga esta trilha de aprendizado organizada para construir uma base sólida na guitarra. Cada aula abre um novo universo de possibilidades.
          </p>
        </header>

        <div className="relative space-y-4">
          {/* Vertical line connector */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-800 hidden md:block"></div>

          {GUITAR_CURRICULUM.sort((a, b) => a.order - b.order).map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div 
                key={lesson.id} 
                className="relative pl-0 md:pl-16 group cursor-pointer"
                onClick={() => loadLesson(lesson)}
              >
                {/* Order Badge */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all z-10 hidden md:flex ${
                  isCompleted 
                  ? 'bg-green-500/20 border-green-500 text-green-500' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 group-hover:border-amber-500 group-hover:text-amber-500'
                }`}>
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : lesson.order}
                </div>

                <div className={`bg-slate-900/50 p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted 
                  ? 'border-green-500/30 bg-green-500/5' 
                  : 'border-slate-800 group-hover:bg-slate-800/50 group-hover:border-amber-500/30'
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase">
                        {lesson.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        lesson.level === 'Iniciante' ? 'text-green-400 bg-green-400/10' :
                        lesson.level === 'Intermediário' ? 'text-amber-400 bg-amber-400/10' :
                        'text-red-400 bg-red-400/10'
                      }`}>
                        {lesson.level}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                          Concluída
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${
                      isCompleted ? 'text-green-400' : 'text-slate-100 group-hover:text-amber-400'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{lesson.description}</p>
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-slate-800 text-slate-400 group-hover:bg-amber-500 group-hover:text-black'
                    }`}>
                      {isCompleted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        '→'
                      )}
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
      {view === AppView.GLOSSARY && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
           <div className="text-5xl mb-4">📖</div>
           <h3 className="text-2xl font-bold text-slate-300">Dicionário Musical</h3>
           <p>Em breve: Um glossário completo de termos técnicos e teóricos.</p>
           <button onClick={() => setView(AppView.HOME)} className="mt-6 text-amber-500 font-bold hover:underline">Voltar ao Início</button>
        </div>
      )}
    </Layout>
  );
};

export default App;
