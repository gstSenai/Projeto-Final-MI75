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

@Service
@AllArgsConstructor
public class ImagemService {

    private ImagemRepository repository;

    public Imagem createImagem(ImagemPostRequestDTO imagemPostRequestDTO) {
        Imagem imagem = imagemPostRequestDTO.convert();
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

    public Imagem updateImagem(Integer id, ImagemPutResponseDTO imagemDTO) {
        Imagem imagemExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagem não encontrada para o ID: " + id));

        imagemExistente.setCaminho_foto(imagemDTO.caminho_foto());

        if (imagemDTO.idImovel() != null) {
            Imovel imovel = new Imovel();
            imovel.setId(imagemDTO.idImovel());
            imagemExistente.setImovel(imovel);
        }

        return repository.save(imagemExistente);
    }
}
