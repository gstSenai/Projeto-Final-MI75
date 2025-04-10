package weg.projetofinal.Imobiliaria.security.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

import java.util.Collection;

@AllArgsConstructor
public class UserDetailsImpls implements UserDetails {

    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpls build(Usuario usuario) {

    }
}
