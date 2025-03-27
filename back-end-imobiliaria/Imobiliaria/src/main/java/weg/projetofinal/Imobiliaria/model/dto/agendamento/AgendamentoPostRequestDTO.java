package weg.projetofinal.Imobiliaria.model.dto.agendamento;

import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoPostRequestDTO(
        Integer id,
        LocalDate data,
        LocalTime horario,
        Imovel id_Imovel,
        Usuario id_Usuario,
        Usuario id_Corretor
) {
}
