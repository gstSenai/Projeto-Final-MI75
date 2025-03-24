package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;

@Repository
public interface CaracteristicaImovelRepository extends JpaRepository<CaracteristicaImovel, Integer> {
}
