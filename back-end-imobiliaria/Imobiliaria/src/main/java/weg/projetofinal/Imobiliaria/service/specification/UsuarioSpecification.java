package weg.projetofinal.Imobiliaria.service.specification;

import org.springframework.data.jpa.domain.Specification;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

public class UsuarioSpecification {

    public static Specification<Usuario> hasNome(String nome){
        return (root,
                 query,
                 criteriaBuilder) -> {
            if(nome == null || nome.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("nome"), nome);
        };
    }

    public static Specification<Usuario> hasSobrenome(String sobrenome){
        return (root,
                query,
                criteriaBuilder) -> {
            if(sobrenome == null || sobrenome.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("sobrenome"), sobrenome);
        };
    }

    public static Specification<Usuario> hasCpf(String cpf){
        return (root,
                query,
                criteriaBuilder) -> {
            if(cpf == null || cpf.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("cpf"), cpf);
        };
    }

    public static Specification<Usuario> hasTipo_conta(String tipoConta) {
        return (root,
                query,
                criteriaBuilder) -> {
            if (tipoConta == null || tipoConta.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("tipo_conta"), tipoConta);
        };
    }
}
