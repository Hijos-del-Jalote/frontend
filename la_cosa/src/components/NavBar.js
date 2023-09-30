import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
  <div className="container">
    <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        <Link to="crear" className="nav-link">
          <button className="btn btn-success">Crear Partida</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="unir" className="nav-link">
          <button className="btn btn-primary">Unirse a Partida</button>
        </Link>
      </li>
    </ul>
  </div>
</nav>

    <Outlet /></>
  );
}

export default Navbar;
