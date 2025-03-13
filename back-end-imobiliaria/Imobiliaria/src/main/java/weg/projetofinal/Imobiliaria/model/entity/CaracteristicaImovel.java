package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "tb_caracteristicas_imovel")
public class CaracteristicaImovel {
    @Id
    @Column
    private Integer id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @MapsId
    @JoinColumn(name = "id_imovel", referencedColumnName = "id_imovel", foreignKey = @ForeignKey(name = "fk_caracteristica_imovel"))
    private Imovel imovel;
    private Integer numero_quartos;
    private Integer numero_banheiros;
    private Integer numero_suites;
    private Integer numero_vagas;
    private boolean piscina;
    private Integer numero_salas;
}
