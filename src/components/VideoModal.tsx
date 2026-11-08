import React, { useState } from 'react';
import { X, Play, Volume2, VolumeX, Shield, Zap, Sparkles, Check } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRentNow: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onRentNow }) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {/* Simulated Cinematic Video Feed */}
          <img
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
            alt="Affi Car Rent Official Showcase"
            className="w-full h-full object-cover opacity-85 scale-102 transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

          {/* Video Overlay Info */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-xs">
              AFFI CAR RENT • CINEMATIC FLEET SHOWCASE 4K
            </span>
          </div>

          {/* Center Play indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#075BEA]/90 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 backdrop-blur-xs">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          </div>

          {/* Video Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? '⏸ Jeda' : '▶ Putar'}
              </button>
              <span>01:42 / 03:15</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'Mute' : 'Audio On'}</span>
              </button>
              <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-bold">1080p 60FPS</span>
            </div>
          </div>
        </div>

        {/* Video Description & CTA */}
        <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-base text-white">
              Kenyamanan Maksimal & Armada Mobil Listrik (EV) Terbaru
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Tonton bagaimana standar sterilisasi, servis rutin, dan serah terima unit di Affi Car Rent.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onRentNow();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#075BEA] hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer transition-all"
          >
            Pesan Mobil Sekarang ➔
          </button>
        </div>
      </div>
    </div>
  );
};
