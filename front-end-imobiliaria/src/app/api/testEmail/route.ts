import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log('Iniciando teste de email...');
    console.log('API Key:', process.env.RESEND_API_KEY ? 'Configurada' : 'Não configurada');
    console.log('Email do atendente:', process.env.ATTENDANT_EMAIL);

    if (!process.env.RESEND_API_KEY || !process.env.ATTENDANT_EMAIL) {
      return NextResponse.json({ 
        error: 'Configuração incompleta',
        details: 'Configurações de email não encontradas no arquivo .env.local'
      }, { status: 500 });
    }

    // Tentar enviar o email
    const { data, error } = await resend.emails.send({
      from: 'Imobiliária <onboarding@resend.dev>',
      to: process.env.ATTENDANT_EMAIL,
      subject: 'Teste de Email - Chatbot',
      text: 'Este é um email de teste do chatbot da imobiliária.',
    });

    if (error) {
      console.error('Erro ao enviar email de teste:', error);
      return NextResponse.json({ 
        error: 'Erro ao enviar email de teste',
        details: error.message
      }, { status: 500 });
    }

    console.log('Email de teste enviado com sucesso!');
    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack
    });
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    }, { status: 500 });
  }
} 