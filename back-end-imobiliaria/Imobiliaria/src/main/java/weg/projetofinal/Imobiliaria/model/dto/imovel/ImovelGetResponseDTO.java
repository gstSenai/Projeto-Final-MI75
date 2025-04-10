package weg.projetofinal.Imobiliaria.model.dto.imovel;

import weg.projetofinal.Imobiliaria.model.dto.caracteriticas.CaracteristicaImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.endereco.EnderecoImovelGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioImovelResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioImovelGetResponseDTO;

public record ImovelGetResponseDTO(
        Integer id,
        Integer codigo,
        String nome_propriedade,
        String tipo_transacao,
        Double valor_venda,
        String tipo_imovel,
        String status_imovel,
        Double valor_promocional,
        Boolean destaque,
        Boolean visibilidade,
        Double valor_iptu,
        Double condominio,
        Double area_construida,
        Double area_terreno,
        String descricao,
        EnderecoImovelGetResponseDTO id_endereco,
        CaracteristicaImovelGetResponseDTO id_caracteristicasImovel,
        ProprietarioImovelResponseDTO id_proprietario,
        UsuarioImovelGetResponseDTO id_usuario
) {


}
