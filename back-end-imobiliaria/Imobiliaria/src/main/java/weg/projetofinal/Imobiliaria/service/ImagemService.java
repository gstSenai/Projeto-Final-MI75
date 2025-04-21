package weg.projetofinal.Imobiliaria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.repository.ImagemRepository;
import weg.projetofinal.Imobiliaria.repository.ImovelRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImagemService {

    private final ImagemRepository repository;
    private final ImovelService imovelService;
    private final ImovelRepository imovelRepository;
    private final S3Service s3Service;

    @Autowired
    public ImagemService(ImagemRepository repository, ImovelService imovelService, ImovelRepository imovelRepository, S3Service s3Service) {
        this.repository = repository;
        this.imovelService = imovelService;
        this.imovelRepository = imovelRepository;
        this.s3Service = s3Service;
    }

    public List<Imagem> createImagem(List<MultipartFile> arquivos, Integer idImovel) {
        if(imovelService.getByIdImovel(idImovel) == null ){
            return null;
        }
        List<Imagem> imagensSalvas = new ArrayList<>();

        for(MultipartFile arquivo : arquivos){
            String caminhoFoto = s3Service.uploadFile(arquivo);
            Imagem imagem = new Imagem();
            imagem.setCaminho_foto(caminhoFoto);
            imagem.setImovel(imovelService.getByIdImovel(idImovel));
            imagensSalvas.add(repository.save(imagem));
        }

        return imagensSalvas;
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

    public byte[] downloadImagem(String nomeArquivo) {
        return s3Service.downloadFile(nomeArquivo);
    }

    public List<byte[]> downloadImagensPorImovel(Integer idImovel) {
        List<Imagem> imagens = repository.findByImovelId(idImovel);

        List<byte[]> conteudos = new ArrayList<>();
        for (Imagem imagem : imagens) {
            byte[] arquivo = s3Service.downloadFile(imagem.getCaminho_foto());
            conteudos.add(arquivo);
        }

        return conteudos;
    }





}
