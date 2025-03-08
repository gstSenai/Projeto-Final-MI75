package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.service.EnderecoService;


@RestController
@RequestMapping("/endereco")
@CrossOrigin(origins = "http://localhost:3000")
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
    public Page<EnderecoGetResponseDTO> buscarEnderecos(@PageableDefault(
                                        sort = "uf",
                                        direction = Sort.Direction.ASC)
                                        Pageable pageable) {
        Page<Endereco> enderecos = service.getAll(pageable);
        return enderecos.map(Endereco::convert2);
    }

    @GetMapping("/bucarEndereco/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoGetResponseDTO buscarEndereco(@PathVariable Integer id) {
        Endereco endereco = service.getById(id);
        return endereco.convert2();
    }

    @PutMapping("/atualizarEndereco/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoGetResponseDTO atualizarEndereco(@PathVariable Integer id, @RequestBody Endereco endereco) {
        Endereco endereco1 = service.update(id, endereco);
        return endereco1.convert2();
    }

    @DeleteMapping("/deletarEndereco/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarEndereco(@PathVariable Integer id) {
        service.delete(id);
    }

}
