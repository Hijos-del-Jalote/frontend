import { Navigate, Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import Navbar from "./components/NavBar";
import UnirseAPartida from "./components/UnirseAPartida";
import CrearJugador from "./components/CrearJugador";
import "./App.css";

function App() {
  return (
    <Routes>
  <Route path="/" element={<CrearJugador />} />
  <Route path="home" element={<Navbar />}>
    <Route path="crear" element={<CrearPartida />} />
    <Route path="unir" element={<UnirseAPartida />} />
  </Route>

    </Routes>
  );
}

export default App;
