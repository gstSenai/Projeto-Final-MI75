package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.model.mapper.UsuarioMapper;
import weg.projetofinal.Imobiliaria.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@AllArgsConstructor
public class UsuarioController {

    private final UsuarioService service;
    private final UsuarioMapper mapper = UsuarioMapper.INSTANCE;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioGetResponseDTO create(@RequestBody @Valid UsuarioPostRequestDTO usuarioDTO) {
        Usuario usuario = service.createUser(mapper.toEntity(usuarioDTO));
        return mapper.toDto(usuario);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<UsuarioGetResponseDTO> findAll(
            @PageableDefault(sort = "nome", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Usuario> usuarios = service.findAll(pageable);
        return usuarios.map(mapper::toDto);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO findById(@PathVariable Integer id) {
        Usuario usuario = service.findById(id);
        return mapper.toDto(usuario);
    }

    @GetMapping("/getByNome/{nome}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO getByNome(@PathVariable String nome) {
        Usuario usuario = service.getByNomeUsuario(nome);
        return mapper.toDto(usuario);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO update(@RequestBody @Valid UsuarioPostRequestDTO usuarioDTO, @PathVariable Integer id) {
        Usuario usuarioAtualizado = service.updateUser(mapper.toEntity(usuarioDTO), id);
        return mapper.toDto(usuarioAtualizado);
    }
}
