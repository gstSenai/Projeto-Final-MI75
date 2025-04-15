package weg.projetofinal.Imobiliaria.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import weg.projetofinal.Imobiliaria.model.entity.ChatMessage;
import weg.projetofinal.Imobiliaria.service.ChatService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/mensagem")
    @SendTo("/topic/mensagens")
    public ChatMessage enviarMensagem(ChatMessage mensagem) {
        return chatService.saveMessage(mensagem);
    }

    @PostMapping("/mensagem")
    @ResponseBody
    public ChatMessage enviarMensagemHttp(@RequestBody ChatMessage mensagem) {
        return chatService.saveMessage(mensagem);
    }

    @GetMapping("/mensagens/{sender}/{receiver}")
    @ResponseBody
    public List<ChatMessage> getMensagens(@PathVariable String sender, @PathVariable String receiver) {
        return chatService.getChatMessages(sender, receiver);
    }

    @PutMapping("/mensagens/ler/{receiver}/{sender}")
    @ResponseBody
    public void marcarMensagensComoLidas(@PathVariable String receiver, @PathVariable String sender) {
        chatService.marcarMensagensComoLidas(receiver, sender);
    }

    @GetMapping("/mensagens/agrupadas/{sender}/{receiver}")
    @ResponseBody
    public Map<String, List<ChatMessage>> getMensagensAgrupadas(@PathVariable String sender, @PathVariable String receiver) {
        return chatService.getMensagensAgrupadas(sender, receiver);
    }
}