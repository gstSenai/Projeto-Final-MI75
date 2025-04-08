package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Proprietario;

@Mapper
public interface ProprietarioMapper {

    ProprietarioMapper INSTANCE = Mappers.getMapper(ProprietarioMapper.class);

    @Mapping(target = "enderecoProprietarioDTO", source = "enderecoProprietario")
    @Mapping(target = "imovelProprietarioResponseDTO", source = "imoveis")
    ProprietarioGetResponseDTO proprietarioToProprietarioGetResponseDTO(Proprietario proprietario);

    Proprietario proprietarioPostRequestDTOToProprietario(ProprietarioPostRequestDTO proprietarioPostRequestDTO);

    @Mapping(target = "enderecoProprietario.id", source = "enderecoProprietario.id")
    Proprietario proprietarioPutRequestDTOToProprietario(ProprietarioPutRequestDTO proprietarioPutRequestDTO);
}
