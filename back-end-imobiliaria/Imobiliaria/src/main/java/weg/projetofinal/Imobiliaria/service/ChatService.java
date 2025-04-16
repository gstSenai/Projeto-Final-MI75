package weg.projetofinal.Imobiliaria.service;

import org.springframework.stereotype.Service;
import weg.projetofinal.Imobiliaria.model.entity.ChatMessage;
import weg.projetofinal.Imobiliaria.repository.ChatMessageRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getChatMessages(String sender, String receiver) {
        return chatMessageRepository.findChatBetweenTwoUsers(sender, receiver);
    }

    public void marcarMensagensComoLidas(String receiver, String sender) {
        chatMessageRepository.marcarMensagensComoLidas(receiver, sender);
    }

    public Map<String, List<ChatMessage>> getMensagensAgrupadas(String sender, String receiver) {
        List<ChatMessage> mensagens = chatMessageRepository.findBySenderOrReceiverOrderByTimestampAsc(sender, receiver);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return mensagens.stream()
                .collect(Collectors.groupingBy(msg -> msg.getTimestamp().format(formatter)));
    }
}