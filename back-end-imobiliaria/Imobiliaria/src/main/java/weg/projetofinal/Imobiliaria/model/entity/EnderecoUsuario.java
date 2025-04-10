package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tb_endereco_usuario")
@AllArgsConstructor
@NoArgsConstructor
public class EnderecoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String uf;

    @Column(name = "numero_imovel", nullable = false)
    private Integer numeroImovel;

    @Column(name = "numero_apartamento")
    private Integer numeroApartamento;

    @Column(name = "tipo_residencia")
    private String tipoResidencia;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}