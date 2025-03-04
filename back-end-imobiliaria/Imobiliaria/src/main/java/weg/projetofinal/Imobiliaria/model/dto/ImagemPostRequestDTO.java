package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

import java.awt.*;

public record ImagemPostRequestDTO(
     Imovel idImovel,
     String caminho_foto
) {

    public Imagem convert() {
        return Imagem.builder().id_imovel(idImovel).caminho_foto(caminho_foto).build();
    }

}
