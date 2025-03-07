package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.CaracteristicaImovelPostResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.service.CaracteriscaImovelService;

@RestController
@RequestMapping("/caracteristicaImovel")
@AllArgsConstructor
public class CaracteristicaImovelController {

    private CaracteriscaImovelService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public CaracteristicaImovel create(@RequestBody @Valid CaracteristicaImovelPostResponseDTO caracteristicaImovelDTO) {
        return service.create(caracteristicaImovelDTO);
    }
}
