# Survey Gamificata per Workshop

Questo progetto è una web app interattiva per la raccolta di feedback a seguito di un workshop sulla gamification. L'app utilizza un'interfaccia "swipe" ispirata a Tinder per rendere divertente e coinvolgente la raccolta dei feedback.

## Descrizione del Progetto

Questa applicazione web consente ai partecipanti del workshop di fornire feedback su diverse attività svolte, utilizzando una modalità di interazione divertente e gamificata:

- Interfaccia swipe (destra per "mi piace", sinistra per "non mi piace")
- 5 card corrispondenti a diverse attività del workshop
- Popup dopo ogni swipe per raccogliere dettagli aggiuntivi
- Integrazione con Google Sheets per salvare tutte le risposte
- Generazione di QR code per facilitare l'accesso

## Come iniziare

### Configurazione Google Sheets

Prima di avviare l'applicazione, è necessario configurare l'integrazione con Google Sheets:

1. Crea un progetto nella [Google Cloud Console](https://console.cloud.google.com/)
2. Attiva l'API Google Sheets per il tuo progetto
3. Crea un account di servizio e scarica il file JSON con le credenziali
4. Crea un nuovo foglio Google Sheets e condividilo con l'email dell'account di servizio
5. Copia l'ID del foglio Google Sheets (dalla URL)
6. Crea un file `.env.local` nella root del progetto con i seguenti valori:

```
NEXT_PUBLIC_GOOGLE_SHEET_ID=il_tuo_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=email_account_servizio@example.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...chiave privata...\n-----END PRIVATE KEY-----\n"
```

### Avvio dell'applicazione

Esegui il server di sviluppo:

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser per vedere l'applicazione.

### Generazione del QR Code

Per facilitare l'accesso all'applicazione durante il workshop, puoi generare un QR code cliccando sul pulsante "Genera QR Code" nell'interfaccia. Questo QR code può essere mostrato ai partecipanti per accedere rapidamente alla survey.

## Struttura del Workshop

Questa survey è pensata per raccogliere feedback sulle attività del workshop di gamification, che include:

- **10:00**: Arrivo dei partecipanti
- **10:15**: Inizio con fumetto sulla gamification
- **10:20**: Icebreaker e apertura kit
- **10:35**: Risultati icebreaker e distribuzione gemme
- **10:40**: Dimostrazione premi
- **10:45**: Fumetto su motivazione intrinseca ed engagement
- **10:50**: Gioco di ruolo con minigiochi:
  - Cruciverba
  - Reverse AI Prompt
  - Keep Talking Nobody Explodes

La survey raccoglie feedback su questi elementi in maniera gamificata, coerente con il tema del workshop stesso.

## Personalizzazione

Per personalizzare l'applicazione:

- Modifica le domande in `src/data/surveyData.ts`
- Aggiorna le opzioni di feedback nello stesso file
- Sostituisci le immagini placeholder in `public/images/` con immagini reali delle attività
- Personalizza i colori e lo stile nei componenti React

## Deployment

Per il deployment in produzione, si consiglia l'utilizzo di Vercel o Netlify.

```bash
npm run build
```

Quando l'applicazione è in produzione, assicurati di configurare correttamente le variabili d'ambiente per l'integrazione con Google Sheets.
