package weg.projetofinal.Imobiliaria.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;
import weg.projetofinal.Imobiliaria.security.model.entity.Role;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private String username;

    private String tipo_conta;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String imagem_usuario;

    @Column(nullable = false)
    private boolean ativo = true;

    @OneToMany(mappedBy = "usuario")
    private List<Agendamento> agendamentos;

    @OneToMany(mappedBy = "corretor")
    private List<Agendamento> agendamentos_corretores;

    @OneToMany(mappedBy = "id_usuario")
    private List<Imovel> imovel;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "usuario_details_id", referencedColumnName = "id")
//    private UsuarioDetails usuarioDetails;

    @Setter
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_usuario_to_tb_roles",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public void atualizarTipoContaPelaRole() {
        for (Role role : roles) {
            switch (role.getName()) {
                case ROLE_ADMIN:
                    this.tipo_conta = "Administrador";
                    return;
                case ROLE_CORRETOR:
                    this.tipo_conta = "Corretor";
                    return;
                case ROLE_EDITOR:
                    this.tipo_conta = "Editor";
                    return;
                case ROLE_USER:
                    this.tipo_conta = "Usuario";
                    return;
                default:
                    this.tipo_conta = "Desconhecido";
            }
        }
    }

}
