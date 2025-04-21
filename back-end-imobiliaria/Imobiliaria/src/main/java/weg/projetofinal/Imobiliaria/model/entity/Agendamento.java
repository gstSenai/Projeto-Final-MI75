package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_agendamento")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime horario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'PENDENTE'")
    private StatusAgendamento status = StatusAgendamento.PENDENTE;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Usuario corretor;

    @ManyToOne
    private Imovel imovel;

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = StatusAgendamento.PENDENTE;
        }
    }
}