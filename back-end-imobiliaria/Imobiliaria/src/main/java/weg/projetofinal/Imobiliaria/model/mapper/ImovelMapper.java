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

    @Mapping(source = "caracteristicaImovel", target = "id_caracteristicasImovel")
    @Mapping(source = "proprietario", target = "proprietarioImovelResponseDTO")
    ImovelGetResponseDTO imovelToImovelGetResponseDTO(Imovel imovel);

    @Mapping(source = "idEndereco", target = "id_endereco")
    @Mapping(source = "id_caracteristicaImovel", target = "caracteristicaImovel")
    @Mapping(source = "id_proprietario", target = "proprietario")
    Imovel imovelPostRequestDTOToImovel(ImovelPostRequestDTO imovelPostRequestDTO);
}
