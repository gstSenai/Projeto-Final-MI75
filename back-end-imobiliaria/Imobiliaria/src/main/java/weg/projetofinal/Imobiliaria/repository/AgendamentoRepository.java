package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import weg.projetofinal.Imobiliaria.model.entity.Agendamento;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
    boolean existsByImovelIdAndDataAndHorario(Integer imovelId, LocalDate data, LocalTime horario);
    Page<Agendamento> findByCorretorUsername(String username, Pageable pageable);
    List<Agendamento> findByCorretorUsernameAndData(String username, LocalDate data);
    List<Agendamento> findByUsuarioUsernameAndData(String username, LocalDate data);
    List<Agendamento> findByImovelIdAndData(Integer imovelId, LocalDate data);

}