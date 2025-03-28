package weg.projetofinal.Imobiliaria.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoProprietario;
import weg.projetofinal.Imobiliaria.model.entity.Proprietario;
import weg.projetofinal.Imobiliaria.model.mapper.ProprietarioMapper;
import weg.projetofinal.Imobiliaria.repository.ProprietarioRepository;

@Service
public class ProprietarioService {

    private final ProprietarioRepository repository;
    private final EnderecoProprietarioService enderecoProprietarioService;
    private final S3Service s3Service;

    @Autowired
    public ProprietarioService(ProprietarioRepository repository, EnderecoProprietarioService enderecoProprietarioService, S3Service s3Service) {
        this.repository = repository;
        this.enderecoProprietarioService = enderecoProprietarioService;
        this.s3Service = s3Service;
    }

    @Transactional
    public Proprietario createProprietario(ProprietarioPostRequestDTO proprietarioDTO, MultipartFile imagem) {
        Proprietario proprietario = ProprietarioMapper.INSTANCE.proprietarioPostRequestDTOToProprietario(proprietarioDTO);

        if (imagem != null && !imagem.isEmpty()) {
            proprietario.setImagem_proprietario(s3Service.uploadFile(imagem));
        }

        return repository.save(proprietario);
    }

    public Page<Proprietario> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Proprietario findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proprietário não encontrado com ID: " + id));
    }

    @Transactional
    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Proprietário não encontrado para deletar.");
        }
        repository.deleteById(id);
    }

    @Transactional
    public Proprietario updateProprietario(ProprietarioPutRequestDTO proprietarioDTO, Integer id, MultipartFile imagem) {
        Proprietario proprietarioExistente = findById(id);
        Proprietario proprietarioAtualizado = ProprietarioMapper.INSTANCE.proprietarioPutRequestDTOToProprietario(proprietarioDTO);

        BeanUtils.copyProperties(proprietarioAtualizado, proprietarioExistente, "id", "enderecoProprietario", "imagem_usuario");

        if (imagem != null && !imagem.isEmpty()) {
            proprietarioExistente.setImagem_proprietario(s3Service.uploadFile(imagem));
        }

        if (proprietarioDTO.enderecoProprietario() != null && proprietarioDTO.enderecoProprietario().getId() != null) {
            EnderecoProprietario endereco = enderecoProprietarioService.findById(proprietarioDTO.enderecoProprietario().getId());
            proprietarioExistente.setEnderecoProprietario(endereco);
        }

        return repository.save(proprietarioExistente);
    }

    public byte[] downloadImagem(String nomeArquivo) {
        return s3Service.downloadFile(nomeArquivo);
    }
}
