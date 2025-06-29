import { createClient } from '@supabase/supabase-js';
import { SurveyResponse } from '../types';
import { surveyCards, feedbackOptions } from '../data/surveyData';

// Configurazione del client Supabase
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variabili di ambiente Supabase mancanti');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

/**
 * Salva le risposte del sondaggio su Supabase
 * @param responses Array di risposte del sondaggio
 * @returns Promise<boolean> che indica se il salvataggio è avvenuto con successo
 */
export const saveToSupabase = async (responses: SurveyResponse[]): Promise<boolean> => {
  console.log('### INIZIO SALVATAGGIO SU SUPABASE ###');
  console.log(`Numero di risposte da salvare: ${responses.length}`);
  
  try {
    // Verifica che le variabili d'ambiente necessarie siano presenti
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    
    console.log('Controllo variabili d\'ambiente:');
    if (!supabaseUrl) {
      console.error('- Supabase URL: MANCANTE');
      throw new Error('URL Supabase non fornito nelle variabili d\'ambiente.');
    } else {
      console.log('- Supabase URL: PRESENTE');
    }
    
    if (!supabaseKey) {
      console.error('- Supabase Key: MANCANTE');
      throw new Error('Service Key Supabase non fornita nelle variabili d\'ambiente.');
    } else {
      console.log('- Supabase Key: PRESENTE (censurata)');
    }

    console.log('Preparazione dei dati da salvare in Supabase...');
    
    try {
      // Inizializza il client Supabase
      const supabase = getSupabaseClient();
      
      // Prepara i dati da inserire
      const dataToInsert = responses.map(response => {
        // Trova la domanda corrispondente all'ID della card
        const cardQuestion = surveyCards.find(card => card.id === response.cardId)?.question || `Domanda ID ${response.cardId}`;
        
        // Converti gli ID delle opzioni nei testi corrispondenti
        const optionTexts = response.selectedOptions 
          ? response.selectedOptions.map(optionId => {
              const option = feedbackOptions.find(opt => opt.id === Number(optionId));
              return option ? option.text : `Opzione ${optionId}`;
            }).join(', ')
          : '';
        
        return {
          question: cardQuestion,
          liked: response.liked,
          selected_options: optionTexts,
          custom_feedback: response.customFeedback || '',
          created_at: new Date().toISOString()
        };
      });
      
      console.log(`Inserimento di ${dataToInsert.length} risposte nel database...`);
      
      // Inserisci i dati nella tabella survey_responses
      const { data, error } = await supabase
        .from('survey_responses')
        .insert(dataToInsert);
      
      if (error) {
        console.error('Errore Supabase:', error);
        throw new Error(`Errore durante il salvataggio su Supabase: ${error.message}`);
      }
      
      console.log('Dati salvati con successo!');
      console.log('### SALVATAGGIO SU SUPABASE COMPLETATO ###');
    } catch (dbError: any) {
      console.error('Errore database Supabase:', dbError.message || dbError);
      throw new Error('Errore durante il salvataggio su Supabase: ' + dbError.message);
    }
    return true;
    
  } catch (error: any) {
    console.error('### ERRORE NEL SALVARE SU SUPABASE ###');
    console.error('Tipo di errore:', error.constructor.name);
    console.error('Messaggio errore:', error.message);
    console.error('Stack errore:', error.stack);
    throw error;
  }
};
