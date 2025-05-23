package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

public interface ImovelRepository extends JpaRepository<Imovel, Integer>,
                                          JpaSpecificationExecutor<Imovel> {
}
