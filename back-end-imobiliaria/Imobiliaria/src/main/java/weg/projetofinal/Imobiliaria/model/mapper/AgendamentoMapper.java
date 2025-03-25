package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.AgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.AgendamentoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {

    AgendamentoMapper INSTANCE = Mappers.getMapper(AgendamentoMapper.class);

    @Mapping(source = "imovel", target = "imovelDTO")
    @Mapping(source = "usuario", target = "usuarioDTO")
    AgendamentoGetResponseDTO agendamentoToAgendamentoGetResponseDTO(Agendamento agendamento);

    @Mapping(source = "id_Imovel", target = "imovel")
    @Mapping(source = "id_Usuario", target = "usuario")
    Agendamento agendamentoPostRequestDtoToAgendamento(AgendamentoPostRequestDTO agendamentoPostRequestDTO);
}
