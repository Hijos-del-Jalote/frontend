import { Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import CrearJugador from "./components/CrearJugador";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CrearJugador />} />
      <Route path="home">
        <Route path="crear" element={<CrearPartida />} />
      </Route>
    </Routes>
  );
}

export default App;
