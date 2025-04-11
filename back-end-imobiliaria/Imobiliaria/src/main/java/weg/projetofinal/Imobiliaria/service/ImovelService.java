package weg.projetofinal.Imobiliaria.service;

import jakarta.persistence.criteria.JoinType;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;
import weg.projetofinal.Imobiliaria.service.specification.ImovelSpecification;
import weg.projetofinal.Imobiliaria.service.specification.UsuarioSpecification;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImovelService {

    private ImovelRepository repository;

    private UsuarioService usuarioService;

    public Imovel createImovel(Imovel imovel) {
        Usuario corretorExistente = usuarioService
                .findById(imovel.getId_usuario().getId());


        if (!corretorExistente.getTipo_conta().equalsIgnoreCase("Corretor")) {
            throw new RuntimeException("Usuário não é um corretor autorizado!");
        }

        imovel.setId_usuario(corretorExistente);

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

    public List<Imovel> filtroImovel(String tipo_imovel, Double valor_min, Double valor_max){
        Specification<Imovel> imovelSpecification =
                Specification.where(ImovelSpecification.hasTipo(tipo_imovel))
                        .and(ImovelSpecification.hasPrecoMinimo(valor_min))
                        .and(ImovelSpecification.hasPrecoMaximo(valor_max));
        return repository.findAll(imovelSpecification);

    }


    public Imovel updateImovel(Imovel imovel, Integer id) {

        Imovel imovelExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imóvel não encontrado com ID: " + id));

        BeanUtils.copyProperties(imovel, imovelExistente, "id", "id_endereco",
                "id_caracteristicasImovel", "id_proprietario", "id_usuario");

        if (imovel.getId_endereco() != null) {
            imovelExistente.setId_endereco(imovel.getId_endereco());
        }

        if (imovel.getId_caracteristicasImovel() != null) {
            imovelExistente.setId_caracteristicasImovel(imovel.getId_caracteristicasImovel());
        }

        if(imovel.getId_proprietario() != null) {
            imovelExistente.setId_proprietario(imovel.getId_proprietario());
        }

        if(imovel.getId_usuario() != null) {
            imovelExistente.setId_usuario(imovel.getId_usuario());
        }

        return repository.save(imovelExistente);
    }


}
