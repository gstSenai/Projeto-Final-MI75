package weg.projetofinal.Imobiliaria.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @JoinColumn(name = "id_endereco", nullable = false)
    @JsonManagedReference
    private Endereco id_endereco;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonManagedReference
    private Usuario id_usuario;


}
