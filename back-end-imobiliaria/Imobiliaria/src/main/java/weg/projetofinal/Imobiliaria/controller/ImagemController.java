package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.ImagemGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPutResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.service.ImagemService;

@RestController
@RequestMapping("/imagem")
@AllArgsConstructor
public class ImagemController {

    private ImagemService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Imagem create(@RequestBody @Valid ImagemPostRequestDTO imagemPostDTO) {
        return service.createImagem(imagemPostDTO);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<ImagemGetResponseDTO> getAll(@PageableDefault Pageable pageable) {
        Page<Imagem> enderecos = service.getAllImagem(pageable);
        return enderecos.map(Imagem::convert);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ImagemGetResponseDTO getById(@PathVariable Integer id) {
        Imagem imagem = service.getByIdImagem(id);
        return imagem.convert();
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteImagem(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Imagem update(@PathVariable Integer id, @RequestBody ImagemPutResponseDTO imagemDTO) {
        return service.updateImagem(id,imagemDTO);
    }
}
