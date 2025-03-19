package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

public record ImagemPutResponseDTO(
        Integer idImovel,
        String caminho_foto
) {
    public Imagem convert() {
        Imovel imovel = new Imovel();
        imovel.setId(idImovel);
        return Imagem.builder().imovel(imovel).caminho_foto(caminho_foto).build();
    }
}
