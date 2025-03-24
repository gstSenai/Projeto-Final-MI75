package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoUsuario;
import weg.projetofinal.Imobiliaria.repository.EnderecoUsuarioRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class EnderecoUsuarioService {

    private final EnderecoUsuarioRepository enderecoUsuarioRepository;

    public EnderecoUsuario createEnderecoUsuario(EnderecoUsuario enderecoUsuario) {
        return enderecoUsuarioRepository.save(enderecoUsuario);
    }

    public EnderecoUsuario findById(Integer id) {
        return enderecoUsuarioRepository.findById(id).get();
    }

    public Page<EnderecoUsuario> getAll(Pageable pageable) {
        return enderecoUsuarioRepository.findAll(pageable);
    }

    public void delete(Integer id) {
        enderecoUsuarioRepository.deleteById(id);
    }

    public EnderecoUsuario updateEnderecoUsuario(EnderecoUsuario enderecoUsuario, Integer id) {
        enderecoUsuario.setId(id);
        return enderecoUsuarioRepository.save(enderecoUsuario);
    }
}
