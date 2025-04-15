//package weg.projetofinal.Imobiliaria.security.model.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.CreationTimestamp;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import weg.projetofinal.Imobiliaria.model.entity.Usuario;
//
//import java.time.Instant;
//import java.util.Collection;
//import java.util.List;
//
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//public class UsuarioDetails
//        implements UserDetails{
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(unique = true, nullable = false)
//    private String username;
//
//    @Column(unique = true, nullable = false)
//    private String password;
//
//    private boolean accountNonExpired;
//    private boolean accountNonLocked;
//    private boolean credentialsNonExpired;
//    private boolean enabled;
//    @CreationTimestamp
//    private Instant timestamp;
//
//    @OneToOne(mappedBy = "usuarioDetails")
//    private Usuario usuario;
//
//
//    public void setPassword(String password) {
//        this.password =
//                new BCryptPasswordEncoder()
//                        .encode(password);
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of();
//    }
//}
