package weg.projetofinal.Imobiliaria.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.model.mapper.UsuarioMapper;
import weg.projetofinal.Imobiliaria.service.UsuarioService;

import java.io.IOException;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService service;
    private final ObjectMapper objectMapper;

    @Autowired
    public UsuarioController(UsuarioService usuarioService, ObjectMapper objectMapper) {
        this.service = usuarioService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioGetResponseDTO create(
            @RequestPart(name = "usuario") String usuarioJson,
            @RequestPart(name = "imagem", required = false) MultipartFile imagem) throws IOException {
        UsuarioPostRequestDTO usuarioDTO = objectMapper.readValue(usuarioJson, UsuarioPostRequestDTO.class);
        UsuarioGetResponseDTO usuarioCriado = service.createUser(usuarioDTO, imagem);
        return usuarioCriado;
    }




    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<UsuarioGetResponseDTO> findAll(
            @PageableDefault(sort = "nome", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Usuario> usuarios = service.findAll(pageable);
        return usuarios.map(UsuarioMapper.INSTANCE::usuarioToUsuarioGetResponseDTO);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO findById(@PathVariable Integer id) {
        Usuario usuario = service.findById(id);
        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuario);
    }

    @GetMapping("/getByNome/{nome}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO getByNome(@PathVariable String nome) {
        Usuario usuario = service.getByNomeUsuario(nome);
        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuario);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO update(@RequestBody @Valid UsuarioPostRequestDTO usuarioDTO, @PathVariable Integer id) {
        Usuario usuario = UsuarioMapper.INSTANCE.usuarioPostRequestDTOToUsuario(usuarioDTO);
        Usuario usuarioUpdate = service.updateUser(usuario,id, usuarioDTO.idEnderecoUsuario());
        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuarioUpdate);
    }
}
