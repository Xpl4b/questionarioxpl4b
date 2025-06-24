import { NextResponse } from 'next/server';
import { saveToGoogleSheets } from '@/lib/googleSheets';
import { saveToSupabase } from '@/lib/supabase';
import { SurveyResponse } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { responses } = body as { responses: SurveyResponse[] };

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { success: false, message: 'Invalid data format' }, 
        { status: 400 }
      );
    }

    // Prova prima con Supabase e poi fallback su Google Sheets se necessario
    try {
      const success = await saveToSupabase(responses);
      return NextResponse.json({ success: true, provider: 'supabase' });
    } catch (supabaseError: any) {
      console.log('Fallback a Google Sheets dopo errore Supabase:', supabaseError.message);
      
      try {
        const success = await saveToGoogleSheets(responses);
        return NextResponse.json({ success: true, provider: 'googlesheets' });
      } catch (sheetsError: any) {
        console.error('Anche Google Sheets ha fallito:', sheetsError.message);
        return NextResponse.json(
          { success: false, message: 'Errore nel salvataggio dei dati sia su Supabase che su Google Sheets' }, 
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
