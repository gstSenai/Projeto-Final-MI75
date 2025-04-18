package weg.projetofinal.Imobiliaria.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String systemEmail;

    public void sendVerificationCode(String toEmail, String code) {
        try {
            System.out.println("=== ENVIANDO CÓDIGO DE VERIFICAÇÃO ===");
            System.out.println("Para: " + toEmail);
            System.out.println("Código: " + code);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(systemEmail);
            message.setTo(toEmail);
            message.setSubject("Código de Verificação - HAV Imobiliária");
            message.setText("Olá,\n\nSeu código de verificação é: " + code + "\n\nUse este código para redefinir sua senha.\n\nAtenciosamente,\nEquipe HAV Imobiliária");

            mailSender.send(message);
            System.out.println("E-mail enviado com sucesso!");

        } catch (Exception e) {
            System.out.println("=== ERRO AO ENVIAR E-MAIL ===");
            System.out.println("Erro: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erro ao enviar e-mail: " + e.getMessage());
        }
    }
}