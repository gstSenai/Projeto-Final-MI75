package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.service.EnderecoService;

import java.util.List;

@RestController
@RequestMapping("/endereco")
@AllArgsConstructor
public class EnderecoController {

    private EnderecoService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Endereco post(@RequestBody Endereco endereco) {
        return service.create(endereco);
    }

    @GetMapping("/buscarEnderecos")
    @ResponseStatus(HttpStatus.OK)
    public Page<Endereco> buscarEnderecos(@PageableDefault(
                                        sort = "uf",
                                        direction = Sort.Direction.ASC)
                                        Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("/bucarEndereco/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Endereco buscarEndereco(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PutMapping("/atualizarEndereco/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Endereco atualizarEndereco(@PathVariable Integer id, @RequestBody Endereco endereco) {
        return service.update(id, endereco);
    }

    @DeleteMapping("/deletarEndereco/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarEndereco(@PathVariable Integer id) {
        service.delete(id);
    }

}
