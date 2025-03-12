package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.mapper.CaracteristicaImovelMapper;
import weg.projetofinal.Imobiliaria.service.CaracteriscaImovelService;

@RestController
@RequestMapping("/caracteristicaImovel")
@AllArgsConstructor
public class CaracteristicaImovelController {

    private CaracteriscaImovelService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public CaracteristicaImovelGetResponseDTO create(@RequestBody @Valid CaracteristicaImovelPostRequestDTO caracteristicaImovelDTO) {
        CaracteristicaImovel caracteristicaImovelSaved = service.createCaracteristica(caracteristicaImovelDTO);
        return CaracteristicaImovelMapper.INSTANCE.caracteristicaImovelToCaracteristicaImovelGetResponseDTO(caracteristicaImovelSaved);
    }
}
