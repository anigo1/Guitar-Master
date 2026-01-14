
import React, { useState } from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  progress?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, progress = 0 }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: AppView.HOME, label: 'Início', icon: '🏠' },
    { id: AppView.FRETBOARD, label: 'Braço Interativo', icon: '🎸' },
    { id: AppView.CHORDS, label: 'Dicionário de Acordes', icon: '📖' },
    { id: AppView.TUNER, label: 'Afinador', icon: '🎙️' },
    { id: AppView.LESSONS, label: 'Aulas', icon: '📚' },
    { id: AppView.AI_TUTOR, label: 'Tutor AI', icon: '🤖' },
  ];

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              GuitarMaster
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Fundamentos Musicais</p>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                currentView === item.id 
                ? 'bg-amber-600/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
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
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white"
            >
              ☰
            </button>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-slate-500 font-medium text-sm">Visualizando:</span>
              <span className="text-slate-100 font-semibold text-sm">{navItems.find(i => i.id === currentView)?.label}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
