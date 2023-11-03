import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import localStorage from "../data/localStorage";
import { JugadorNoExistente } from "../utils/Mensajes";
import { showErrorMsg } from "../utils/Toasts";

function Navbar() {
  const navigate = useNavigate();
  if (!localStorage.getUserId()) {

    showErrorMsg(JugadorNoExistente);
    setTimeout(() => {
      navigate(`/`);
    }, 0);
  }

  return (
    <>
      <div className="container_nav">
        <h1 className="la_cosa">La Cosa</h1>
        <div className="botones_contenedor">
          <div className="item1">
            <Link to={`crear`} className="nav-link">
              <button className="item">Crear Partida</button>
            </Link>
          </div>
          <div className="item2">
            <Link to={`unir`} className="nav-link">
              <button className="item">Unirse a Partida</button>
            </Link>
          </div>
        </div>
        <div></div>
        <div className="alien_img"></div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
