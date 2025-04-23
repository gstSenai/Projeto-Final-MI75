package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;
import weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {

    AgendamentoMapper INSTANCE = Mappers.getMapper(AgendamentoMapper.class);

    @Mapping(source = "imovel", target = "imovelDTO")
    @Mapping(source = "usuario", target = "usuarioDTO")
    @Mapping(source = "corretor", target = "corretorDTO")
    @Mapping(source = "status", target = "status")
    AgendamentoGetResponseDTO agendamentoToAgendamentoGetResponseDTO(Agendamento agendamento);

    @Mapping(target = "imovel.id", source = "idImovel")
    @Mapping(target = "usuario.id", source = "idUsuario")
    @Mapping(target = "corretor.id", source = "idCorretor")
    @Mapping(target = "status", expression = "java(dto.status() != null ? dto.status() : weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento.PENDENTE)")
    Agendamento agendamentoPostRequestDtoToAgendamento(AgendamentoPostRequestDTO dto);

}