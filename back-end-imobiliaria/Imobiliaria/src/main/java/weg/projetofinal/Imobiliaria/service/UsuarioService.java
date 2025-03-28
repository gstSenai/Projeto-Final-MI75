package weg.projetofinal.Imobiliaria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
import weg.projetofinal.Imobiliaria.model.mapper.UsuarioMapper;
import org.springframework.beans.BeanUtils;
import weg.projetofinal.Imobiliaria.repository.UsuarioRepository;
import weg.projetofinal.Imobiliaria.service.specification.UsuarioSpecification;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final S3Service s3Service;

    @Autowired
    public UsuarioService(UsuarioRepository repository, S3Service s3Service) {
        this.repository = repository;
        this.s3Service = s3Service;
    }

    public Usuario createUser(UsuarioPostRequestDTO usuarioDTO, MultipartFile imagem) {
        String imagemUrl = s3Service.uploadFile(imagem);
        Usuario usuario = UsuarioMapper.INSTANCE.usuarioPostRequestDTOToUsuario(usuarioDTO);
        usuario.setImagem_usuario(imagemUrl);
        return repository.save(usuario);
    }


    public Page<Usuario> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Usuario findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public Usuario updateUser(Usuario usuario, Integer id, MultipartFile imagem) {
        Usuario usuarioExistente = findById(id);
        BeanUtils.copyProperties(usuario, usuarioExistente, "id",
                "enderecoUsuario", "imagem_usuario");

        if (imagem != null && !imagem.isEmpty()) {
            usuarioExistente.setImagem_usuario(s3Service.uploadFile(imagem));
        }

        return repository.save(usuarioExistente);
    }

    public List<Usuario> buscarUsuario(String nome, String sobrenome, String cpf, String tipoConta) {
        Specification<Usuario> usuarioSpecification;
        if ((nome != null && !nome.isEmpty()) || (sobrenome != null && !sobrenome.isEmpty())) {
            usuarioSpecification = Specification.where(UsuarioSpecification.hasNome(nome))
                    .and(UsuarioSpecification.hasSobrenome(sobrenome));
        } else if((cpf != null && !cpf.isEmpty())) {
            usuarioSpecification = UsuarioSpecification.hasCpf(cpf);
        }else {
            usuarioSpecification = UsuarioSpecification.hasTipo_conta(tipoConta);
        }
        return repository.findAll(usuarioSpecification);
    }

    public List<Usuario> listarCorretores() {
        Specification<Usuario> usuarioSpecification =
                UsuarioSpecification.hasTipo_conta("Corretor");
        return repository.findAll(usuarioSpecification);
    }

    public byte[] downloadImagem(String nomeArquivo) {
        return s3Service.downloadFile(nomeArquivo);
    }
}
