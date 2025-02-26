package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.repository.EnderecoRepository;

@Service
@AllArgsConstructor
public class EnderecoService {

    private EnderecoRepository enderecoRepository;


    public Endereco create(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public Page<Endereco> getAll(Pageable pageable) {
        return enderecoRepository.findAll(pageable);
    }

    public Endereco getById(Integer id) {
        return enderecoRepository.findById(id).get();
    }

    public Endereco update(Integer id, Endereco endereco) {
        endereco.setId(id);
        return enderecoRepository.save(endereco);
    }

    public void delete(Integer id) {
        enderecoRepository.deleteById(id);
    }
}
