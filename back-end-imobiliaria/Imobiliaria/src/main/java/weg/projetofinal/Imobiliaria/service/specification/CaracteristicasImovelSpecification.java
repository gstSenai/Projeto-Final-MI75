package weg.projetofinal.Imobiliaria.service.specification;

import org.springframework.data.jpa.domain.Specification;
import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;

public class CaracteristicasImovelSpecification {

    public static Specification<CaracteristicaImovel> hasNumero_Quartos(Integer numero_quartos) {
        return (root,
                query,
                criteriaBuilder) -> {
            if(numero_quartos == null){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("numero_quartos"), numero_quartos);
        };
    }

    public static Specification<CaracteristicaImovel> hasNumero_Banheiros(Integer numero_banheiros) {
        return (root,
                query,
                criteriaBuilder) -> {
            if(numero_banheiros == null){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("numero_banheiros"), numero_banheiros);
        };
    }

    public static Specification<CaracteristicaImovel> hasNumero_Vagas(Integer numero_vagas) {
        return (root,
                query,
                criteriaBuilder) -> {
            if(numero_vagas == null){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("numero_vagas"), numero_vagas);
        };
    }
}
