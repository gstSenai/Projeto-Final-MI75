package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelPostResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.repository.CaracteristicaImovelRepository;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;

@Service
@AllArgsConstructor
public class CaracteriscaImovelService {

    private CaracteristicaImovelRepository repository;

    private ImovelRepository imovelRepository;

    public CaracteristicaImovel create(CaracteristicaImovelPostResponseDTO dto) {
        Imovel imovel = imovelRepository.findById(dto.idImovel())
                .orElseThrow(() -> new RuntimeException("Imóvel não encontrado"));
        CaracteristicaImovel caracteristicaImovel = dto.convert(imovel);
        return repository.save(caracteristicaImovel);
    }
}
