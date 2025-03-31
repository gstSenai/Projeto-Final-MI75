package weg.projetofinal.Imobiliaria.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;
import weg.projetofinal.Imobiliaria.repository.AgendamentoRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
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


    public void remover(int id) {
        agendamentoRepository.deleteById(id);
    }



}
