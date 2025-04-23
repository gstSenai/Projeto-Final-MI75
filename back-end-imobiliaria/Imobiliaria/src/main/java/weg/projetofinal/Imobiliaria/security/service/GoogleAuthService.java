package weg.projetofinal.Imobiliaria.security.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;
import weg.projetofinal.Imobiliaria.security.model.entity.ERole;
import weg.projetofinal.Imobiliaria.security.model.entity.Role;
import weg.projetofinal.Imobiliaria.security.repository.RoleRepository;
import weg.projetofinal.Imobiliaria.security.util.JwtUtil;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@AllArgsConstructor
public class GoogleAuthService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final JwtUtil jwtUtil;

    public String processOAuth2User(Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseGet(() -> {
                    Usuario newUser = new Usuario();
                    newUser.setEmail(email);
                    newUser.setUsername(name);
                    newUser.setImagem_usuario(picture);
                    newUser.setPassword("");

                    Set<Role> roles = new HashSet<>();
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Role não encontrada"));
                    roles.add(userRole);
                    newUser.setRoles(roles);
                    newUser.atualizarTipoContaPelaRole();

                    return usuarioRepository.save(newUser);
                });

        return jwtUtil.generateTokenFromUsername(usuario.getUsername());
    }
}