package weg.projetofinal.Imobiliaria.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    private static final int CODE_EXPIRATION_MINUTES = 5;

    public String generateVerificationCode(String email) {
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Email não pode ser vazio");
        }
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new RuntimeException("Usuário não encontrado");
                });
        Random random = new Random();
        String code = String.format("%06d", random.nextInt(1000000));
        usuario.setResetPasswordCode(code);
        usuario.setResetPasswordCodeExpiry(LocalDateTime.now().plusMinutes(CODE_EXPIRATION_MINUTES));
        usuarioRepository.save(usuario);
        emailService.sendVerificationCode(usuario.getEmail(), code);
        return code;
    }



    public void resetPassword(String email, String code, String newPassword) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getResetPasswordCode().equals(code)) {
            throw new RuntimeException("Código de verificação inválido");
        }

        if (usuario.getResetPasswordCodeExpiry() == null || usuario.getResetPasswordCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Código de verificação expirado");
        }

        usuario.setPassword(passwordEncoder.encode(newPassword));
        usuario.setResetPasswordCode(null);
        usuario.setResetPasswordCodeExpiry(null);
        usuarioRepository.save(usuario);
    }


    public void verifyCode(String email, String code) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getResetPasswordCode().equals(code)) {
            throw new RuntimeException("Código de verificação inválido");
        }

        if (usuario.getResetPasswordCodeExpiry() == null || usuario.getResetPasswordCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Código de verificação expirado");
        }
    }



}
