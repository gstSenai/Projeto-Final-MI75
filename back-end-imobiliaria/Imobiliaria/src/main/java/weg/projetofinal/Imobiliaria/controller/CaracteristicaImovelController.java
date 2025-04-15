package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicaImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicaImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicasImovelPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.mapper.CaracteristicaImovelMapper;
import weg.projetofinal.Imobiliaria.service.CaracteriscaImovelService;

@RestController
@RequestMapping("/caracteristicaImovel")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class
CaracteristicaImovelController {

    private CaracteriscaImovelService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public CaracteristicaImovelGetResponseDTO create(@RequestBody @Valid CaracteristicaImovelPostRequestDTO caracteristicaImovelDTO) {
        CaracteristicaImovel caracteristicaImovelSaved = service.createCaracteristica(caracteristicaImovelDTO);
        return CaracteristicaImovelMapper.INSTANCE.caracteristicaImovelToCaracteristicaImovelGetResponseDTO(caracteristicaImovelSaved);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<CaracteristicaImovelGetResponseDTO> getAll(@PageableDefault Pageable pageable) {
        Page<CaracteristicaImovel> caracteristicaImovels = service.getAll(pageable);
        return caracteristicaImovels.map(CaracteristicaImovelMapper.INSTANCE::caracteristicaImovelToCaracteristicaImovelGetResponseDTO);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CaracteristicaImovelGetResponseDTO getById(@PathVariable Integer id) {
        CaracteristicaImovel caracteristicaImovel = service.getById(id);
        return CaracteristicaImovelMapper.INSTANCE.caracteristicaImovelToCaracteristicaImovelGetResponseDTO(caracteristicaImovel);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Integer id) {
        service.deleteCaracteristica(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CaracteristicaImovelGetResponseDTO updateCaracterisca(@PathVariable Integer id, @RequestBody CaracteristicasImovelPutRequestDTO caracteristicaImovelDTO) {
        CaracteristicaImovel caracteristicaImovel = CaracteristicaImovelMapper.INSTANCE.caracteristicaImovelPutRequestDTOToCaracteristicaImovel(caracteristicaImovelDTO);
        CaracteristicaImovel updateCaracteriscaImovel = service.updateCaracteristica(id, caracteristicaImovel);
        return CaracteristicaImovelMapper.INSTANCE.caracteristicaImovelToCaracteristicaImovelGetResponseDTO(updateCaracteriscaImovel);
    }
}
