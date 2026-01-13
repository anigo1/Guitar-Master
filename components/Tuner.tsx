
import React, { useEffect, useRef, useState } from 'react';

const Tuner: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [note, setNote] = useState<string>('--');
  const [cents, setCents] = useState<number>(0);
  const [frequency, setFrequency] = useState<number>(0);
  const [status, setStatus] = useState<'perfect' | 'sharp' | 'flat' | 'waiting'>('waiting');

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const requestRef = useRef<number>(0);
  
  // Buffers to stabilize readings
  const pitchBufferRef = useRef<number[]>([]);
  const silenceFramesRef = useRef<number>(0);

  const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  // Standard Guitar Frequencies for reference display
  const guitarStrings = [
    { name: 'E', freq: 82.41 },
    { name: 'A', freq: 110.00 },
    { name: 'D', freq: 146.83 },
    { name: 'G', freq: 196.00 },
    { name: 'B', freq: 246.94 },
    { name: 'e', freq: 329.63 },
  ];

  const autoCorrelate = (buf: Float32Array, sampleRate: number) => {
    // Implements the McLeod Pitch Method or standard Autocorrelation
    const SIZE = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    let correlations = new Array(MAX_SAMPLES);

    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    if (rms < 0.015) return -1; // Increased threshold to ignore background noise

    let lastCorrelation = 1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;

      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buf[i] - buf[i + offset]));
      }
      correlation = 1 - (correlation / MAX_SAMPLES);
      correlations[offset] = correlation;

      if ((correlation > 0.96) && (correlation > lastCorrelation)) { // Stricter correlation
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundGoodCorrelation) {
        // Shift exact center
        const shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / 8;
        return sampleRate / (bestOffset + shift);
      }
      lastCorrelation = correlation;
    }
    if (bestCorrelation > 0.01) {
      return sampleRate / bestOffset;
    }
    return -1;
  };

  const updatePitch = () => {
    if (!analyserRef.current || !audioContextRef.current) return;
    
    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);
    const ac = autoCorrelate(buffer, audioContextRef.current.sampleRate);

    // Filter results to valid guitar range (approx 60Hz to 1500Hz)
    // This removes low rumble and high frequency hiss artifacts
    if (ac !== -1 && ac > 60 && ac < 1500) {
      silenceFramesRef.current = 0;
      
      // Add valid pitch to buffer
      pitchBufferRef.current.push(ac);
      
      // Keep only last 8 frames for smoothing
      if (pitchBufferRef.current.length > 8) {
          pitchBufferRef.current.shift();
      }

      // Calculate median pitch to remove outliers (e.g. random octave jumps)
      const sorted = [...pitchBufferRef.current].sort((a, b) => a - b);
      const pitch = sorted[Math.floor(sorted.length / 2)];

      setFrequency(Math.round(pitch));
      
      const noteNum = 12 * (Math.log(pitch / 440) / Math.log(2)) + 69;
      const roundedNote = Math.round(noteNum);
      
      // Calculate cents
      const targetFreq = 440 * Math.pow(2, (roundedNote - 69) / 12);
      const centsOff = Math.floor(1200 * Math.log2(pitch / targetFreq));

      const noteName = noteStrings[roundedNote % 12];
      
      setNote(noteName);
      setCents(centsOff);

      if (Math.abs(centsOff) < 5) setStatus('perfect');
      else if (centsOff < 0) setStatus('flat');
      else setStatus('sharp');
    } else {
        // Handle silence or invalid pitch
        silenceFramesRef.current++;
        
        // Only clear display if silence persists for ~0.7s (45 frames)
        if (silenceFramesRef.current > 45) {
            setFrequency(0);
            setStatus('waiting');
            pitchBufferRef.current = []; // Reset buffer
        }
        // If silence is very long, clear note name
        if (silenceFramesRef.current > 100) {
            setNote('--');
        }
    }

    requestRef.current = requestAnimationFrame(updatePitch);
  };

  const startTuner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 4096; // Increased resolution
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      setIsActive(true);
      requestRef.current = requestAnimationFrame(updatePitch);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Precisamos de acesso ao microfone para afinar sua guitarra!");
    }
  };

  const stopTuner = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsActive(false);
    setNote('--');
    setFrequency(0);
    setCents(0);
    setStatus('waiting');
    pitchBufferRef.current = [];
  };

  useEffect(() => {
    return () => {
      if (isActive) stopTuner();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-white mb-2">Afinador Cromático</h2>
        <p className="text-slate-400">Ative o microfone e toque uma corda solta.</p>
      </div>

      {/* Tuner Interface */}
      <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-full border-8 border-slate-800 shadow-2xl flex flex-col items-center justify-center p-10">
        
        {/* Needle/Arc Background */}
        <div className="absolute inset-4 rounded-full border-[20px] border-slate-800 border-t-transparent border-l-transparent border-r-transparent opacity-30"></div>

        {/* Note Display */}
        <div className="z-10 text-center mb-6">
          <div className={`text-9xl font-bold transition-colors duration-200 ${
            status === 'perfect' ? 'text-green-500' : 
            status === 'waiting' ? 'text-slate-600' : 'text-amber-500'
          }`}>
            {note}
          </div>
          <div className="text-2xl font-mono text-slate-500 mt-2">
            {frequency > 0 ? `${frequency} Hz` : '---'}
          </div>
        </div>

        {/* Cents / Status */}
        <div className="h-8">
           {isActive && frequency > 0 && (
             <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${
               status === 'perfect' ? 'bg-green-500/20 text-green-400' : 
               status === 'flat' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
             }`}>
               {status === 'perfect' ? 'Afinado' : status === 'flat' ? 'Baixo (Flat) ♭' : 'Alto (Sharp) ♯'}
             </span>
           )}
        </div>

        {/* Needle Indicator Visual */}
        {isActive && frequency > 0 && (
          <div className="absolute bottom-20 w-full px-20">
            <div className="h-2 bg-slate-800 rounded-full relative overflow-hidden">
              <div 
                className={`absolute top-0 bottom-0 w-2 rounded-full transition-all duration-200 ease-out shadow-[0_0_15px_rgba(0,0,0,0.8)] ${
                   status === 'perfect' ? 'bg-green-500' : 'bg-amber-500'
                }`}
                style={{ 
                  left: `${Math.min(Math.max(50 + (cents), 0), 100)}%`,
                  transform: 'translateX(-50%)'
                }}
              ></div>
              {/* Center Marker */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-500/50 -translate-x-1/2"></div>
            </div>
          </div>
        )}
      </div>

      {/* Control Button */}
      {!isActive ? (
        <button 
          onClick={startTuner}
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xl px-12 py-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-105"
        >
          🎙️ Ativar Afinador
        </button>
      ) : (
        <button 
          onClick={stopTuner}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-8 py-3 rounded-full border border-slate-700 transition-all"
        >
          Parar
        </button>
      )}

      {/* Guitar String Reference */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-2xl mt-8">
        {guitarStrings.map((s) => (
          <div key={s.name} className={`text-center p-3 rounded-xl border transition-all ${
            note === s.name && isActive
            ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
            : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <div className="text-xl font-bold">{s.name}</div>
            <div className="text-xs">{s.freq} Hz</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tuner;
