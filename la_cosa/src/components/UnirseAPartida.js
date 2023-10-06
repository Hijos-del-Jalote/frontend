import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiObtenerPartidas } from "./apiService";

function UnirseAPartida() {
  const navigate = useNavigate();
  const [partidas, setPartidas] = useState([]);
  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiObtenerPartidas();
  
        if (result.success) {
          setPartidas(result.partidas);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };
  
    fetchData(); // Llama a la función fetchData inmediatamente
  
  }, []);
  

  const handleUnirseAPartida = async (partidaId) => {
    try {
      // Realizar una solicitud POST para unirse a la partida
      const url = `http://localhost:8000/partidas/unir?idPartida=${partidaId}&idJugador=${idJugador}`;
      const response = await axios.post(url);

      if (response.status === 200) {
        // Redirigir al lobby si la respuesta es exitosa
        console.log("Jugador unido con exito");
        setTimeout(() => {
          navigate(`/lobby?idJugador=${idJugador}&idPartida=${partidaId}`);
        }, 2000);
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
            <div
              className="container p-3 rounded"
              style={{ backgroundColor: "#ffecb3" }}
            >
              <h4 className="mb-3">
                <strong>{partida.nombre}</strong>
              </h4>
              <div className="row align-items-center">
                <strong>Max Jugadores: {partida.maxJug}</strong>
              </div>
              <div className="row align-items-center">
                <strong>Min Jugadores: {partida.minJug}</strong>
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
