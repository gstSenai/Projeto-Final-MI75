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
            return criteriaBuilder.like(root.get("nome"),"%" + nome + "%");
        };
    }

    public static Specification<Usuario> hasSobrenome(String sobrenome){
        return (root,
                query,
                criteriaBuilder) -> {
            if(sobrenome == null || sobrenome.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(root.get("sobrenome"), "%" + sobrenome + "%");
        };
    }

   public static Specification<Usuario> hasEmail(String email){
        return (root,
                query,
                criteriaBuilder) -> {
            if(email == null || email.isEmpty()){
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(root.get("email"), "%" + email + "%");
        };
   }

   public static Specification<Usuario> hasAtivo(boolean ativo){
        return (root,
                query,
                criteriaBuilder) ->
                criteriaBuilder.equal(root.get("ativo"), ativo);

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
