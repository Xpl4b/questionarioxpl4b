# Configurazione Variabili d'Ambiente per Vercel

Per far funzionare correttamente l'applicazione su Vercel, è necessario configurare le seguenti variabili d'ambiente nel pannello di controllo di Vercel.

## Variabili d'Ambiente Richieste

| Nome | Descrizione | Esempio |
|------|-------------|--------|
| `NEXT_PUBLIC_GOOGLE_SHEET_ID` | ID del foglio Google Sheets | `1YupDRJZT7As2P9ASDkjda82h3r_pEGlxyz123456` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email dell'account di servizio | `survey-service@project-id.iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | Chiave privata dell'account di servizio | `-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n` |

## Istruzioni per la Configurazione

1. Vai alla dashboard del tuo progetto su Vercel
2. Clicca su "Settings" nel menu in alto
3. Seleziona "Environment Variables" nella barra laterale
4. Per ogni variabile nella tabella sopra:
   - Clicca su "Add New"
   - Inserisci il nome della variabile (es. `GOOGLE_SERVICE_ACCOUNT_EMAIL`)
   - Copia il valore dal tuo file `.env.local`
   - Seleziona gli ambienti in cui la variabile deve essere disponibile (Production, Preview, Development)
   - Clicca su "Save"

## Note Importanti

- La chiave privata deve essere inserita esattamente come appare nel file JSON delle credenziali, inclusi i caratteri di nuova riga (`\n`).
- Il foglio Google Sheets deve essere condiviso con l'email dell'account di servizio con permessi di Editor.
- Su Google Cloud Console, ricordati di abilitare l'API Google Sheets per il tuo progetto.
- Durante la configurazione su Vercel, è importante selezionare l'opzione per mantenere i caratteri di nuova riga nella variabile `GOOGLE_PRIVATE_KEY`.

## Verifica della Configurazione

Dopo il deployment, verifica che le risposte della survey vengano salvate correttamente nel foglio Google Sheets. Se ci sono problemi, controlla i log di Vercel per vedere eventuali errori relativi all'autenticazione.
