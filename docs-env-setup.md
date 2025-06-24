# Configurazione delle Variabili d'Ambiente

Per il corretto funzionamento dell'integrazione con Google Sheets, è necessario configurare le seguenti variabili d'ambiente in un file `.env.local`:

```
NEXT_PUBLIC_GOOGLE_SHEET_ID=il_tuo_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=email_account_servizio@example.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...chiave privata...\n-----END PRIVATE KEY-----\n"
```

## Passaggi per la configurazione

1. **Crea un progetto nella Google Cloud Console**
   - Vai su [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Crea un nuovo progetto o seleziona uno esistente

2. **Attiva l'API Google Sheets**
   - Nel menu, vai su "API e Servizi" > "Libreria API"
   - Cerca "Google Sheets API" e attivala

3. **Crea un account di servizio**
   - Nel menu, vai su "API e Servizi" > "Credenziali"
   - Clicca su "Crea Credenziali" > "Account di servizio"
   - Completa la procedura guidata e scarica il file JSON con le credenziali
   - Dal file JSON, estrai i campi `client_email` e `private_key`

4. **Crea un foglio Google Sheets**
   - Vai su [https://sheets.google.com/](https://sheets.google.com/)
   - Crea un nuovo foglio
   - Condividilo con l'email dell'account di servizio (con permessi di modifica)
   - Dall'URL del foglio, estrai l'ID (la parte tra '/d/' e '/edit')

5. **Crea il file `.env.local`**
   - Crea un file chiamato `.env.local` nella root del progetto
   - Aggiungi le variabili d'ambiente come specificato sopra
   - Sostituisci i valori con quelli ottenuti nei passaggi precedenti

## Struttura del foglio Google Sheets

Il foglio Google Sheets dovrebbe avere i seguenti header nella prima riga:

- Card ID
- Liked
- Selected Options
- Custom Feedback
- Timestamp

L'applicazione aggiungerà automaticamente i dati nelle righe successive quando gli utenti completeranno la survey.
