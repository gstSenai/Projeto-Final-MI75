package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_imoveis")
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

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "id_endereco", nullable = false, unique = true)
    private Endereco id_endereco;

    @OneToMany(mappedBy = "imovel", cascade = CascadeType.REMOVE)
    private List<Imagem> imagem;

    @OneToOne(cascade = CascadeType.REMOVE)
    private CaracteristicaImovel caracteristicaImovel;

    @OneToMany(mappedBy = "imovel")
    private List<Agendamento> agendamentos;

    @ManyToOne
    private Proprietario proprietario;

}
