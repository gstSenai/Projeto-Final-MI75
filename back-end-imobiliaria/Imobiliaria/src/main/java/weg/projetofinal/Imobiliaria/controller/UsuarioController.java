package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.service.UsuarioService;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UsuarioController {

    private UsuarioService service;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario create(@RequestBody Usuario usuario) {
        return service.createUser(usuario);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<Usuario> findAll(
            @PageableDefault(sort = "nome",
                            direction = Sort.Direction.DESC)
                            Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Usuario findById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Usuario update(@RequestBody Usuario usuario, @PathVariable Integer id) {
        return service.updateUser(usuario, id);
    }

}
