package weg.projetofinal.Imobiliaria.repository;

import weg.projetofinal.Imobiliaria.model.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT c FROM ChatMessage c WHERE (c.sender = :sender AND c.receiver = :receiver) OR (c.sender = :receiver AND c.receiver = :sender)")
    List<ChatMessage> findChatBetweenTwoUsers(String sender, String receiver);

    // Busca todas as mensagens enviadas ou recebidas por um usuário, ordenadas por data
    List<ChatMessage> findBySenderOrReceiverOrderByTimestampAsc(String sender, String receiver);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ChatMessage c SET c.read = true WHERE c.receiver = :receiver AND c.sender = :sender")
    void marcarMensagensComoLidas(String receiver, String sender);
}