import React from 'react';
import { CardContent } from '../types';
import Image from 'next/image';

interface SwipeCardProps {
  content: CardContent;
  onLike: () => void;
  onDislike: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ content, onLike, onDislike }) => {
  // Fallback per le immagini mancanti
  const imageSrc = content.image || '/images/placeholder.jpg';

  return (
    <div className="relative w-full max-w-sm h-[400px] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#2E254D] to-[#1A1333] border border-[#58E2C2]/30 transform transition-all duration-300 hover:scale-[1.02]">
      {/* Badge attività */}
      <div className="absolute top-4 left-4 z-10 bg-[#58E2C2] text-[#2E254D] px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
        Attività #{content.id}
      </div>

      {/* Overlay gradient per migliorare la leggibilità del testo sull'immagine */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2E254D] via-[#2E254D]/70 to-transparent z-[1]"></div>
      
      <div className="w-full h-3/5 overflow-hidden relative">
        <div
          className="w-full h-full bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{content.question}</h3>
        <p className="text-[#58E2C2] mb-6 font-medium">Valuta questa attività del workshop!</p>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={onDislike} 
            className="flex items-center px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-red-500/30 hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-white">Non mi è piaciuto</span>
          </button>
          <button 
            onClick={onLike} 
            className="flex items-center px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-[#58E2C2]/30 hover:bg-[#58E2C2]/20 transition-all duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium text-white">Mi è piaciuto</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#58E2C2] ml-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
