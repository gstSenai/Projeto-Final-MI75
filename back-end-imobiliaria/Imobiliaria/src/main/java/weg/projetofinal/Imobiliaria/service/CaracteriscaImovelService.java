package weg.projetofinal.Imobiliaria.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicaImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.mapper.CaracteristicaImovelMapper;
import weg.projetofinal.Imobiliaria.repository.CaracteristicaImovelRepository;
import weg.projetofinal.Imobiliaria.service.specification.CaracteristicasImovelSpecification;

import java.util.List;

@Service
@AllArgsConstructor
public class CaracteriscaImovelService {

    private CaracteristicaImovelRepository repository;

    public CaracteristicaImovel createCaracteristica(CaracteristicaImovelPostRequestDTO caracteristicaImovelDTO) {
        CaracteristicaImovel caracteristicaImovel = CaracteristicaImovelMapper.INSTANCE.caracteristicaImovelPostRequestDTOToCaracteristicaImovel(caracteristicaImovelDTO);

        return repository.save(caracteristicaImovel);
    }

    public Page<CaracteristicaImovel> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public CaracteristicaImovel getById(Integer id) {
        return repository.findById(id).get();
    }

    public void deleteCaracteristica(Integer id) {
        repository.deleteById(id);
    }

    public CaracteristicaImovel updateCaracteristica(Integer id, CaracteristicaImovel caracteristica) {
        CaracteristicaImovel existingCaracteristica = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Característica não encontrada com ID: " + id));

        caracteristica.setId(id);
        caracteristica.setImovel(existingCaracteristica.getImovel());

        return repository.save(caracteristica);
    }

    public List<CaracteristicaImovel> filtrarPorCaracteristicas(Integer numeroQuartos, Integer numeroBanheiros) {
        Specification<CaracteristicaImovel> spec = Specification.where(null);

        if (numeroQuartos != null) {
            spec = spec.and(CaracteristicasImovelSpecification.hasNumero_Quartos(numeroQuartos));
        }

        if (numeroBanheiros != null) {
            spec = spec.and(CaracteristicasImovelSpecification.hasNumero_Banheiros(numeroBanheiros));
        }

        return repository.findAll(spec);
    }
}
