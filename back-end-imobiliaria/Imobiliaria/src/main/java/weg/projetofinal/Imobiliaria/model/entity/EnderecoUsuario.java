package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_endereco_usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnderecoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String cep;
    private String rua;
    private String tipo_residencia;
    private Integer numero_imovel;
    private Integer numero_apartamento;
    private String bairro;
    private String cidade;
    private String uf;

    @OneToOne(mappedBy = "enderecoUsuario")
    private Usuario usuario;    
}
