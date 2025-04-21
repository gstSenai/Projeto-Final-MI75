package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;
import weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento;

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
    @Mapping(target = "status", expression = "java(dto.status() != null ? dto.status() : weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento.PENDENTE)")
    Agendamento agendamentoPostRequestDtoToAgendamento(AgendamentoPostRequestDTO dto);
}