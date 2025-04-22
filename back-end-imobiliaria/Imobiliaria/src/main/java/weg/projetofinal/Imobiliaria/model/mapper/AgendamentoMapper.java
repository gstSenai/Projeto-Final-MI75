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
    AgendamentoGetResponseDTO agendamentoToAgendamentoGetResponseDTO(Agendamento agendamento);

    default Agendamento agendamentoPostRequestDtoToAgendamento(AgendamentoPostRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Agendamento agendamento = new Agendamento();
        agendamento.setData(dto.data());
        agendamento.setHorario(dto.horario());
        agendamento.setStatus(dto.status() != null ? dto.status() : StatusAgendamento.PENDENTE);

        // Map Imovel
        if (dto.idImovel() != null) {
            Imovel imovel = new Imovel();
            imovel.setId(dto.idImovel());
            agendamento.setImovel(imovel);
        }

        // Map Usuario
        if (dto.idUsuario() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(dto.idUsuario());
            agendamento.setUsuario(usuario);
        }

        // Map Corretor
        if (dto.idCorretor() != null) {
            Usuario corretor = new Usuario();
            corretor.setId(dto.idCorretor());
            agendamento.setCorretor(corretor);
        }

        return agendamento;
    }

    @Named("mapImovel")
    default Imovel mapImovel(Integer idImovel) {
        if (idImovel == null) {
            return null;
        }
        Imovel imovel = new Imovel();
        imovel.setId(idImovel);
        return imovel;
    }

    @Named("mapUsuario")
    default Usuario mapUsuario(Integer idUsuario) {
        if (idUsuario == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(idUsuario);
        return usuario;
    }

    @Named("mapCorretor")
    default Usuario mapCorretor(Integer idCorretor) {
        if (idCorretor == null) {
            return null;
        }
        Usuario corretor = new Usuario();
        corretor.setId(idCorretor);
        return corretor;
    }
}