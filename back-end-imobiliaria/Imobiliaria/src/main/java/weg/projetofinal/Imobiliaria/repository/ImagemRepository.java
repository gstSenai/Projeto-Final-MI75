package weg.projetofinal.Imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

import java.util.List;

public interface ImagemRepository extends JpaRepository<Imagem, Integer> {
    List<Imagem> findByImovelId(Integer idImovel);


}
