package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicaImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicaImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicasImovelPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;

@Mapper
public interface CaracteristicaImovelMapper {

    CaracteristicaImovelMapper INSTANCE = Mappers.getMapper(CaracteristicaImovelMapper.class);

    CaracteristicaImovelGetResponseDTO caracteristicaImovelToCaracteristicaImovelGetResponseDTO(CaracteristicaImovel caracteristica);

    CaracteristicaImovel caracteristicaImovelPostRequestDTOToCaracteristicaImovel(CaracteristicaImovelPostRequestDTO caracteristicaImovelPostRequestDTO);

    CaracteristicaImovel caracteristicaImovelPutRequestDTOToCaracteristicaImovel(CaracteristicasImovelPutRequestDTO caracteristicaImovelPutRequestDTO);
}

