package weg.projetofinal.Imobiliaria.security.model.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "tb_roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Getter
    @Enumerated(EnumType.STRING)
    @Column
    private ERole name;

}
