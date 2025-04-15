package weg.projetofinal.Imobiliaria.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import weg.projetofinal.Imobiliaria.security.model.entity.ERole;
import weg.projetofinal.Imobiliaria.security.model.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
