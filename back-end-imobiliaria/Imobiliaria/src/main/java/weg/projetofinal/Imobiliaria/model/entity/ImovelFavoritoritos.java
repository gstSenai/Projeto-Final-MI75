package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_favoritos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImovelFavoritoritos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Usuario usuario;

    @OneToOne
    private Imovel imovel;
}
