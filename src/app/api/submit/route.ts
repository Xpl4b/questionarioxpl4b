import { NextResponse } from 'next/server';
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

    // Salva le risposte su Supabase
    try {
      const success = await saveToSupabase(responses);
      return NextResponse.json({ success: true, provider: 'supabase' });
    } catch (error: any) {
      console.error('Errore nel salvataggio dei dati su Supabase:', error.message);
      return NextResponse.json(
        { success: false, message: 'Errore nel salvataggio dei dati su Supabase' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
