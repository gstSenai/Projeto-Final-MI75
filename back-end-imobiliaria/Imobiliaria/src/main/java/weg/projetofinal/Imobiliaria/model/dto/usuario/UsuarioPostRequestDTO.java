package weg.projetofinal.Imobiliaria.model.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

import java.util.Date;

public record UsuarioPostRequestDTO(
        Integer id,
        @NotBlank String nome,
        @NotBlank String sobrenome,
        @NotBlank String tipo_conta,
        @Email @NotBlank String email,
        @NotBlank @Size(min = 6) String senha,
        String imagem_usuario,
) {}