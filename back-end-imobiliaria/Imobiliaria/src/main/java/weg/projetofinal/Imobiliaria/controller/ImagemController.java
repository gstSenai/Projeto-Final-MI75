package weg.projetofinal.Imobiliaria.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import weg.projetofinal.Imobiliaria.model.dto.ImagemGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPutResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.mapper.ImovelMapper;
import weg.projetofinal.Imobiliaria.service.ImagemService;
import weg.projetofinal.Imobiliaria.model.mapper.ImagemMapper;
import weg.projetofinal.Imobiliaria.service.ImovelService;

@RestController
@RequestMapping("/imagens")
@AllArgsConstructor
public class ImagemController {

    private final ImagemService imagemService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ImagemGetResponseDTO create(@RequestBody @Valid ImagemPostRequestDTO imagemPostDTO) {
        Imagem imagem = ImagemMapper.INSTANCE.imagemPostRequestDTOToImagem(imagemPostDTO);
        Imagem imagemSaved = imagemService.createImagem(imagem);
        return ImagemMapper.INSTANCE.imagemToImagemGetResponseDTO(imagemSaved);
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
