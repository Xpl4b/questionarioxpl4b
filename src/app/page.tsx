'use client';

import { useState } from 'react';
import SurveySwiper from '@/components/SurveySwiper';
import { surveyCards, feedbackOptions } from '@/data/surveyData';
import { SurveyResponse } from '@/types';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

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

  const generateQRCode = () => {
    setShowQRCode(true);
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
          {!showQRCode && (
            <button
              onClick={generateQRCode}
              className="px-6 py-2 bg-[#58E2C2] text-[#2E254D] rounded-full hover:bg-[#4AD1B1] transition shadow-md font-medium"
            >
              Genera QR Code
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {showQRCode ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-8 text-center text-white uppercase tracking-wider">SCANSIONA IL QR CODE</h2>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-[#58E2C2]/30">
              <QRCodeSVG
                value={window.location.href}
                size={280}
                level="H"
                bgColor="rgba(255,255,255,0.9)"
                fgColor="#2E254D"
                includeMargin={true}
                imageSettings={{
                  src: '/favicon.ico',
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
            </div>
            <p className="mt-8 text-[#58E2C2] text-center max-w-md">
              Condividi questo QR Code con i partecipanti per farli accedere alla survey
            </p>
            <button
              onClick={() => setShowQRCode(false)}
              className="mt-8 px-6 py-3 bg-[#58E2C2] text-[#2E254D] rounded-full hover:bg-[#4AD1B1] transition shadow-md font-medium"
            >
              Torna alla Survey
            </button>
          </div>
        ) : isSubmitted ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="bg-[#58E2C2]/20 rounded-full p-6 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#58E2C2]">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center text-white uppercase tracking-wider">GRAZIE PER IL TUO FEEDBACK!</h2>
            <p className="text-[#58E2C2] text-center max-w-md">
              Le tue risposte sono state registrate con successo. Grazie per aver partecipato alla nostra survey.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 px-6 py-3 bg-[#58E2C2] text-[#2E254D] rounded-full hover:bg-[#4AD1B1] transition shadow-md font-medium"
            >
              Nuova Survey
            </button>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-4">VALUTA LA TUA ESPERIENZA</h2>
              <h3 className="text-[#58E2C2] mb-6 text-xl">Workshop Gamification</h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-4 border border-[#58E2C2]/30 shadow-lg">
                <p className="text-white">
                  <span className="font-bold text-[#58E2C2]">Come giocare:</span> Swipe a destra se ti è piaciuta l'attività, a sinistra se non ti è piaciuta.
                </p>
                <p className="text-white/80 mt-3 text-sm">
                  Dopo ogni swipe potrai scegliere cosa ti è piaciuto di più e lasciare un commento.
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
