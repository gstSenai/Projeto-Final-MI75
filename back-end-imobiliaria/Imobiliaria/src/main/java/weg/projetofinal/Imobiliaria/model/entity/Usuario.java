package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;

@Data
@Entity
@Table(name = "tb_usuario")
@NoArgsConstructor
public class Usuario {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NonNull
    private Integer id;

    @Column(nullable = false)
    @NonNull
    private String nome;

    @Column
    @NonNull
    private String sobrenome;

    @Column
    @NonNull
    private String cpf;

    @Column
    @NonNull
    private String tipo_conta;

    @Column
    @NonNull
    private String telefone;

    @Column(nullable = false)
    @NonNull
    private Date data_nascimento;

    @Column
    @NonNull
    private String email;

    @Column
    @NonNull
    private String senha;

}
