package weg.projetofinal.Imobiliaria.service;

import jakarta.persistence.criteria.JoinType;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;
import weg.projetofinal.Imobiliaria.service.specification.ImovelSpecification;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ImovelService {

    private final S3Service s3Service;
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

    public List<Imovel> filtroImovel(String tipo_imovel, Double valor_min, Double valor_max){
        Specification<Imovel> imovelSpecification =
                Specification.where(ImovelSpecification.hasTipo(tipo_imovel))
                        .and(ImovelSpecification.hasPrecoMinimo(valor_min))
                        .and(ImovelSpecification.hasPrecoMaximo(valor_max));
        return repository.findAll(imovelSpecification);

    }

    public List<Imovel> filtroImovel2(String tipo_imovel, Double valor_min, Double valor_max,
                                     Integer numero_quartos, Integer numero_banheiros, Integer numero_vagas) {
        Specification<Imovel> imovelSpecification = Specification.where(ImovelSpecification.hasTipo(tipo_imovel))
                .and(ImovelSpecification.hasPrecoMinimo(valor_min))
                .and(ImovelSpecification.hasPrecoMaximo(valor_max));

        imovelSpecification = imovelSpecification.and((root, query, criteriaBuilder) -> {
            root.join("caracteristicas", JoinType.LEFT);

            if (numero_quartos != null) {
                return criteriaBuilder.equal(root.get("caracteristicas").get("numero_quartos"), numero_quartos);
            }
            return criteriaBuilder.conjunction();
        });

        imovelSpecification = imovelSpecification.and((root, query, criteriaBuilder) -> {
            root.join("caracteristicas", JoinType.LEFT);

            if (numero_banheiros != null) {
                return criteriaBuilder.equal(root.get("caracteristicas").get("numero_banheiros"), numero_banheiros);
            }
            return criteriaBuilder.conjunction();
        });

        imovelSpecification = imovelSpecification.and((root, query, criteriaBuilder) -> {
            root.join("caracteristicas", JoinType.LEFT);

            if (numero_vagas != null) {
                return criteriaBuilder.equal(root.get("caracteristicas").get("numero_vagas"), numero_vagas);
            }
            return criteriaBuilder.conjunction();
        });

        return repository.findAll(imovelSpecification);
    }


    public Imovel updateImovel(Imovel imovel, Integer id) {

        Imovel imovelExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imóvel não encontrado com ID: " + id));

        BeanUtils.copyProperties(imovel, imovelExistente, "id", "id_endereco",
                "id_caracteristicasImovel", "id_proprietario");

        if (imovel.getId_endereco() != null) {
            imovelExistente.setId_endereco(imovel.getId_endereco());
        }

        if (imovel.getId_caracteristicasImovel() != null) {
            imovelExistente.setId_caracteristicasImovel(imovel.getId_caracteristicasImovel());
        }

        if(imovel.getProprietario() != null) {
            imovelExistente.setProprietario(imovel.getProprietario());
        }

        return repository.save(imovelExistente);
    }


}
