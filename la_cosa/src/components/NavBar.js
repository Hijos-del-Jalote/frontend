import { Link, Outlet, useLocation } from "react-router-dom";

function Navbar() {
  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador");

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
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
