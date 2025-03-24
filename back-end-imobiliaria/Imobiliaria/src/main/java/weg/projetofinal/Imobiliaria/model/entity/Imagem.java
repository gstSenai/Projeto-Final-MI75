package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_fotos_imovel")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Imagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_foto;

    @Column(nullable = false)
    private String caminho_foto;

    @ManyToOne
    @JoinColumn(name = "idImovel", nullable = false)
    private Imovel imovel;

}