package weg.projetofinal.Imobiliaria.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import weg.projetofinal.Imobiliaria.service.EnderecoService;
import weg.projetofinal.Imobiliaria.service.ImovelService;

@RestController
@RequestMapping("/imovel")
@AllArgsConstructor
public class ImovelController {
    
    private ImovelService service;


}
