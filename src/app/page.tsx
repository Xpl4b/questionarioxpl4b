'use client';

import { useState } from 'react';
import SurveySwiper from '@/components/SurveySwiper';
import { surveyCards, feedbackOptions } from '@/data/surveyData';
import { SurveyResponse } from '@/types';
import Image from 'next/image';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSurveyComplete = async (responses: SurveyResponse[]) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Error submitting survey:', result.message);
        alert('Si è verificato un errore durante l\'invio della survey. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Si è verificato un errore durante l\'invio della survey. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#2E254D]">
      <header className="bg-[#2E254D] border-b border-[#58E2C2]/20 py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#58E2C2] tracking-wider">XP-L4B</h1>
            <span className="text-white text-sm">|</span>
            <h2 className="text-white font-medium">Workshop Feedback</h2>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="bg-[#58E2C2]/20 rounded-full p-6 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#58E2C2]">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center text-white uppercase tracking-wider">GRAZIE PER IL TUO FEEDBACK!</h2>
            <p className="text-[#58E2C2] text-center max-w-md">
              Le tue risposte sono state registrate con successo e sono completamente anonime. Grazie per aver partecipato alla nostra survey.
            </p>
            
            <div className="mt-10 flex justify-center gap-6 items-center">
              <p className="text-white">Seguici sui social:</p>
              <a 
                href="https://www.instagram.com/xpl4b2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/xp-l4b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-4">VALUTA LA TUA ESPERIENZA</h2>
              <h3 className="text-[#58E2C2] mb-6 text-xl">Workshop Gamification</h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-4 border border-[#58E2C2]/30 shadow-lg">
                <p className="text-white">
                  <span className="font-bold text-[#58E2C2]">Come giocare:</span> Swipe a destra se ti è piaciuta l'attività, a sinistra se non ti è piaciuta.
                </p>
                <p className="text-white/80 mt-3 text-sm">
                  Dopo ogni swipe potrai scegliere cosa ti è piaciuto di più e lasciare un commento. Le tue risposte sono completamente anonime.
                </p>
              </div>
            </div>
            <SurveySwiper 
              cards={surveyCards}
              feedbackOptions={feedbackOptions}
              onComplete={handleSurveyComplete}
            />
          </div>
        )}
      </main>
    </div>
  );
}
