package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
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
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Imóvel com ID " + id + " não encontrado.");
        }
    }


    public Imovel updateImovel(Imovel imovel, Integer id) {

        Imovel imovelExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imóvel não encontrado com ID: " + id));

        BeanUtils.copyProperties(imovel, imovelExistente, "id", "id_endereco", "caracteristicasImovel");

        if (imovel.getId_endereco() != null) {
            imovelExistente.setId_endereco(imovel.getId_endereco());
        }

        if (imovel.getCaracteristicaImovel() != null) {
            imovelExistente.setCaracteristicaImovel(imovel.getCaracteristicaImovel());
        }

        return repository.save(imovelExistente);
    }
}
