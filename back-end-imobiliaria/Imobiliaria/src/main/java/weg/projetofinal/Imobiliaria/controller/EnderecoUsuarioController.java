package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoUsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoUsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoUsuario;
import weg.projetofinal.Imobiliaria.model.mapper.EnderecoUsuarioMapper;
import weg.projetofinal.Imobiliaria.service.EnderecoUsuarioService;

@RestController
@RequestMapping("/enderecoUsuario")
@CrossOrigin(origins = "http://localhost:3001")
@AllArgsConstructor
public class EnderecoUsuarioController {

    private EnderecoUsuarioService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public EnderecoUsuarioGetResponseDTO createEnderecoUsuario(@RequestBody EnderecoUsuarioPostRequestDTO enderecoUsuarioPostRequestDTO) {
        EnderecoUsuario enderecoUsuario = EnderecoUsuarioMapper.INSTANCE.enderecoUsuarioPostRequestDTOToEnderecoUsuario(enderecoUsuarioPostRequestDTO);
        EnderecoUsuario enderecoUsuarioUpdated = service.createEnderecoUsuario(enderecoUsuario);
        return EnderecoUsuarioMapper.INSTANCE.enderecoToEnderecoUsuarioGetResponseDTO(enderecoUsuarioUpdated);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoUsuarioGetResponseDTO getById(@PathVariable Integer id) {
        EnderecoUsuario enderecoUsuario = service.findById(id);
        return EnderecoUsuarioMapper.INSTANCE.enderecoToEnderecoUsuarioGetResponseDTO(enderecoUsuario);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<EnderecoUsuarioGetResponseDTO> getAll(@PageableDefault Pageable pageable) {
        return service.getAll(pageable).
                map(EnderecoUsuarioMapper.INSTANCE::enderecoToEnderecoUsuarioGetResponseDTO);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEnderecoUsuario(@PathVariable Integer id) {
        service.delete(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EnderecoUsuarioGetResponseDTO updateEnderecoUsuario(@RequestBody EnderecoUsuarioPostRequestDTO enderecoUsuarioDTO, @PathVariable Integer id) {
        EnderecoUsuario enderecoUsuario = EnderecoUsuarioMapper.INSTANCE.enderecoUsuarioPostRequestDTOToEnderecoUsuario(enderecoUsuarioDTO);

        enderecoUsuario.setId(id);

        EnderecoUsuario enderecoUsuarioUpdated = service.updateEnderecoUsuario(enderecoUsuario, id);

        return EnderecoUsuarioMapper.INSTANCE.enderecoToEnderecoUsuarioGetResponseDTO(enderecoUsuarioUpdated);
    }
}
