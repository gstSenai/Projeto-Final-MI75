package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.service.UsuarioService;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private UsuarioService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario create(@RequestBody Usuario usuario) {
        return service.createUser(usuario);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<UsuarioGetResponseDTO> findAll(
            @PageableDefault(sort = "nome",
                            direction = Sort.Direction.DESC)
                            Pageable pageable) {
        Page<Usuario> usuario = service.findAll(pageable);
        return usuario.map(Usuario::convert2);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO findById(@PathVariable Integer id) {
        Usuario usuario = service.findById(id);
        return usuario.convert2();
    }

    @GetMapping("/getByNome/{nome}")
    @ResponseStatus(HttpStatus.OK)
    public Usuario getByNome(@PathVariable String nome) {
        return service.getByNomeUsuario(nome);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioGetResponseDTO update(@RequestBody Usuario usuario, @PathVariable Integer id) {
        Usuario usuario2 = service.updateUser(usuario, id);
        return usuario2.convert2();
    }

}
