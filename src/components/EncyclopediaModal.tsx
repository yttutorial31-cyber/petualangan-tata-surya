import React, { useState } from 'react';
import { X, Globe2, BookOpen, Orbit, Compass, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PLANETS_ENCYCLOPEDIA } from '../data/planets';

interface EncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EncyclopediaModal: React.FC<EncyclopediaModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentPlanet = PLANETS_ENCYCLOPEDIA[selectedPlanetIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border-2 border-indigo-400/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                Buku Panduan Astronot Cilik
              </h2>
              <p className="text-xs text-indigo-200">
                Materi Tata Surya IPA SD Kelas 6: Karakteristik 8 Planet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Planet Selector List */}
          <div className="flex flex-col gap-2 md:col-span-1 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Daftar Planet Sesuai Urutan:
            </span>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {PLANETS_ENCYCLOPEDIA.map((planet, idx) => {
                const isSelected = idx === selectedPlanetIndex;
                return (
                  <button
                    key={planet.name}
                    onClick={() => setSelectedPlanetIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow-md'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-inner inline-block"
                        style={{ backgroundColor: planet.color }}
                      />
                      <span className="text-sm font-extrabold">{planet.order}. {planet.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-30'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick rule tip */}
            <div className="mt-4 p-3 rounded-2xl bg-indigo-950/40 border border-indigo-400/20 text-[11px] text-indigo-200">
              <strong className="text-amber-300 block mb-1">💡 Pengelompokan Planet:</strong>
              • <strong>Planet Dalam:</strong> Merkurius, Venus, Bumi, Mars (berbatu/padat).<br />
              • <strong>Sabuk Asteroid:</strong> Pembatas alami.<br />
              • <strong>Planet Luar:</strong> Yupiter, Saturnus, Uranus, Neptunus (raksasa gas & es).
            </div>
          </div>

          {/* Planet Detail Panel */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlanet.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Planet banner */}
                <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-700 relative overflow-hidden flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                      {currentPlanet.type}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      {currentPlanet.order}. {currentPlanet.name}
                    </h3>
                    <p className="text-amber-300 text-sm font-bold mt-0.5">
                      "{currentPlanet.alias}"
                    </p>
                  </div>

                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-2xl flex items-center justify-center relative shrink-0"
                    style={{
                      backgroundColor: currentPlanet.color,
                      boxShadow: `0 0 30px ${currentPlanet.color}80`
                    }}
                  >
                    <Globe2 className="w-12 h-12 text-slate-950/40" />
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    Ciri Utama:
                  </span>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    {currentPlanet.summary}
                  </p>
                </div>

                {/* Characteristics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPlanet.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs font-semibold text-indigo-100 flex items-center gap-2"
                    >
                      <Orbit className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Fun Fact */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-400/30">
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-1">
                        Fakta Menarik Antariksa:
                      </h4>
                      <p className="text-sm text-amber-100 leading-relaxed">
                        {currentPlanet.funFact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            Tutup Buku Panduan
          </button>
        </div>
      </motion.div>
    </div>
  );
};
