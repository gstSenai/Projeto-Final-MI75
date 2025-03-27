package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.Favorito;
import weg.projetofinal.Imobiliaria.repository.FavoritoRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;

    public List<Favorito> listarFavoritos() {
        return favoritoRepository.findAll();
    }

    public Favorito getFavoritoById(Integer id) {
        return favoritoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Favorito não encontrado com ID: " + id));
    }

    public Favorito create(Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    public Favorito updateFavorito(Integer id, Favorito favorito) {
        Favorito favoritoExistente = getFavoritoById(id);
        favoritoExistente.setUsuario(favorito.getUsuario());
        favoritoExistente.setImovel(favorito.getImovel());

        return favoritoRepository.save(favoritoExistente);
    }

    public void deleteFavorito(Integer id) {
        favoritoRepository.deleteById(id);
    }
}
