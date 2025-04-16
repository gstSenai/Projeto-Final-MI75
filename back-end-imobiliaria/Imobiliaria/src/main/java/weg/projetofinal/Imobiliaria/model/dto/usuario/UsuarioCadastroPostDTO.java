package weg.projetofinal.Imobiliaria.model.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UsuarioCadastroPostDTO{
    private Integer id;
    private String username;
    private String sobrenome;
    private String email;
    private String password;
}
