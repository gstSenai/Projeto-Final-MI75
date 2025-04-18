package weg.projetofinal.Imobiliaria.security.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioCadastroPostDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;
import weg.projetofinal.Imobiliaria.security.model.dto.JwtResponse;
import weg.projetofinal.Imobiliaria.security.model.dto.LoginDto;
import weg.projetofinal.Imobiliaria.security.model.entity.ERole;
import weg.projetofinal.Imobiliaria.security.model.entity.Role;
import weg.projetofinal.Imobiliaria.security.repository.RoleRepository;
import weg.projetofinal.Imobiliaria.security.service.PasswordResetService;
import weg.projetofinal.Imobiliaria.security.service.UserDetailsImpl;
import weg.projetofinal.Imobiliaria.security.util.JwtUtil;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private UsuarioRepository usuarioDetailsRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtils;
    private PasswordResetService passwordResetService;


    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsernameOrEmail(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails.getUsername());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new JwtResponse(
                        jwtToken,
                        "Bearer",
                        userDetails.getId(),
                        userDetails.getUsername(),
                        roles
                )
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UsuarioCadastroPostDTO signUpRequest){
        if(usuarioDetailsRepository.existsByUsername(signUpRequest.getUsername())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username is already taken");
        }
        if(usuarioDetailsRepository.existsByEmail(signUpRequest.getEmail())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("email is already taken");
        }
        String hashedPassword = passwordEncoder.encode(signUpRequest.getPassword());
        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);
        if(userRole.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("role not found");
        }
        roles.add(userRole.get());
        Usuario user = new Usuario();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(hashedPassword);
        user.setRoles(roles);
        user.atualizarTipoContaPelaRole();
        usuarioDetailsRepository.save(user);
        return ResponseEntity.ok("User registered sucess");

    }

    @PostMapping("/esqueci-senha")
    public ResponseEntity<?> enviarCodigo(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(new HashMap<String, String>() {{
                            put("message", "Email não fornecido");
                        }});
            }

            String token = passwordResetService.enviarCodigoRedefinicao(email);
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "Código enviado para o e-mail com sucesso");
                put("token", token); // Opcional: remover em produção
            }});
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new HashMap<String, String>() {{
                        put("message", "Erro ao enviar código: " + e.getMessage());
                    }});
        }
    }

    @PostMapping("/redefinirSenha")
    public ResponseEntity<?> redefinirSenha(@RequestBody Map<String, String> body) {
        try {
            String token = body.get("token");
            String novaSenha = body.get("novaSenha");

            // Validações
            if (token == null || token.trim().isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(new HashMap<String, String>() {{
                            put("message", "Token não fornecido");
                        }});
            }

            if (novaSenha == null || novaSenha.trim().isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body(new HashMap<String, String>() {{
                            put("message", "Nova senha não fornecida");
                        }});
            }

            if (novaSenha.length() < 6) {
                return ResponseEntity
                        .badRequest()
                        .body(new HashMap<String, String>() {{
                            put("message", "A senha deve ter no mínimo 6 caracteres");
                        }});
            }

            passwordResetService.redefinirSenha(token, novaSenha);
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "Senha redefinida com sucesso");
            }});

        } catch (RuntimeException e) {
            HttpStatus status = e.getMessage().contains("Token inválido") ||
                    e.getMessage().contains("Token expirado") ?
                    HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;

            return ResponseEntity
                    .status(status)
                    .body(new HashMap<String, String>() {{
                        put("message", e.getMessage());
                    }});
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new HashMap<String, String>() {{
                        put("message", "Erro ao redefinir senha: " + e.getMessage());
                    }});
        }
    }

    @GetMapping("/verificar-token")
    public ResponseEntity<?> verificarToken(@RequestParam String token) {
        try {
            boolean isValid = passwordResetService.isTokenValid(token);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("valid", isValid);
            }});
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new HashMap<String, String>() {{
                        put("message", "Erro ao verificar token: " + e.getMessage());
                    }});
        }
    }
}
