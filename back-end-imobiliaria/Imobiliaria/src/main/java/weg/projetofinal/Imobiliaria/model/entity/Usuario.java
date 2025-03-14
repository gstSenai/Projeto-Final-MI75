package weg.projetofinal.Imobiliaria.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "tb_usuario")
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sobrenome;

    @Column(nullable = false, unique = true, length = 11)
    @CPF
    private String cpf;

    @Column(nullable = false)
    private String tipo_conta;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private Date data_nascimento;

    @Column(nullable = false, unique = true)
    @Email
    private String email;

    @Column(nullable = false)
    private String senha;

    @JsonIgnore
    private String imagem_usuario;

    @OneToOne
    @JoinColumn(name = "id_endereco_usuario")
    private EnderecoUsuario enderecoUsuario;

}
