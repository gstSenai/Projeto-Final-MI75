package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    boolean existsByImovelIdAndDataAndHorario(Integer imovelId, LocalDate data, LocalTime horario);
}
