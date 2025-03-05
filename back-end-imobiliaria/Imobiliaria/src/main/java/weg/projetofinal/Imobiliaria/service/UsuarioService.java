package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;

import java.util.Optional;


@Service
@AllArgsConstructor
public class UsuarioService {

    private UsuarioRepository repository;

    public Usuario createUser(Usuario usuario) {
        return repository.save(usuario);
    }

    public Page<Usuario> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Usuario findById(Integer id) {
        return repository.findById(id).get();
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public Usuario updateUser(Usuario usuario, Integer id) {
        usuario.setId(id);
        return repository.save(usuario);
    }

    public Usuario getByNomeUsuario(String nome) {
        Optional<Usuario> usuarioOptional = repository.findByNome(nome);
        return usuarioOptional.orElse(null);
    }
}
