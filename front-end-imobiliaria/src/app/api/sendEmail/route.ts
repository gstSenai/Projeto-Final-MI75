import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log('Iniciando processamento de email...');
    const { subject, message, customerEmail } = await req.json();
    console.log('Dados recebidos:', { subject, message, customerEmail });

    // Validação dos dados recebidos
    if (!subject || !message || !customerEmail) {
      console.error('Dados incompletos:', { subject, message, customerEmail });
      return NextResponse.json({ 
        error: 'Dados incompletos',
        details: 'Todos os campos são obrigatórios: subject, message e customerEmail'
      }, { status: 400 });
    }

    // Validação das configurações
    if (!process.env.RESEND_API_KEY || !process.env.ATTENDANT_EMAIL) {
      console.error('Configurações ausentes:', {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasAttendantEmail: !!process.env.ATTENDANT_EMAIL
      });
      return NextResponse.json({ 
        error: 'Configuração incompleta',
        details: 'Configurações de email não encontradas no arquivo .env.local'
      }, { status: 500 });
    }

    console.log('Configurações validadas, enviando email para o atendente...');

    // Email para o atendente
    const { data: attendantEmail, error: attendantError } = await resend.emails.send({
      from: 'Imobiliária <onboarding@resend.dev>',
      to: process.env.ATTENDANT_EMAIL,
      subject: `Nova mensagem do cliente: ${subject}`,
      text: `Mensagem do cliente (${customerEmail}):\n\n${message}\n\nPara responder, clique em "Responder" no seu cliente de email.`,
      reply_to: customerEmail,
    });

    if (attendantError) {
      console.error('Erro ao enviar email para o atendente:', attendantError);
      return NextResponse.json({ 
        error: 'Erro ao enviar email para o atendente',
        details: attendantError.message
      }, { status: 500 });
    }

    console.log('Email para o atendente enviado com sucesso, enviando confirmação para o cliente...');

    // Email de confirmação para o cliente
    const { data: customerEmailData, error: customerError } = await resend.emails.send({
      from: 'Imobiliária <onboarding@resend.dev>',
      to: customerEmail,
      subject: 'Recebemos sua mensagem - Imobiliária',
      text: `Olá!\n\nRecebemos sua mensagem e um de nossos atendentes responderá em breve.\n\nSua mensagem:\n${message}\n\nAtenciosamente,\nEquipe de Atendimento`,
    });

    if (customerError) {
      console.error('Erro ao enviar email de confirmação:', customerError);
      return NextResponse.json({ 
        error: 'Erro ao enviar email de confirmação',
        details: customerError.message
      }, { status: 500 });
    }

    console.log('Emails enviados com sucesso!');
    return NextResponse.json({ 
      success: true, 
      attendantEmail: attendantEmail,
      customerEmail: customerEmailData 
    });
  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack,
      config: {
        resendApiKey: process.env.RESEND_API_KEY ? 'Configurado' : 'Não configurado',
        attendantEmail: process.env.ATTENDANT_EMAIL ? 'Configurado' : 'Não configurado'
      }
    });
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    }, { status: 500 });
  }
} 