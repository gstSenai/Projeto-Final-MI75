package weg.projetofinal.Imobiliaria.model.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_fotos_imovel")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Imagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_foto;

    @Column(nullable = false)
    private String caminho_foto;

    @ManyToOne
    @JoinColumn(name = "id_imovel")
    private Imovel id_imovel;
}
