import { Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import { Home } from "./components/Home";
import CrearJugador from "./components/CrearJugador";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CrearJugador />} />
      <Route path="partida">
        <Route path="crear" element={<CrearPartida />} />
      </Route>
    </Routes>
  );
}

export default App;
