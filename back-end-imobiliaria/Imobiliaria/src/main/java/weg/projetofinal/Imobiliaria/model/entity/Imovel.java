package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_imovel")
@Builder
public class Imovel {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome_propriedade;

    private String tipo_transacao;

    private Double valor_venda;

    @Column(name = "tipoImovel")
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
    @JoinColumn(name = "id_endereco")
    private Endereco id_endereco;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario id_usuario;


}
