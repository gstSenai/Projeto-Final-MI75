package weg.projetofinal.Imobiliaria.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Proprietario;
import weg.projetofinal.Imobiliaria.model.mapper.ProprietarioMapper;
import weg.projetofinal.Imobiliaria.service.ProprietarioService;

import java.io.IOException;

@RestController
@RequestMapping("/proprietario")
@CrossOrigin(origins = "http://localhost:3000")
public class ProprietarioController {

    private final ProprietarioService proprietarioService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ProprietarioController(ProprietarioService proprietarioService, ObjectMapper objectMapper) {
        this.proprietarioService = proprietarioService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ProprietarioGetResponseDTO create(
            @RequestPart(name = "proprietario", required = false) String proprietarioJson,
            @RequestPart(name = "imagem", required = false) MultipartFile imagem) throws IOException {
        ProprietarioPostRequestDTO proprietarioDTO = objectMapper.readValue(proprietarioJson, ProprietarioPostRequestDTO.class);
        Proprietario proprietarioCriado = proprietarioService.createProprietario(proprietarioDTO, imagem);
        return ProprietarioMapper.INSTANCE.proprietarioToProprietarioGetResponseDTO(proprietarioCriado);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public Page<ProprietarioGetResponseDTO> findAll(
            @PageableDefault(sort = "nome", direction = Sort.Direction.DESC) Pageable pageable) {
        return proprietarioService.findAll(pageable).map(ProprietarioMapper.INSTANCE::proprietarioToProprietarioGetResponseDTO);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProprietarioGetResponseDTO findById(@PathVariable Integer id) {
        Proprietario proprietario = proprietarioService.findById(id);
        return ProprietarioMapper.INSTANCE.proprietarioToProprietarioGetResponseDTO(proprietario);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        proprietarioService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProprietarioGetResponseDTO update(
            @RequestPart(name = "proprietario") String proprietarioJson,
            @RequestPart(name = "imagem", required = false) MultipartFile imagem,
            @PathVariable Integer id) throws IOException {
        ProprietarioPutRequestDTO proprietarioDTO = objectMapper.readValue(proprietarioJson, ProprietarioPutRequestDTO.class);
        Proprietario proprietarioAtualizado = proprietarioService.updateProprietario(proprietarioDTO, id, imagem);
        return ProprietarioMapper.INSTANCE.proprietarioToProprietarioGetResponseDTO(proprietarioAtualizado);
    }

    @GetMapping("/imagem/{nomeArquivo}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<byte[]> imagemProprietario(@PathVariable String nomeArquivo) {
        byte[] imagemBytes = proprietarioService.downloadImagem(nomeArquivo);
        if (imagemBytes != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imagemBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
