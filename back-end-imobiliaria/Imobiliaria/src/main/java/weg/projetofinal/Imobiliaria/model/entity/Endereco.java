package weg.projetofinal.Imobiliaria.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoImovelGetResponseDTO;

@Data
@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor
@Table(name = "tb_endereco")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false, length = 8)
    private String cep;

    @Column(nullable = false)
    private String numero;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String uf;

    private String complemento;

    @OneToOne(mappedBy = "id_endereco")
    private Imovel imovel;

    public EnderecoImovelGetResponseDTO convert(){
        return new EnderecoImovelGetResponseDTO(
                this.id, this.rua, this.cep,
                this.numero, this.bairro, this.cidade,
                this.uf, this.complemento);
    }

    public EnderecoGetResponseDTO convert2(){
        return new EnderecoGetResponseDTO(
                this.id, this.rua, this.cep,
                this.numero, this.bairro, this.cidade,
                this.uf, this.complemento, this.imovel.convert2());
    }

}
