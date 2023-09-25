import { Navigate, Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import { Home } from "./components/Home";
import Navbar from "./components/NavBar";
import UnirseAPartida from "./components/UnirseAPartida";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="partida" element={<Navbar />}>
    <Route path="crear" element={<CrearPartida />} />
    <Route path="unir" element={<UnirseAPartida />} />
  </Route>
</Routes>

  );
}

export default App;
