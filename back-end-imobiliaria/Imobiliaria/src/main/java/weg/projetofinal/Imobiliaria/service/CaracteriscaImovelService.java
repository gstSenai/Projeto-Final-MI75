package weg.projetofinal.Imobiliaria.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.mapper.CaracteristicaImovelMapper;
import weg.projetofinal.Imobiliaria.repository.CaracteristicaImovelRepository;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;

@Service
@AllArgsConstructor
public class CaracteriscaImovelService {

    private CaracteristicaImovelRepository repository;

    private ImovelRepository imovelRepository;

    public CaracteristicaImovel createCaracteristica(CaracteristicaImovelPostRequestDTO dto) {
        Imovel imovel = imovelRepository.findById(dto.idImovel())
                .orElseThrow(() -> new RuntimeException("Imóvel não encontrado com ID: " + dto.idImovel()));
        CaracteristicaImovel caracteristica = CaracteristicaImovelMapper.INSTANCE
                .caracteristicaImovelPostRequestDTOToCaracteristicaImovel(dto);
        caracteristica.setImovel(imovel);
        return repository.save(caracteristica);
    }

    public Page<CaracteristicaImovel> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public CaracteristicaImovel getById(Integer id) {
        return repository.findById(id).get();
    }
}
