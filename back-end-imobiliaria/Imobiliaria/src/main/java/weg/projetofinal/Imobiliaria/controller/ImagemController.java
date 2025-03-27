package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.dto.imagem.ImagemGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.imagem.ImagemPutResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.service.ImagemService;
import weg.projetofinal.Imobiliaria.model.mapper.ImagemMapper;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/imagens")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ImagemController {

    private final ImagemService imagemService;

    @PostMapping("/imovel/{idImovel}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<List<ImagemGetResponseDTO>> uploadImagens(
            @PathVariable Integer idImovel,
            @RequestParam("arquivos") List<MultipartFile> arquivos) {
        List<Imagem> imagens = imagemService.createImagem(arquivos, idImovel);
        List<ImagemGetResponseDTO> response = imagens.stream()
                .map(ImagemMapper.INSTANCE::imagemToImagemGetResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAll")
    public Page<ImagemGetResponseDTO> getAll(Pageable pageable) {
        return imagemService.getAllImagem(pageable)
                .map(ImagemMapper.INSTANCE::imagemToImagemGetResponseDTO);
    }

    @GetMapping("getById/{id}")
    public ImagemGetResponseDTO getById(@PathVariable Integer id) {
        Imagem imagem = imagemService.getByIdImagem(id);
        return ImagemMapper.INSTANCE.imagemToImagemGetResponseDTO(imagem);
    }

    @PutMapping("update/{id}")
    public ImagemGetResponseDTO update(@PathVariable Integer id, @RequestBody @Valid ImagemPutResponseDTO imagemPutDTO) {
        Imagem imagemAtualizada = imagemService.updateImagem(id, ImagemMapper.INSTANCE.imagemPutResponseDTOToImagem(imagemPutDTO));
        return ImagemMapper.INSTANCE.imagemToImagemGetResponseDTO(imagemAtualizada);
    }

    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        imagemService.deleteImagem(id);
    }
}
