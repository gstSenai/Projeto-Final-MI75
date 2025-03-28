package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.*;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

@Mapper
public interface ImovelMapper {

    ImovelMapper INSTANCE = Mappers.getMapper(ImovelMapper.class);

    @Mapping(source = "id_caracteristicasImovel", target = "id_caracteristicasImovel")
    ImovelGetResponseDTO imovelToImovelGetResponseDTO(Imovel imovel);

    @Mapping(source = "id_endereco", target = "id_endereco")
    @Mapping(source = "id_caracteristicasImovel", target = "id_caracteristicasImovel")
    Imovel imovelPostRequestDTOToImovel(ImovelPostRequestDTO imovelPostRequestDTO);
}
