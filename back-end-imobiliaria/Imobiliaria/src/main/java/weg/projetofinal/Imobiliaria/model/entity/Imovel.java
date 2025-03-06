package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import weg.projetofinal.Imobiliaria.model.dto.ImovelEnderecoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImovelImagemGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImovelUsuarioGetResponseDTO;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_imoveis")
@Builder
public class Imovel {
    @Id
    @Column(name = "id_imovel")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private Integer codigo;

    private String nome_propriedade;

    private String tipo_transacao;

    private Double valor_venda;

    private String tipo_imovel;

    private String status_imovel;

    private Double valor_promocional;

    private Boolean destaque;

    private Boolean visibilidade;

    private Double valor_iptu;

    private Double condominio;

    private Double area_construida;

    private Double area_terreno;

    private String descricao;

    @OneToOne
    @JoinColumn(name = "id_endereco", nullable = false, unique = true)
    private Endereco id_endereco;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario id_usuario;

    @OneToMany(mappedBy = "imovel")
    private List<Imagem> imagem;

    public ImovelGetResponseDTO convert(){
        return new ImovelGetResponseDTO(
                this.id, this.codigo, this.nome_propriedade,
                this.tipo_transacao, this.valor_venda, this.tipo_imovel,
                this.status_imovel, this.valor_promocional, this.destaque,
                this.visibilidade, this.valor_iptu, this.condominio,
                this.area_construida, this.area_terreno, this.descricao,
                this.id_endereco.convert(), this.id_usuario.convert()
        );
    }


    public ImovelEnderecoGetResponseDTO convert2() {
        return new ImovelEnderecoGetResponseDTO(
                this.id, this.codigo, this.nome_propriedade,
                this.tipo_transacao, this.valor_venda, this.tipo_imovel,
                this.status_imovel, this.valor_promocional, this.destaque,
                this.visibilidade, this.valor_iptu, this.condominio,
                this.area_construida, this.area_terreno, this.descricao);
    }

    public ImovelUsuarioGetResponseDTO convert3() {
        return new ImovelUsuarioGetResponseDTO(
                this.id, this.codigo, this.nome_propriedade,
                this.tipo_transacao, this.valor_venda, this.tipo_imovel,
                this.status_imovel, this.valor_promocional, this.destaque,
                this.visibilidade, this.valor_iptu, this.condominio,
                this.area_construida, this.area_terreno, this.descricao);
    }

    public ImovelImagemGetResponseDTO convert4(){
        return new ImovelImagemGetResponseDTO(
                this.id,this.codigo, this.nome_propriedade,
                this.tipo_transacao, this.valor_venda, this.tipo_imovel,
                this.status_imovel, this.valor_promocional, this.destaque,
                this.visibilidade, this.valor_iptu, this.condominio,
                this.area_construida, this.area_terreno, this.descricao
        );
    }

}
