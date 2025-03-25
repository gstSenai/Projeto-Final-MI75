package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.FavoritoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.FavoritoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Favorito;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

@Mapper
public interface FavoritoMapper {

    FavoritoMapper INSTANCE = Mappers.getMapper(FavoritoMapper.class);

    @Mapping(target = "usuarioDto", source = "usuario")
    @Mapping(target = "imovelDto", source = "imovel")
    FavoritoGetResponseDTO favoritoToFavoritoGetResponseDTO(Favorito favorito);

    @Mapping(target = "usuario", source = "usuarioId", qualifiedByName = "mapUsuario")
    @Mapping(target = "imovel", source = "imovelId", qualifiedByName = "mapImovel")
    Favorito favoritoPostRequestDTOToFavorito(FavoritoPostRequestDTO favoritoPostRequestDTO);

    @Named("mapUsuario")
    default Usuario mapUsuario(Integer usuarioId) {
        if (usuarioId == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        return usuario;
    }

    @Named("mapImovel")
    default Imovel mapImovel(Integer imovelId) {
        if (imovelId == null) {
            return null;
        }
        Imovel imovel = new Imovel();
        imovel.setId(imovelId);
        return imovel;
    }
}
