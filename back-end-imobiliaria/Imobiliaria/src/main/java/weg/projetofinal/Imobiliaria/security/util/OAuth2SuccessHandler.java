package weg.projetofinal.Imobiliaria.security.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;
import weg.projetofinal.Imobiliaria.security.model.entity.ERole;
import weg.projetofinal.Imobiliaria.security.model.entity.Role;
import weg.projetofinal.Imobiliaria.security.repository.RoleRepository;

import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
@AllArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtils;

    private final UsuarioRepository userRepository;

    private final RoleRepository roleRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email");
        String name = user.getAttribute("name");

        Optional<Usuario> userOptional = userRepository.findByEmail(email);
        Usuario dbUser;

        if (userOptional.isEmpty()) {
            dbUser = new Usuario();
            dbUser.setEmail(email);
            dbUser.setUsername(name);
            dbUser.setProvider("google");
            dbUser.setPassword("oauth2_user");

            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role USER não encontrada"));

            Set<Role> roles = new HashSet<>();
            roles.add(userRole);
            dbUser.setRoles(roles);

            dbUser.atualizarTipoContaPelaRole();

            userRepository.save(dbUser);
        } else {
            dbUser = userOptional.get();
        }

        String token = jwtUtils.generateTokenFromUsername(email);

        response.sendRedirect("http://localhost:3000/login/success?token=" + token);
    }


}
