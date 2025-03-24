package weg.projetofinal.Imobiliaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.service.EnderecoService;
import weg.projetofinal.Imobiliaria.model.mapper.EnderecoMapper;

@RestController
@RequestMapping("/endereco")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public EnderecoGetResponseDTO post(@RequestBody EnderecoPostRequestDTO enderecoDTO) {
        Endereco endereco = EnderecoMapper.INSTANCE.enderecoPostRequestDTOToEndereco(enderecoDTO);
        Endereco savedEndereco = service.create(endereco);
        return EnderecoMapper.INSTANCE.enderecoToEnderecoGetResponseDTO(savedEndereco);
    }

    @GetMapping("/buscarEnderecos")
    @ResponseStatus(HttpStatus.OK)
    public Page<EnderecoGetResponseDTO> buscarEnderecos(@PageableDefault(
            sort = "uf",
            direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Endereco> enderecos = service.getAll(pageable);
        return enderecos.map(EnderecoMapper.INSTANCE::enderecoToEnderecoGetResponseDTO);
    }

    @GetMapping("/buscarEndereco/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoGetResponseDTO buscarEndereco(@PathVariable Integer id) {
        Endereco endereco = service.getById(id);
        return EnderecoMapper.INSTANCE.enderecoToEnderecoGetResponseDTO(endereco);
    }

    @PutMapping("/atualizarEndereco/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoGetResponseDTO atualizarEndereco(@PathVariable Integer id, @RequestBody EnderecoPostRequestDTO enderecoDTO) {
        Endereco endereco = EnderecoMapper.INSTANCE.enderecoPostRequestDTOToEndereco(enderecoDTO);
        Endereco updatedEndereco = service.update(id, endereco);
        return EnderecoMapper.INSTANCE.enderecoToEnderecoGetResponseDTO(updatedEndereco);
    }

    @DeleteMapping("/deletarEndereco/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarEndereco(@PathVariable Integer id) {
        service.delete(id);
    }
}
