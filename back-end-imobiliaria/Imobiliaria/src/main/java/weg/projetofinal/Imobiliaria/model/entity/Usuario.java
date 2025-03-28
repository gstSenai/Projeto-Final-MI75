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
    private String tipo_conta;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String imagem_usuario;

    @Column(nullable = false)
    private boolean ativo = true;

    @OneToMany(mappedBy = "usuario")
    private List<Agendamento> agendamentos;

    @OneToMany(mappedBy = "corretor")
    private List<Agendamento> agendamentos_corretores;

}
