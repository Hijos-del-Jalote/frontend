import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Navbar() {
  const [nombreJugador, setNombreJugador] = useState("");

  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador");

  // Obtengo informacion del Jugador
  useEffect(() => {
    // Hacer una solicitud GET a http://localhost:8000/partidas cuando el componente se monte
    if (idJugador != null) {
      axios
        .get(`http://localhost:8000/jugadores/${idJugador}`)

        .then((response) => {
          setNombreJugador(response.data.nombre);
        })
        .catch((error) => {
          console.error(error);
          setNombreJugador("Error el jugador no existe");
        });
    }
  }, );
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to={`crear?idJugador=${idJugador}`} className="nav-link">
                <button className="btn btn-success">Crear Partida</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`unir?idJugador=${idJugador}`} className="nav-link">
                <button className="btn btn-primary">Unirse a Partida</button>
              </Link>
            </li>
          </ul>
          {/* Agregar aquí el nombre del jugador */}
          <span className="navbar-text">Hola {nombreJugador}</span>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
