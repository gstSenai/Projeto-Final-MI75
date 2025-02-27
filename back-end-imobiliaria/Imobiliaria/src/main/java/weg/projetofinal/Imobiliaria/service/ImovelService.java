package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ImovelService {

    private ImovelRepository repository;


    public Imovel createImovel(Imovel imovel) {
        return repository.save(imovel);
    }

    public Page<Imovel> getAllImovel(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Imovel getByIdImovel(Integer id) {
        return repository.findById(id).get();
    }

    public void deleteImovel(Integer id) {
        if(repository.existsById(id)){
            repository.deleteById(id);
        }
        throw new NoSuchElementException();
    }

    public Imovel updateImovel(Imovel imovel, Integer id) {
        if(repository.existsById(id)) {
            imovel.setId(id);
            return repository.save(imovel);
        }
        throw new NoSuchElementException();
    }
}
