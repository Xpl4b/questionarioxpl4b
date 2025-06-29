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
    <div className="relative w-full max-w-lg h-[450px] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#2E254D] to-[#1A1333] border border-[#58E2C2]/30">
      {/* Parte superiore con l'immagine */}
      <div className="w-full h-[75%] relative bg-white/5 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={content.question}
          className="w-full h-full object-cover"
        />
        
        {/* Badge attività */}
        <div className="absolute top-4 left-4 z-10 bg-[#58E2C2] text-[#2E254D] px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
          Attività #{content.id}
        </div>
      </div>
      
      {/* Parte inferiore con il testo */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{content.question}</h3>
      </div>
    </div>
  );
};

export default SwipeCard;
