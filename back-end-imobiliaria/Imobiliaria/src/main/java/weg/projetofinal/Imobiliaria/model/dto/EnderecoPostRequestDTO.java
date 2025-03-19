package weg.projetofinal.Imobiliaria.model.dto;

import jakarta.persistence.Column;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.model.entity.Imagem;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

public record EnderecoPostRequestDTO(
        String rua,
        String cep,
        String numero,
        String bairro,
        String cidade,
        String uf,
        String complemento) {

    public Endereco convert() {
        return Endereco.builder().rua(rua).cep(cep).numero(numero).bairro(bairro).cidade(cidade).
                uf(uf).complemento(complemento).build();
    }
}
