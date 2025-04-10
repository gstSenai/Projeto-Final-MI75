package weg.projetofinal.Imobiliaria.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;
import weg.projetofinal.Imobiliaria.security.repository.UsuarioDetailsRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        return usuarioDetailsRepository.findByNome(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario nao encontrado:" + username));
    }
}
