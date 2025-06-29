import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import SwipeCard from './SwipeCard';
import FeedbackModal from './FeedbackModal';
import { CardContent, FeedbackOption, SurveyResponse } from '../types';

interface SurveySwiperProps {
  cards: CardContent[];
  feedbackOptions: FeedbackOption[];
  onComplete: (responses: SurveyResponse[]) => void;
}

const SurveySwiper: React.FC<SurveySwiperProps> = ({
  cards,
  feedbackOptions,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastSwipeDirection, setLastSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipedCardId, setSwipedCardId] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  
  // Used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useRef<any[]>(
    Array(cards.length)
      .fill(0)
      .map(() => React.createRef())
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // Handle card swiped out of frame
  const swiped = (direction: string, cardId: number, index: number) => {
    const liked = direction === 'right';
    setLastSwipeDirection(direction as 'left' | 'right');
    setSwipedCardId(cardId);
    updateCurrentIndex(index - 1);
    setShowFeedback(true);
  };
  
  // Funzione per gestire il click sul pulsante "Mi è piaciuto" (Sì)
  const handleLikeClick = () => {
    if (currentIndex >= 0 && childRefs.current[currentIndex]) {
      // Simuliamo uno swipe a destra
      childRefs.current[currentIndex].current.swipe('right');
    }
  };
  
  // Funzione per gestire il click sul pulsante "Non mi è piaciuto" (No)
  const handleDislikeClick = () => {
    if (currentIndex >= 0 && childRefs.current[currentIndex]) {
      // Simuliamo uno swipe a sinistra
      childRefs.current[currentIndex].current.swipe('left');
    }
  };

  const handleFeedbackSubmit = (selectedOptions: number[], customFeedback: string) => {
    if (swipedCardId === null || lastSwipeDirection === null) return;

    const newResponse: SurveyResponse = {
      cardId: swipedCardId,
      liked: lastSwipeDirection === 'right',
      selectedOptions,
      customFeedback: customFeedback || undefined
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);
    setShowFeedback(false);

    if (currentIndex < 0) {
      // All cards have been swiped
      setCompleted(true);
      onComplete(newResponses);
    }
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      {completed ? (
        <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-[#58E2C2]/20 shadow-lg px-6 py-8">
          <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">GRAZIE PER IL TUO FEEDBACK!</h2>
          <p className="text-[#58E2C2]">Le tue risposte sono state registrate.</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[500px] w-full">
          <div className="relative w-full max-w-lg h-[400px] px-4">
            {cards.map((card, index) => (
              <div className="absolute" key={card.id}>
                {index === currentIndex && (
                  <TinderCard
                    ref={childRefs.current[index]}
                    className="swipe"
                    onSwipe={(dir) => swiped(dir, card.id, index)}
                    preventSwipe={['up', 'down']}
                  >
                    <SwipeCard 
                      content={card} 
                      onLike={handleLikeClick} 
                      onDislike={handleDislikeClick} 
                    />
                  </TinderCard>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!completed && currentIndex < 0 && !showFeedback && (
        <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-[#58E2C2]/20 shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#58E2C2]"></div>
          </div>
          <h2 className="text-xl font-bold mb-3 text-white uppercase tracking-wider">ELABORAZIONE RISPOSTE...</h2>
          <p className="text-[#58E2C2]">Stiamo registrando le tue risposte.</p>
        </div>
      )}

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
        options={feedbackOptions}
        liked={lastSwipeDirection === 'right'}
        cardId={swipedCardId ?? 0}
      />
      
      {!completed && (
        <div className="mt-8 text-center">
          {/* Indicatori di progresso */}
          <div className="flex justify-center items-center gap-2 mb-4">
            {cards.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${idx > currentIndex ? 'bg-[#58E2C2]' : 'bg-white/30'}`}
              ></div>
            ))}
          </div>
          
          <p className="text-[#58E2C2] text-sm mb-6 font-medium">
            {currentIndex + 1} di {cards.length} domande
          </p>
          
          <div className="flex justify-center gap-10 mt-4">
            <div className="text-center">
              <button 
                onClick={handleDislikeClick}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-red-500/30 backdrop-blur-sm mb-3 shadow-lg hover:bg-white/20 transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <p className="text-sm text-white font-medium">Non mi piace</p>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleLikeClick}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-[#58E2C2]/50 backdrop-blur-sm mb-3 shadow-lg hover:bg-white/20 transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#58E2C2]">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </button>
              <p className="text-sm text-white font-medium">Mi piace</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveySwiper;
