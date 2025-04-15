package weg.projetofinal.Imobiliaria.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime timestamp;
    @Column(name = "is_read")
    private boolean read; // Adicionamos este campo para rastrear se a mensagem foi lida

    public ChatMessage(String sender, String receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.timestamp = LocalDateTime.now(ZoneOffset.UTC);
        this.read = false; // Por padrão, a mensagem começa como não lida
    }
}
