package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;
import weg.projetofinal.Imobiliaria.model.dto.ImovelUsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioImovelGetResponseDTO;

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

    @OneToMany(mappedBy = "id_usuario")
    private List<Imovel> imovel;

    public UsuarioImovelGetResponseDTO convert(){
        return new UsuarioImovelGetResponseDTO(
                this.id, this.nome, this.sobrenome,this.cpf,
                this.tipo_conta, this.telefone, this.data_nascimento,
                this.email, this.senha);
    }

    public UsuarioGetResponseDTO convert2(){
        List<ImovelUsuarioGetResponseDTO> imoveisDTO = this.imovel.stream()
                .map(Imovel::convert3)
                .toList();
        return new UsuarioGetResponseDTO(
                this.id, this.nome, this.sobrenome,this.cpf,
                this.tipo_conta, this.telefone, this.data_nascimento,
                this.email, this.senha, imoveisDTO);
    }
}
