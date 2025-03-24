package weg.projetofinal.Imobiliaria.service.specification;

import org.springframework.data.jpa.domain.Specification;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

public class ImovelSpecification {

    public static Specification<Imovel> hasTipo(String tipo_imovel){
        return (root,
                query,
                criteriaBuilder) -> {
            if(tipo_imovel == null || tipo_imovel.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("tipo_imovel"), tipo_imovel);
        };
    }

    public static Specification<Imovel> hasPrecoMaximo(Double valor_venda){
        return (root,
                query,
                criteriaBuilder) -> {
            if(valor_venda == null){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("valor_venda"), valor_venda);
        };
    }

    public static Specification<Imovel> hasPrecoMinimo(Double valor_venda){
        return (root, query, criteriaBuilder) -> {
            if(valor_venda == null){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("valor_venda"), valor_venda);
        };
    }
}
