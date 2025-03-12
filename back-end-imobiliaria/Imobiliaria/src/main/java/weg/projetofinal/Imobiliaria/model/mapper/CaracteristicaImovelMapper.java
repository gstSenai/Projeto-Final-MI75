package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;

@Mapper
public interface CaracteristicaImovelMapper {

    CaracteristicaImovelMapper INSTANCE = Mappers.getMapper(CaracteristicaImovelMapper.class);

    @Mapping(source = "imovel.id", target = "idImovel")
    CaracteristicaImovelGetResponseDTO caracteristicaImovelToCaracteristicaImovelGetResponseDTO(CaracteristicaImovel caracteristica);

    @Mapping(source = "idImovel", target = "imovel.id")
    CaracteristicaImovel caracteristicaImovelPostRequestDTOToCaracteristicaImovel(CaracteristicaImovelPostRequestDTO caracteristicaImovelPostRequestDTO);
}

