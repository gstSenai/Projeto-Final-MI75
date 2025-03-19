package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.ImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImovelPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.mapper.ImovelMapper;
import weg.projetofinal.Imobiliaria.service.ImovelService;


@RestController
@RequestMapping("/imovel")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ImovelController {

    private final ImovelService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ImovelGetResponseDTO create(@RequestBody ImovelPostRequestDTO imovelPostDTO) {
        try {
            Imovel imovel = ImovelMapper.INSTANCE.imovelPostRequestDTOToImovel(imovelPostDTO);
            Imovel savedImovel = service.createImovel(imovel);
            return ImovelMapper.INSTANCE.imovelToImovelGetResponseDTO(savedImovel);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar imóvel: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<ImovelGetResponseDTO> list(Pageable pageable) {
        Page<Imovel> imoveisPage = service.getAllImovel(pageable);
        return imoveisPage.map(ImovelMapper.INSTANCE::imovelToImovelGetResponseDTO);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ImovelGetResponseDTO getById(@PathVariable Integer id) {
        Imovel imovel = service.getByIdImovel(id);
        return ImovelMapper.INSTANCE.imovelToImovelGetResponseDTO(imovel);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteImovel(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ImovelGetResponseDTO update(@PathVariable Integer id, @RequestBody ImovelPostRequestDTO imovelPostDTO) {
        try {
            Imovel imovel = ImovelMapper.INSTANCE.imovelPostRequestDTOToImovel(imovelPostDTO);
            Imovel updatedImovel = service.updateImovel(imovel, id);
            return ImovelMapper.INSTANCE.imovelToImovelGetResponseDTO(updatedImovel);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar imóvel: " + e.getMessage());
        }
    }
}
