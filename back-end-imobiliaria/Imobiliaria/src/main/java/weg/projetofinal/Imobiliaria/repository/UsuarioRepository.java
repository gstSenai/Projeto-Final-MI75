package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>, JpaSpecificationExecutor<Usuario> {

    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    Optional<Usuario> findByResetPasswordToken(String resetPasswordToken);

    Optional<Usuario> findByUsernameOrEmail(String username, String email);

    @Query("SELECT u FROM Usuario u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail")
    Optional<Usuario> findByUsernameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);
}
