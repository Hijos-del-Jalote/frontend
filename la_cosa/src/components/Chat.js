import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWebSocket } from './WebSocketContext';
import { useSearchParams } from "react-router-dom";

function Chat({ ancho, alto }) {
  const [chatsito, setChatsito] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [searchParams] = useSearchParams();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws/chat?idJugador=${idJugador}`;
  const webSocket = useWebSocket(wsurl);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/partidas/${idPartida}/chat`)
      .then((response) => {
        const mensajes = response.data.map(chat => (
          { player: chat.player, time: chat.time, msg: chat.msg }
        ));
        setChatsito(mensajes);
      })
      .catch((error) => {
        console.error("Error al obtener el chat: ", error);
      });

    if (webSocket) {
      webSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.event === "chat_msg") {
          setChatsito((msgsAnteriores) => [
            ...msgsAnteriores,
            { player: data.data.player, time: data.data.time, msg: data.data.msg }
          ]);
        }
      };
    }
  }, [webSocket, idPartida]);

  const handleChat = () => {
    webSocket.send(mensaje);
    // después de enviar, limpio el mensaje para que no quede en el input
    setMensaje('');
  };

  const handleKeyPress = (e) => {
    // para permitir enviar el mensaje con la tecla Enter
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  return (
    <div className="chat-container" style={{ width: ancho, height: alto }}>
      <div className="chat-messages">
        <div className="message-list">
          {chatsito.map((chat, index) => (
            <div key={index} className="message">
              <span className="message-player">{chat.player}:</span>
              <span className="message-text"> {chat.msg}</span>
              <span className="message-time"> ({chat.time})</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribi tu mensaje..."
          className="chat-input"
        />
        <button onClick={handleChat} className="button2">Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
