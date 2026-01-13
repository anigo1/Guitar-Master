
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  progress?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, progress = 0 }) => {
  const navItems = [
    { id: AppView.HOME, label: 'Início', icon: '🏠' },
    { id: AppView.FRETBOARD, label: 'Braço Interativo', icon: '🎸' },
    { id: AppView.TUNER, label: 'Afinador', icon: '🎙️' },
    { id: AppView.LESSONS, label: 'Aulas', icon: '📚' },
    { id: AppView.AI_TUTOR, label: 'Tutor AI', icon: '🤖' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            GuitarMaster
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Fundamentos Musicais</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id 
                ? 'bg-amber-600/10 text-amber-500 border border-amber-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-400 mb-2 font-medium">Progresso do Curso</p>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Sua Jornada</p>
              <p className="text-[10px] text-amber-500 font-bold">{progress}%</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0a0f18]">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <span className="text-slate-500 font-medium">Visualizando:</span>
            <span className="text-slate-100 font-semibold">{navItems.find(i => i.id === currentView)?.label}</span>
          </div>
          <div className="flex items-center space-x-4">
             {/* Icons removed */}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
