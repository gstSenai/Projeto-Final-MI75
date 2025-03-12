package weg.projetofinal.Imobiliaria.service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.ImagemPutResponseDTO;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.repository.ImagemRepository;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;

@Service
@AllArgsConstructor
public class ImagemService {

    private ImagemRepository repository;

    public Imagem createImagem(Imagem imagem) {
        return repository.save(imagem);
    }

    public Page<Imagem> getAllImagem(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Imagem getByIdImagem(Integer id) {
        return repository.findById(id).get();
    }

    public void deleteImagem(Integer id) {
        repository.deleteById(id);
    }

    public Imagem updateImagem(Integer id, Imagem imagemDTO) {
        Imagem imagemExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagem não encontrada para o ID: " + id));

        imagemExistente.setCaminho_foto(imagemDTO.getCaminho_foto());

        if (imagemDTO.getImovel() != null) {
            imagemExistente.setImovel(imagemDTO.getImovel());
        }

        return repository.save(imagemExistente);
    }

}
