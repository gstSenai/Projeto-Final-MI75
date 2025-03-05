package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPostRequestDTO;
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
    public Page<Imagem> getAll(@PageableDefault Pageable pageable) {
        return service.getAllImagem(pageable);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Imagem getById(@PathVariable Integer id) {
        return service.getByIdImagem(id);
    }



    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteImagem(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Imagem update(@PathVariable Integer id, @RequestBody Imagem imagem) {
        return service.updateImagem(id,imagem);
    }
}
