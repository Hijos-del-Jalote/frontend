import { Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import { Home } from "./components/Home";
import Partida from "./components/Partida";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Partida />} />
      <Route path="partida">
        <Route path="crear" element={<CrearPartida />} />
      </Route>
    </Routes>
  );
}

export default App;
