import React, { useState, useEffect} from "react";
import axios from "axios";
import { useWebSocket } from './WebSocketContext';
import { useSearchParams } from "react-router-dom";

function Chat({ancho, alto}) {
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
        `${chat.player} ${chat.time} ${chat.msg}`
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
          let msg = data.data.player + " " + data.data.time + " " + data.data.msg;
          setChatsito((msgsAnteriores) => [...msgsAnteriores, msg]);
        }
      };
    }
  }, [webSocket, idPartida]);

  const handleChat = () => {

    webSocket.send(mensaje);
    //desp que se mando saco para que no quede el msg en el input
    setMensaje('');
  };

  const handleKeyPress = (e) => {
    //para que funcione el enviar msg con tecla enter
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  return (
    <div className="chat-container" style={{ width: ancho, height: alto }}>
      <div className="chat-messages">
        <div className="message-list">
          {chatsito.map((mensaje, index) => (
            <div key={index} className="message">
            {/* divide las partes del mensaje para ponerle otro color */}
            <span className="message-player">{mensaje.split(' ')[0]}</span>
            <span className="message-time">{mensaje.split(' ')[1]}</span>
            <span className="message-text">{mensaje.split(' ').slice(2).join(' ')}</span>
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
