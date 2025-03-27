package weg.projetofinal.Imobiliaria.model.dto.agendamento;

import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelAgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioAgendamento2GetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioAgendamentoGetResponseDTO;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoGetResponseDTO(
        Integer id,
        LocalDate data,
        LocalTime horario,
        ImovelAgendamentoGetResponseDTO imovelDTO,
        UsuarioAgendamentoGetResponseDTO usuarioDTO,
        UsuarioAgendamento2GetResponseDTO corretorDTO
) {
}
