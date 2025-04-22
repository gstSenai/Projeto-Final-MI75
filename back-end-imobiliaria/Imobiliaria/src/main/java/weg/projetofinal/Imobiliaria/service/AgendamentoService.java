package weg.projetofinal.Imobiliaria.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;
import weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento;
import weg.projetofinal.Imobiliaria.repository.AgendamentoRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }


    public List<Agendamento> findByImovelAndDate(Integer idImovel, LocalDate data) {
        return agendamentoRepository.findByImovelIdAndData(idImovel, data);
    }

    public Agendamento procurarPorId(int id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() ->
                new EntityNotFoundException("Agendamento não encontrado com ID: " + id));
    }



    public Agendamento save(Agendamento agendamento) {
        if (agendamento.getUsuario().getId().equals(agendamento.getCorretor().getId())) {
            throw new IllegalArgumentException("O usuário não pode ser o próprio corretor.");
        }

        boolean agendamentoExists = agendamentoRepository.existsByImovelIdAndDataAndHorario(
            agendamento.getImovel().getId(),
            agendamento.getData(),
            agendamento.getHorario()
        );

        if (agendamentoExists) {
            throw new IllegalArgumentException("Já existe um agendamento para este imóvel no mesmo dia e horário.");
        }

        return agendamentoRepository.save(agendamento);
    }


    public Agendamento atualizar(Integer id, Agendamento agendamento) {
        Agendamento agendamentoSalvo = procurarPorId(id);

        if (agendamento.getUsuario().getId().equals(agendamento.getCorretor().getId())) {
            throw new IllegalArgumentException("O usuário não pode ser o próprio corretor.");
        }

        boolean agendamentoExists = agendamentoRepository.existsByImovelIdAndDataAndHorario(
                agendamento.getImovel().getId(),
                agendamento.getData(),
                agendamento.getHorario()
        );

        if (agendamentoExists) {
            throw new IllegalArgumentException("Já existe um agendamento para este imóvel no mesmo dia e horário.");
        }

        agendamentoSalvo.setData(agendamento.getData());
        agendamentoSalvo.setHorario(agendamento.getHorario());
        agendamentoSalvo.setImovel(agendamento.getImovel());
        agendamentoSalvo.setUsuario(agendamento.getUsuario());
        agendamentoSalvo.setCorretor(agendamento.getCorretor());

        return agendamentoRepository.save(agendamentoSalvo);
    }


    public Page<Agendamento> findByCorretor(String username, Pageable pageable) {
        return agendamentoRepository.findByCorretorUsername(username, pageable);
    }

    public Agendamento confirmarAgendamento(Integer id) {
        Agendamento agendamento = procurarPorId(id);
        agendamento.setStatus(StatusAgendamento.CONFIRMADO);
        return agendamentoRepository.save(agendamento);
    }

    public void remover(int id) {
        agendamentoRepository.deleteById(id);
    }

    public List<Agendamento> findByCorretorAndDate(String username, LocalDate date) {
        return agendamentoRepository.findByCorretorUsernameAndData(username, date);
    }


    public List<Agendamento> findByUsuarioAndDate(String username, LocalDate date) {
        return agendamentoRepository.findByUsuarioUsernameAndData(username, date);
    }


    public Agendamento cancelarAgendamento(Integer id) {
        Agendamento agendamento = procurarPorId(id);
        agendamento.setStatus(StatusAgendamento.CANCELADO);
        return agendamentoRepository.save(agendamento);
    }

}
