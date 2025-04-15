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
import weg.projetofinal.Imobiliaria.security.service.UserDetailsImpl;
import weg.projetofinal.Imobiliaria.security.util.JwtUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
}
