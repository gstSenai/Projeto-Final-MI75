package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import weg.projetofinal.Imobiliaria.model.dto.ImagemGetResponseDTO;

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
    @JoinColumn(name = "idImovel")
    private Imovel imovel;

    public ImagemGetResponseDTO convert(){
        return new ImagemGetResponseDTO(
                this.id_foto, this.caminho_foto,this.imovel.convert4()
        );
    }

}