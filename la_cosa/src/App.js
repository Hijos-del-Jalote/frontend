import { Route, Routes } from "react-router-dom";
import CrearPartidaForm from "./components/CrearPartida";
import { Home } from "./components/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="partida">
        <Route path="crear" element={<CrearPartidaForm />} />
      </Route>
    </Routes>
  );
}

export default App;
