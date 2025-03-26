package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.AgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.AgendamentoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;
import weg.projetofinal.Imobiliaria.model.mapper.AgendamentoMapper;
import weg.projetofinal.Imobiliaria.service.AgendamentoService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/agendamento")
@AllArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public AgendamentoGetResponseDTO create(@RequestBody AgendamentoPostRequestDTO agendamento) {
        Agendamento agendamento1 = AgendamentoMapper.INSTANCE.agendamentoPostRequestDtoToAgendamento(agendamento);
        Agendamento agendamento2 = agendamentoService.save(agendamento1);
        return AgendamentoMapper.INSTANCE.agendamentoToAgendamentoGetResponseDTO(agendamento2);
    }


    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public List<AgendamentoGetResponseDTO> getAll() {
        List<Agendamento> agendamentos = agendamentoService.findAll();
        return agendamentos.stream().map(AgendamentoMapper.INSTANCE::agendamentoToAgendamentoGetResponseDTO).collect(Collectors.toList());
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AgendamentoGetResponseDTO getById(@PathVariable Integer id) {
        Agendamento agendamento = agendamentoService.procurarPorId(id);
        return AgendamentoMapper.INSTANCE.agendamentoToAgendamentoGetResponseDTO(agendamento);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        agendamentoService.remover(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AgendamentoGetResponseDTO update(@PathVariable Integer id, @RequestBody AgendamentoPostRequestDTO agendamentoDTO) {
        Agendamento agendamentoAtualizado = agendamentoService.atualizar(id, agendamentoDTO);
        return AgendamentoMapper.INSTANCE.agendamentoToAgendamentoGetResponseDTO(agendamentoAtualizado);
    }
}
