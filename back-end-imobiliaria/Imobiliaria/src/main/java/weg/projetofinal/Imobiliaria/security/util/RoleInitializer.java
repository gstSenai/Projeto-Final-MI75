package weg.projetofinal.Imobiliaria.security.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import weg.projetofinal.Imobiliaria.security.model.entity.ERole;
import weg.projetofinal.Imobiliaria.security.model.entity.Role;
import weg.projetofinal.Imobiliaria.security.repository.RoleRepository;

@Component
@RequiredArgsConstructor
public class RoleInitializer {

    private final RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        for (ERole role : ERole.values()) {
            if (roleRepository.findByName(role).isEmpty()) {
                Role newRole = new Role();
                newRole.setName(role);
                roleRepository.save(newRole);
            }
        }
    }
}

