import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UnirseAPartida() {
  const [partidas, setPartidas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Hacer una solicitud GET a http://localhost:8000/partidas cuando el componente se monte
    axios
      .get("http://localhost:8000/partidas")
      .then((response) => {
        setPartidas(response.data.partidas);
      })
      .catch((error) => {
        console.error("Error al obtener las partidas:", error);
      });
  }, []);

  const handleUnirseAPartida = async (partidaId) => {
    try {
      // Realizar una solicitud POST para unirse a la partida
      const response = await axios.post("http://localhost:8000/partidas/unir", {
        idPartida: partidaId,
        // Otros datos necesarios para la solicitud POST
      });

      if (response.status === 200) {
        // Redirigir al lobby si la respuesta es exitosa
        navigate(`/lobby/${partidaId}`);
      } else {
        // Manejar el caso en que la respuesta no sea 200 (por ejemplo, mostrar un mensaje de error)
      }
    } catch (error) {
      // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
      console.error("Error al unirse a la partida:", error);
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mt-5">Lista de Partidas Disponibles</h2>
      <ul className="list-unstyled">
        {partidas.map((partida) => (
          <li key={partida.id} className="mb-3">
              <div className="container p-3 rounded" style={{ backgroundColor: "#ffecb3" }}>
                <h4 className="mb-3">
                  <strong>{partida.nombre}</strong>
                </h4>
                <div className="row align-items-center">
                  <strong>Max Jugadores: {partida.maxJugadores}</strong>
                </div>
                <div className="row align-items-center">
                  <strong>Min Jugadores: {partida.minJugadores}</strong>
                </div>
                <button
                  onClick={() => handleUnirseAPartida(partida.id)}
                  className="btn btn-primary mt-2"
                >
                  Unirse a la Partida
                </button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UnirseAPartida;
