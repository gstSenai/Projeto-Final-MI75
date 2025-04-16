package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {

    AgendamentoMapper INSTANCE = Mappers.getMapper(AgendamentoMapper.class);

    @Mapping(source = "imovel", target = "imovelDTO")
    @Mapping(source = "usuario", target = "usuarioDTO")
    @Mapping(source = "corretor", target = "corretorDTO")
    AgendamentoGetResponseDTO agendamentoToAgendamentoGetResponseDTO(Agendamento agendamento);

    @Mapping(source = "id_Imovel", target = "imovel")
    @Mapping(source = "id_Usuario", target = "usuario")
    @Mapping(source = "id_Corretor", target = "corretor")
    Agendamento agendamentoPostRequestDtoToAgendamento(AgendamentoPostRequestDTO agendamentoPostRequestDTO);
}
