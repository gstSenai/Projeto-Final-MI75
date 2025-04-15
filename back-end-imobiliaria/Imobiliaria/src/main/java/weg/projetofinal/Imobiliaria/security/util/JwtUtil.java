package weg.projetofinal.Imobiliaria.security.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private int jwtExpirationMs;

    // Gera a chave de assinatura a partir do secret (Base64)
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Gera um token JWT a partir do username
    public String generateTokenFromUsername(String username) {
        return Jwts.builder()
                .subject(username) // Define o subject (normalmente o username)
                .issuedAt(new Date()) // Data de criação
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // Expiração
                .signWith(getSigningKey(), Jwts.SIG.HS256) // Algoritmo de assinatura (HS256)
                .compact(); // Compacta e retorna como String
    }

    // Extrai o username do token JWT
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey()) // Verifica a assinatura
                .build()
                .parseSignedClaims(token) // Faz o parse do token
                .getPayload() // Pega o payload (claims)
                .getSubject(); // Retorna o subject (username)
    }

    // Valida o token JWT
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Token inválido: " + e.getMessage());
            return false;
        }
    }
}

