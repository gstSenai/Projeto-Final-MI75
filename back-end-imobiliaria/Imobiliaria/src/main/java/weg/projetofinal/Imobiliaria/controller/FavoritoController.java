package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.dto.FavoritoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.FavoritoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Favorito;
import weg.projetofinal.Imobiliaria.model.mapper.FavoritoMapper;
import weg.projetofinal.Imobiliaria.service.FavoritoService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/favorito")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class FavoritoController {

    private final FavoritoService favoritoService;

    @PostMapping("/favoritar")
    @ResponseStatus(HttpStatus.CREATED)
    public FavoritoGetResponseDTO postFavorito(@RequestBody FavoritoPostRequestDTO favoritoPostRequestDTO) {
        Favorito favorito = FavoritoMapper.INSTANCE.favoritoPostRequestDTOToFavorito(favoritoPostRequestDTO);
        Favorito favorito1 = favoritoService.create(favorito);
        return FavoritoMapper.INSTANCE.favoritoToFavoritoGetResponseDTO(favorito1);
    }

    @GetMapping("/getAll")
    @ResponseStatus(HttpStatus.OK)
    public List<FavoritoGetResponseDTO> getAll() {
        List<Favorito> favoritos = favoritoService.listarFavoritos();
        return favoritos.stream().map(FavoritoMapper.INSTANCE::favoritoToFavoritoGetResponseDTO).collect(Collectors.toList());
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FavoritoGetResponseDTO getById(@PathVariable Integer id) {
        Favorito favorito = favoritoService.getFavoritoById(id);
        return FavoritoMapper.INSTANCE.favoritoToFavoritoGetResponseDTO(favorito);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Integer id) {
        favoritoService.deleteFavorito(id);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FavoritoGetResponseDTO update(@PathVariable Integer id, @RequestBody FavoritoPostRequestDTO favoritoPostRequestDTO) {
        Favorito favorito = FavoritoMapper.INSTANCE.favoritoPostRequestDTOToFavorito(favoritoPostRequestDTO);
        Favorito favoritoAtualizado = favoritoService.updateFavorito(id, favorito);
        return FavoritoMapper.INSTANCE.favoritoToFavoritoGetResponseDTO(favoritoAtualizado);
    }
}
