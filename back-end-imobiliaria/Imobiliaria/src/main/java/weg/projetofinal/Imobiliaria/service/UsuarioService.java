package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoUsuario;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.model.mapper.UsuarioMapper;
import weg.projetofinal.Imobiliaria.repository.EnderecoRepository;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;

import java.util.Optional;


@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final EnderecoUsuarioService enderecoUsuarioService;
    private final S3Service s3Service;

    @Autowired
    public UsuarioService(UsuarioRepository repository, EnderecoUsuarioService enderecoUsuarioService, S3Service s3Service) {
        this.repository = repository;
        this.enderecoUsuarioService = enderecoUsuarioService;
        this.s3Service = s3Service;
    }

    public UsuarioGetResponseDTO createUser(UsuarioPostRequestDTO usuarioDTO, MultipartFile imagem) {
        EnderecoUsuario enderecoUsuario = enderecoUsuarioService.findById(usuarioDTO.idEnderecoUsuario());
        if (enderecoUsuario == null) {
            throw new RuntimeException("Endereço não encontrado com ID: " + usuarioDTO.idEnderecoUsuario());
        }
        String imagemUrl = (imagem != null && !imagem.isEmpty()) ? s3Service.uploadFile(imagem) : null;

        Usuario usuario = UsuarioMapper.INSTANCE.usuarioPostRequestDTOToUsuario(usuarioDTO);
        usuario.setEnderecoUsuario(enderecoUsuario);
        usuario.setImagem_usuario(imagemUrl);

        Usuario usuarioCriado = repository.save(usuario);

        return UsuarioMapper.INSTANCE.usuarioToUsuarioGetResponseDTO(usuarioCriado);
    }

    public Page<Usuario> findAll(Pageable pageable) {

        return repository.findAll(pageable);
    }

    public Usuario findById(Integer id) {

        return repository.findById(id).get();
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public Usuario updateUser(Usuario usuario, Integer id, Integer idEnderecoUsuario) {
        Usuario usuarioExistente = repository.findById(id).get();
        if (usuarioExistente == null) {
            throw new RuntimeException("Usuário não encontrado com ID: " + id);
        }

        EnderecoUsuario enderecoUsuario = enderecoUsuarioService.findById(idEnderecoUsuario);

        if (enderecoUsuario == null) {
            throw new RuntimeException("Endereço não encontrado com ID: " + idEnderecoUsuario);
        }

        usuario.setId(id);
        usuario.setEnderecoUsuario(enderecoUsuario);

        return repository.save(usuario);
    }



    public Usuario getByNomeUsuario(String nome) {
        return repository.findByNome(nome).get();
    }
}
