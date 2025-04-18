package weg.projetofinal.Imobiliaria.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioCadastroPostDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.model.mapper.UsuarioMapper;
import weg.projetofinal.Imobiliaria.service.UsuarioService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:3000")
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
        Usuario usuarioCriado = service.createUser(usuarioDTO, imagem);
        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuarioCriado);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<UsuarioGetResponseDTO> findAll(
            @PageableDefault(sort = "username", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Usuario> usuarios = service.findAll(pageable);
        return usuarios.map(UsuarioMapper.INSTANCE::usuarioToUsuarioGetResponseDTO);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO findById(@PathVariable Integer id) {
        Usuario usuario = service.findById(id);
        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuario);
    }

    @GetMapping("/filtroUsuario")
    @ResponseStatus(HttpStatus.OK)
    public List<UsuarioGetResponseDTO> buscarUsuario(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String sobrenome,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Boolean ativo,
            @RequestParam(required = false) String tipoConta) {

        List<Usuario> usuarios = service.buscarUsuario(nome, sobrenome, email, ativo, tipoConta);
        return usuarios.stream().map(UsuarioMapper.INSTANCE::usuarioToUsuarioGetResponseDTO).toList();
    }



    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO update(
            @RequestPart(name = "usuario") String usuarioJson,
            @RequestPart(name = "imagem", required = false) MultipartFile imagem,
            @PathVariable Integer id) throws IOException {

        UsuarioPutRequestDTO usuarioDTO = objectMapper.readValue(usuarioJson, UsuarioPutRequestDTO.class);
        Usuario usuario = UsuarioMapper.INSTANCE.usuarioPutRequestDTOToUsuario(usuarioDTO);
        Usuario usuarioAtualizado = service.updateUser(usuario, id, imagem);
        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuarioAtualizado);
    }

    @GetMapping("/corretores")
    public List<UsuarioGetResponseDTO> listarCorretores() {
        List<Usuario> usuario = service.listarCorretores();
        return usuario.stream().map(UsuarioMapper.INSTANCE::usuarioToUsuarioGetResponseDTO).toList();
    }


    @GetMapping("/imagem/{nomeArquivo}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<byte[]> imagemUsuario(@PathVariable String nomeArquivo) {
        byte[] imagemBytes = service.downloadImagem(nomeArquivo);
        if (imagemBytes != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imagemBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
