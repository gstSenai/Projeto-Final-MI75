package weg.projetofinal.Imobiliaria.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario.EnderecoProprietarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario.EnderecoProprietarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoProprietario;
import weg.projetofinal.Imobiliaria.model.mapper.EnderecoProprietarioMapper;
import weg.projetofinal.Imobiliaria.service.EnderecoProprietarioService;

@RestController
@RequestMapping("/enderecoProprietario")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EnderecoProprietarioController {

    private final EnderecoProprietarioService service;
    private final EnderecoProprietarioMapper mapper = EnderecoProprietarioMapper.INSTANCE;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public EnderecoProprietarioGetResponseDTO create(@RequestBody EnderecoProprietarioPostRequestDTO dto) {
        EnderecoProprietario endereco = mapper.enderecoProprietarioPostRequestDTOToEnderecoProprietario(dto);
        endereco = service.createEnderecoProprietario(endereco);
        return mapper.enderecoProprietarioToEnderecoProprietarioGetResponseDTO(endereco);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoProprietarioGetResponseDTO getById(@PathVariable Integer id) {
        EnderecoProprietario endereco = service.findById(id);
        return mapper.enderecoProprietarioToEnderecoProprietarioGetResponseDTO(endereco);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<EnderecoProprietarioGetResponseDTO> getAll(@PageableDefault Pageable pageable) {
        return service.getAll(pageable)
                .map(mapper::enderecoProprietarioToEnderecoProprietarioGetResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoProprietarioGetResponseDTO update(@RequestBody EnderecoProprietarioPostRequestDTO dto, @PathVariable Integer id) {
        EnderecoProprietario endereco = mapper.enderecoProprietarioPostRequestDTOToEnderecoProprietario(dto);
        endereco.setId(id);
        endereco = service.updateEnderecoUsuario(endereco, id);
        return mapper.enderecoProprietarioToEnderecoProprietarioGetResponseDTO(endereco);
    }
}