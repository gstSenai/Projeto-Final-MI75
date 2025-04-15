import SockJS from "sockjs-client";
import Stomp from "stompjs";

const socket = new SockJS("http://localhost:9090/chat"); // Conectar ao backend
const stompClient = Stomp.over(socket);

export function conectarWebSocket(callback) {
    stompClient.connect({}, (frame) => {
        console.log("Conectado ao WebSocket", frame);

        stompClient.subscribe("/topic/mensagens", (mensagem) => {
            console.log("Nova mensagem recebida:", mensagem);
            callback(JSON.parse(mensagem.body));
        });
    }, (error) => {
        console.error("Erro ao conectar no WebSocket:", error);
    });
}

export function enviarMensagem(mensagem) {
    stompClient.send("/app/mensagem", {}, JSON.stringify(mensagem));
}