package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.ImagemGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPutResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImovelImagemGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

@Mapper(componentModel = "spring")
public interface ImagemMapper {

    ImagemMapper INSTANCE = Mappers.getMapper(ImagemMapper.class);

    @Mapping(source = "id_foto", target = "id")
    @Mapping(source = "caminho_foto", target = "caminho_foto")
    @Mapping(source = "imovel.id", target = "idImovel")
    ImagemGetResponseDTO imagemToImagemGetResponseDTO(Imagem imagem);

    @Mapping(source = "idImovel", target = "imovel.id")
    Imagem imagemPutResponseDTOToImagem(ImagemPutResponseDTO imagemDTO);

    @Mapping(source = "idImovel", target = "imovel.id")
    Imagem imagemPostRequestDTOToImagem(ImagemPostRequestDTO imagemDTO);
}
