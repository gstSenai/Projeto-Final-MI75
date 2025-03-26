package weg.projetofinal.Imobiliaria.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.dto.AgendamentoPostRequestDTO;
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
        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizar(Integer id, AgendamentoPostRequestDTO agendamentoDTO) {
        Agendamento agendamentoSalvo = procurarPorId(id);

        agendamentoSalvo.setData(agendamentoDTO.data());
        agendamentoSalvo.setImovel(agendamentoDTO.id_Imovel());
        agendamentoSalvo.setUsuario(agendamentoDTO.id_Usuario());

        return agendamentoRepository.save(agendamentoSalvo);
    }


    public void remover(int id) {
        agendamentoRepository.deleteById(id);
    }

}
