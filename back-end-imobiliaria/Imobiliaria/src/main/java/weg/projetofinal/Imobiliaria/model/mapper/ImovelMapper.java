package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

@Mapper
public interface ImovelMapper {

    ImovelMapper INSTANCE = Mappers.getMapper(ImovelMapper.class);

    @Mapping(source = "id_caracteristicasImovel", target = "id_caracteristicasImovel")
    @Mapping(source = "id_proprietario", target = "id_proprietario")
    @Mapping(source = "id_usuario", target = "id_usuario")
    ImovelGetResponseDTO imovelToImovelGetResponseDTO(Imovel imovel);

    @Mapping(source = "id_endereco", target = "id_endereco")
    @Mapping(source = "id_caracteristicasImovel", target = "id_caracteristicasImovel")
    @Mapping(source = "id_proprietario", target = "id_proprietario")
    @Mapping(source = "id_usuario", target = "id_usuario")
    Imovel imovelPostRequestDTOToImovel(ImovelPostRequestDTO imovelPostRequestDTO);
}
