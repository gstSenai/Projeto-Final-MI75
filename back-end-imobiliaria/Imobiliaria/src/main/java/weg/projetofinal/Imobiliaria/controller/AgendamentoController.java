package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.agendamento.AgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;
import weg.projetofinal.Imobiliaria.model.mapper.AgendamentoMapper;
import weg.projetofinal.Imobiliaria.service.AgendamentoService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/agendamento")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;
    private final AgendamentoMapper agendamentoMapper;

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
        Agendamento agendamento = AgendamentoMapper.INSTANCE.agendamentoPostRequestDtoToAgendamento(agendamentoDTO);
        Agendamento agendamentoAtualizado = agendamentoService.atualizar(id, agendamento);
        return AgendamentoMapper.INSTANCE.agendamentoToAgendamentoGetResponseDTO(agendamentoAtualizado);
    }

    @GetMapping("/corretor")
    @ResponseStatus(HttpStatus.OK)
    public Page<AgendamentoGetResponseDTO> getByCorretor(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Page<Agendamento> agendamentos = agendamentoService.findByCorretor(username, PageRequest.of(page, size));
        return agendamentos.map(AgendamentoMapper.INSTANCE::agendamentoToAgendamentoGetResponseDTO);
    }


    @GetMapping("/corretor/data/{data}")
    @ResponseStatus(HttpStatus.OK)
    public List<AgendamentoGetResponseDTO> getByCorretorAndDate(
            @PathVariable String data,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        LocalDate localDate = LocalDate.parse(data);
        List<Agendamento> agendamentos = agendamentoService.findByCorretorAndDate(username, localDate);
        return agendamentos.stream()
                .map(AgendamentoMapper.INSTANCE::agendamentoToAgendamentoGetResponseDTO)
                .collect(Collectors.toList());
    }



    @GetMapping("/usuario/data/{data}")
    @ResponseStatus(HttpStatus.OK)
    public List<AgendamentoGetResponseDTO> getByUsuarioAndDate(
            @PathVariable String data,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        LocalDate localDate = LocalDate.parse(data);
        List<Agendamento> agendamentos = agendamentoService.findByUsuarioAndDate(username, localDate);
        return agendamentos.stream()
                .map(AgendamentoMapper.INSTANCE::agendamentoToAgendamentoGetResponseDTO)
                .collect(Collectors.toList());
    }


    @PutMapping("/confirmar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AgendamentoGetResponseDTO confirmarAgendamento(@PathVariable Integer id) {
        Agendamento agendamento = agendamentoService.confirmarAgendamento(id);
        return agendamentoMapper.agendamentoToAgendamentoGetResponseDTO(agendamento);
    }

    @PutMapping("/cancelar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AgendamentoGetResponseDTO cancelarAgendamento(@PathVariable Integer id) {
        Agendamento agendamento = agendamentoService.cancelarAgendamento(id);
        return agendamentoMapper.agendamentoToAgendamentoGetResponseDTO(agendamento);
    }

}
