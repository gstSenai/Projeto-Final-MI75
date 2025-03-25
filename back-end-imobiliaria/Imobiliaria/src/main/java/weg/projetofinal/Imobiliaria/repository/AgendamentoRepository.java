package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
}
