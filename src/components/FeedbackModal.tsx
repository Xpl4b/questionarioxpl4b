import React, { useState, useEffect } from 'react';
import { FeedbackOption } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedOptions: number[], customFeedback: string) => void;
  options: FeedbackOption[];
  liked: boolean;
  cardId: number;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  options,
  liked,
  cardId
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [customFeedback, setCustomFeedback] = useState('');

  // Effetto sonoro quando si apre il modal
  useEffect(() => {
    if (isOpen) {
      // Qui potresti aggiungere un effetto sonoro se disponibile
      // const sound = new Audio('/sounds/feedback.mp3');
      // sound.play();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedOptions, customFeedback);
    setSelectedOptions([]);
    setCustomFeedback('');
  };

  // Spostato in cima al componente

  return (
    <div className="fixed inset-0 bg-[#2E254D]/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-[#1A1333] border border-[#58E2C2]/30 rounded-3xl p-8 w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center mb-6">
          <div className={`${liked ? 'bg-[#58E2C2]/20' : 'bg-white/10'} p-3 rounded-full mr-4 shadow-lg border ${liked ? 'border-[#58E2C2]/30' : 'border-red-400/30'}`}>
            {liked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#58E2C2]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wide">
            {liked ? 'Cosa ti è piaciuto?' : 'Perché non ti è piaciuto?'}
          </h3>
        </div>
        
        {liked && (
          <div className="mb-8">
            <p className="mb-4 text-[#58E2C2] font-medium">Seleziona le opzioni (puoi selezionarne più di una):</p>
            <div className="flex flex-wrap gap-3">
              {options.map(option => (
                <button
                  key={option.id}
                  className={`px-4 py-2 rounded-full text-sm transition-all transform ${
                    selectedOptions.includes(option.id)
                      ? 'bg-[#58E2C2] text-[#2E254D] shadow-lg scale-105 font-medium'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-[#58E2C2]/30'
                  }`}
                  onClick={() => handleOptionToggle(option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-8">
          {liked && (
            <label htmlFor="feedback" className="block mb-3 text-[#58E2C2] font-medium">
              Commenti aggiuntivi (opzionale):
            </label>
          )}
          <div className="relative">
            <textarea
              id="feedback"
              className="w-full p-4 bg-white/5 border border-[#58E2C2]/30 rounded-xl focus:border-[#58E2C2] focus:ring focus:ring-[#58E2C2]/20 focus:ring-opacity-50 transition-all text-white resize-none"
              rows={3}
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              placeholder={liked ? "La tua opinione è importante! Condividi i tuoi pensieri..." : "Lascia un commento..."}
            />
            <div className="absolute bottom-3 right-3 text-xs text-[#58E2C2]/80">
              {customFeedback.length} / 200 caratteri
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transform transition-all shadow-md font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Torna indietro
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#58E2C2] text-[#2E254D] rounded-full hover:bg-[#4AD1B1] transform transition-all hover:scale-105 shadow-lg font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
            </svg>
            Continua l'avventura
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
