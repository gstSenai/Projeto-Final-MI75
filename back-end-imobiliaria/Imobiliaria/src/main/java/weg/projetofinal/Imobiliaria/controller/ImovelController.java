package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.service.ImovelService;


@RestController
@RequestMapping("/imovel")
@AllArgsConstructor
public class ImovelController {

    private ImovelService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Imovel create(@RequestBody Imovel imovel) {
        return service.createImovel(imovel);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<Imovel> list(Pageable pageable) {
        return service.getAllImovel(pageable);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Imovel getById(@PathVariable Integer id) {
        return service.getByIdImovel(id);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteImovel(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Imovel update(@PathVariable Integer id,@RequestBody Imovel imovel) {
        return service.updateImovel(imovel, id);
    }

}
