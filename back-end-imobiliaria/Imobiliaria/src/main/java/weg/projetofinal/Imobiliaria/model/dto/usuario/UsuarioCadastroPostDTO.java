package weg.projetofinal.Imobiliaria.model.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioCadastroPostDTO(
        Integer id,
        @NotBlank String username,
        @NotBlank String sobrenome,
        @Email @NotBlank String email,
        @NotBlank @Size(min = 6) String password
) {
}
