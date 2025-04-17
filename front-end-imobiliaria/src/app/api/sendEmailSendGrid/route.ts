import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    console.log('Iniciando processamento de email com Resend...');
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

    // Configurar o Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('Configurações validadas, enviando email para o atendente...');
    console.log('Email do atendente:', process.env.ATTENDANT_EMAIL);
    console.log('Email do cliente:', customerEmail);

    // Email para o atendente
    try {
      const attendantResult = await resend.emails.send({
        from: 'Imobiliária <onboarding@resend.dev>',
        to: process.env.ATTENDANT_EMAIL,
        reply_to: customerEmail,
        subject: `Nova mensagem do cliente: ${subject}`,
        text: `Mensagem do cliente (${customerEmail}):\n\n${message}`,
      });
      console.log('Resultado do envio para o atendente:', attendantResult);
    } catch (attendantError) {
      console.error('Erro ao enviar email para o atendente:', attendantError);
      return NextResponse.json({ 
        error: 'Erro ao enviar email para o atendente',
        details: attendantError.message
      }, { status: 500 });
    }

    console.log('Enviando confirmação para o cliente...');

    // Email de confirmação para o cliente
    try {
      const customerResult = await resend.emails.send({
        from: 'Imobiliária <onboarding@resend.dev>',
        to: customerEmail,
        subject: 'Recebemos sua mensagem - Imobiliária',
        text: `Olá!\n\nRecebemos sua mensagem e um de nossos atendentes responderá em breve.\n\nSua mensagem:\n${message}\n\nAtenciosamente,\nEquipe de Atendimento`,
      });
      console.log('Resultado do envio para o cliente:', customerResult);
    } catch (customerError) {
      console.error('Erro ao enviar email de confirmação:', customerError);
      return NextResponse.json({ 
        error: 'Erro ao enviar email de confirmação',
        details: customerError.message
      }, { status: 500 });
    }

    console.log('Emails enviados com sucesso!');
    return NextResponse.json({ 
      success: true, 
      message: 'Emails enviados com sucesso'
    });
  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      stack: error.stack,
      config: {
        resendKey: process.env.RESEND_API_KEY ? 'Configurado' : 'Não configurado',
        attendantEmail: process.env.ATTENDANT_EMAIL ? 'Configurado' : 'Não configurado'
      }
    });
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    }, { status: 500 });
  }
} 