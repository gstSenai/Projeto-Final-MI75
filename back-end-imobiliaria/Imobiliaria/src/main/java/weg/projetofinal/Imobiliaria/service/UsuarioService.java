package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoUsuario;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.EnderecoRepository;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;

import java.util.Optional;


@Service
@AllArgsConstructor
public class UsuarioService {

    private UsuarioRepository repository;
    private EnderecoUsuarioService enderecoUsuarioService;

    public Usuario createUser(Usuario usuario, Integer idEnderecoUsuario) {
        EnderecoUsuario enderecoUsuario = enderecoUsuarioService.findById(idEnderecoUsuario);

        if (enderecoUsuario == null) {
            throw new RuntimeException("Endereço não encontrado com ID: " + idEnderecoUsuario);
        }

        usuario.setEnderecoUsuario(enderecoUsuario);
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
        if (id == null) {
            throw new IllegalArgumentException("ID do usuário não pode ser nulo.");
        }

        Usuario usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));


        usuario.setId(id);

        return repository.save(usuario);
    }




    public Usuario getByNomeUsuario(String nome) {
        return repository.findByNome(nome).get();
    }
}
