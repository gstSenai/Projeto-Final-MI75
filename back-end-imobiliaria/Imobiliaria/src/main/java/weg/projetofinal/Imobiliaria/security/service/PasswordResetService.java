package weg.projetofinal.Imobiliaria.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;
import weg.projetofinal.Imobiliaria.security.model.entity.PasswordResetToken;
import weg.projetofinal.Imobiliaria.security.repository.PasswordResetTokenRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public String enviarCodigoRedefinicao(String email) {
        try {
            Optional<Usuario> usuarioOpt = userRepository.findByEmail(email);
            if (usuarioOpt.isEmpty()) {
                throw new UsernameNotFoundException("Usuário não encontrado com este email: " + email);
            }

            Usuario usuario = usuarioOpt.get();
            String token = UUID.randomUUID().toString();

            // Verifica se já existe um token para este usuário
            Optional<PasswordResetToken> existingTokenOpt = tokenRepository.findByUsuario(usuario);

            PasswordResetToken resetToken;
            if (existingTokenOpt.isPresent()) {
                // Atualiza o token existente
                resetToken = existingTokenOpt.get();
                resetToken.setToken(token);
                resetToken.setExpirationDate(LocalDateTime.now().plusMinutes(15));
            } else {
                // Cria um novo token
                resetToken = new PasswordResetToken();
                resetToken.setToken(token);
                resetToken.setUsuario(usuario);
                resetToken.setExpirationDate(LocalDateTime.now().plusMinutes(15));
            }

            // Salva o token (atualizado ou novo)
            tokenRepository.save(resetToken);

            // Prepara o email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail); // Usa o email configurado no SendGrid
            message.setTo(email);
            message.setSubject("Recuperação de Senha - Imobiliária");
            message.setText(String.format(
                    "Olá %s,\n\n" +
                            "Você solicitou a recuperação de senha. Use o código abaixo para redefinir sua senha:\n\n" +
                            "Código: %s\n\n" +
                            "Este código expira em 15 minutos.\n\n" +
                            "Se você não solicitou esta recuperação, por favor ignore este email.\n\n" +
                            "Atenciosamente,\n" +
                            "Equipe Imobiliária",
                    usuario.getUsername(),
                    token
            ));

            try {
                mailSender.send(message);
                return token;
            } catch (MailException e) {
                throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
            }

        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar recuperação de senha: " + e.getMessage());
        }
    }


    public void redefinirSenha(String token, String novaSenha) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            throw new RuntimeException("Token expirado");
        }

        Usuario usuario = resetToken.getUsuario();
        usuario.setPassword(new BCryptPasswordEncoder().encode(novaSenha));
        userRepository.save(usuario);

        tokenRepository.delete(resetToken);
    }

    public boolean isTokenValid(String token) {
        Optional<PasswordResetToken> resetToken = tokenRepository.findByToken(token);
        return resetToken.isPresent() && !resetToken.get().isExpired();
    }
}