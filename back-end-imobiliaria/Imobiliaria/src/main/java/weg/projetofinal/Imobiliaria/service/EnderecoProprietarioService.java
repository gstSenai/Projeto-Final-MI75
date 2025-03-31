package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoProprietario;
import weg.projetofinal.Imobiliaria.repository.EnderecoProprietarioRepository;

@Service
@AllArgsConstructor
public class EnderecoProprietarioService {

    private final EnderecoProprietarioRepository enderecoProprietarioRepository;

    public EnderecoProprietario createEnderecoProprietario(EnderecoProprietario enderecoProprietario) {
        return enderecoProprietarioRepository.save(enderecoProprietario);
    }

    public EnderecoProprietario findById(Integer id) {
        return enderecoProprietarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado com ID: " + id));
    }

    public Page<EnderecoProprietario> getAll(Pageable pageable) {
        return enderecoProprietarioRepository.findAll(pageable);
    }

    public void delete(Integer id) {
        enderecoProprietarioRepository.deleteById(id);
    }

    public EnderecoProprietario updateEnderecoUsuario(EnderecoProprietario enderecoProprietario, Integer id) {
        enderecoProprietario.setId(id);
        return enderecoProprietarioRepository.save(enderecoProprietario);
    }
}
