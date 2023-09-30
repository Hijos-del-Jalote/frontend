
import { Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import Navbar from "./components/NavBar";
import UnirseAPartida from "./components/UnirseAPartida";
import CrearJugador from "./components/CrearJugador";
import IniciarPartida from "./components/IniciarPartida";


function App() {
  return (
    <Routes>

  <Route path="/" element={<CrearJugador />} />
  <Route path="home" element={<Navbar />}>
    <Route path="crear" element={<CrearPartida />} />
    <Route path="unir" element={<UnirseAPartida />} />
  </Route>
<Route path='/lobby/' element={<IniciarPartida/>}/>


    </Routes>
  );
}

export default App;
