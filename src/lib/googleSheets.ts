// @ts-nocheck - Disabilitiamo temporaneamente TypeScript per questo file
// perché le definizioni dei tipi potrebbero non essere corrette
import { SurveyResponse } from '../types';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { surveyCards } from '../data/surveyData';

/**
 * Salva le risposte della survey su Google Sheets utilizzando le APIs ufficiali di Google.
 * @param {SurveyResponse[]} responses - Le risposte da salvare
 * @returns {Promise<boolean>} - True se il salvataggio è andato a buon fine
 */
export async function saveToGoogleSheets(responses: SurveyResponse[]): Promise<boolean> {
  console.log('### INIZIO SALVATAGGIO SU GOOGLE SHEETS CON AXIOS ###');
  console.log(`Numero di risposte da salvare: ${responses.length}`);
  
  try {
    // Verifica che le variabili d'ambiente necessarie siano presenti
    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    console.log('Controllo variabili d\'ambiente:');
    if (!sheetId) {
      console.error('- Sheet ID: MANCANTE');
      throw new Error('ID del foglio di Google Sheets non fornito nelle variabili d\'ambiente.');
    } else {
      const maskedId = sheetId.substring(0, 5) + '...';
      console.log(`- Sheet ID: ${maskedId}`);
    }
    
    if (!serviceAccountEmail) {
      console.error('- Service Account Email: MANCANTE');
      throw new Error('Email dell\'account di servizio Google non fornita nelle variabili d\'ambiente.');
    } else {
      console.log(`- Service Account Email: ${serviceAccountEmail}`);
    }
    
    if (!privateKey) {
      console.error('- Private Key: MANCANTE');
      throw new Error('Chiave privata dell\'account di servizio Google non fornita nelle variabili d\'ambiente.');
    } else {
      console.log('- Private Key: PRESENTE (censurata)');
    }

    console.log('Preparazione dei dati da salvare in Google Sheets...');
    
    try {
      // Formattare la chiave privata correttamente
      let formattedPrivateKey = privateKey;
      if (formattedPrivateKey.startsWith('"') && formattedPrivateKey.endsWith('"')) {
        formattedPrivateKey = formattedPrivateKey.slice(1, -1);
      }
      formattedPrivateKey = formattedPrivateKey.replace(/\\n/g, '\n');
      
      console.log('Autenticazione con Google Sheets...');
      // Usa la libreria google-spreadsheet che gestisce meglio i problemi di decodifica
      const jwt = new JWT({
        email: serviceAccountEmail,
        key: formattedPrivateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      
      const doc = new GoogleSpreadsheet(sheetId, jwt);
      
      // Carica il documento
      console.log('Caricamento documento...');
      await doc.loadInfo();
      console.log(`Documento caricato: ${doc.title}`);
      
      // Ottieni il primo foglio o creane uno nuovo
      let sheet = doc.sheetsByIndex[0];
      if (!sheet) {
        console.log('Nessun foglio trovato, ne creo uno nuovo...');
        sheet = await doc.addSheet({ title: 'Risposte Survey' });
      }
      console.log(`Foglio: ${sheet.title}`);
      
      // Carica le righe esistenti per controllare le intestazioni
      await sheet.loadHeaderRow();
      const headers = sheet.headerValues || [];
      
      // Controlla se le intestazioni sono già impostate
      if (!headers.length || headers[0] !== 'Domanda') {
        console.log('Impostazione intestazioni...');
        await sheet.setHeaderRow(['Domanda', 'Valutazione', 'Opzioni Feedback', 'Feedback Personalizzato', 'Timestamp']);
      }
      
      // Prepara i dati da inserire
      const rowsToAdd = responses.map(response => {
        // Trova la domanda corrispondente all'ID della card
        const cardQuestion = surveyCards.find(card => card.id === response.cardId)?.question || `Domanda ID ${response.cardId}`;
        
        return {
          'Domanda': cardQuestion,
          'Valutazione': response.liked ? 'Mi è piaciuto' : 'Non mi è piaciuto',
          'Opzioni Feedback': response.selectedOptions ? response.selectedOptions.join(', ') : '',
          'Feedback Personalizzato': response.customFeedback || '',
          'Timestamp': new Date().toISOString()
        };
      });
      
      // Aggiungi le righe
      console.log(`Aggiunta di ${rowsToAdd.length} righe al foglio...`);
      await sheet.addRows(rowsToAdd);
      
      console.log('Dati salvati con successo!');
    } catch (error) {
      console.error('Errore durante il salvataggio su Google Sheets:', error.message || error);
      throw new Error('Errore durante il salvataggio su Google Sheets: ' + error.message);
    }
    return true;
    
  } catch (error: any) {
    console.log('### ERRORE NEL SALVARE SU GOOGLE SHEETS ###');
    console.error(error);
    console.error('Tipo di errore:', error.constructor.name);
    console.error('Messaggio errore:', error.message);
    console.error('Stack errore:', error.stack);
    
    // Suggerimenti per risolvere problemi comuni
    if (error.message && error.message.includes('invalid_grant')) {
      console.error('ERRORE DI AUTENTICAZIONE: Le credenziali del service account potrebbero non essere valide');
      console.error('Assicurati che la chiave privata sia corretta e non sia scaduta.');
    }
    
    if (error.message && error.message.includes('Forbidden') || error.message?.includes('permission')) {
      console.error('ERRORE DI AUTORIZZAZIONE: Il service account non ha accesso al foglio');
      console.error(`Assicurati di aver condiviso il foglio con ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL} con permessi di EDITOR.`);
    }
    
    return false;
  }
};
