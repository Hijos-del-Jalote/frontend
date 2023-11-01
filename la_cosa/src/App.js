import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Partida from "./screens/Partida2";
import { WebSocketProvider } from "./components/WebSocketContext";
import FinalizarPartida from "./components/FinalizarPartida";
import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrearJugador from "./screens/CrearJugador";
import CrearPartida from "./screens/CrearPartida";
import IniciarPartida from "./screens/IniciarPartida";
import UnirseAPartida from "./screens/UnirseAPartida";

function App() {
  return (
    <WebSocketProvider>
      <Routes>
        <Route path="/" element={<CrearJugador />} />
        <Route path="home" element={<Navbar />}>
          <Route path="crear" element={<CrearPartida />} />
          <Route path="unir" element={<UnirseAPartida />} />
        </Route>
        <Route path="/lobby/" element={<IniciarPartida />} />
        <Route path="/partida/" element={<Partida />} />
        <Route path="resultados-partida" element={<FinalizarPartida />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </WebSocketProvider>
  );
}

export default App;
