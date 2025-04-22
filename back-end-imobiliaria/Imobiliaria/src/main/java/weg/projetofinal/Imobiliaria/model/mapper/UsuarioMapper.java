package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioCadastroPostDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

@Mapper
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    @Mapping(source = "imovel", target = "imovel")
    UsuarioGetResponseDTO usuarioToUsuarioGetResponseDTO(Usuario usuario);

    @Mapping(source = "telefone", target = "telefone")
    Usuario usuarioPostRequestDTOToUsuario(UsuarioPostRequestDTO usuarioPostRequestDTO);

    @Mapping(source = "telefone", target = "telefone")
    Usuario usuarioPutRequestDTOToUsuario(UsuarioPutRequestDTO usuarioPutRequestDTO);

    Usuario usuarioCadastroRequestDTOToUsuario(UsuarioCadastroPostDTO usuarioRequestDTO);
}