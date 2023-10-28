import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import UnirseAPartida from "./components/UnirseAPartida";
import IniciarPartida from "./screens/IniciarPartida";
import Partida from "./components/Partida2";
import { WebSocketProvider } from "./components/WebSocketContext";
import FinalizarPartida from "./components/FinalizarPartida";
import "./styles/App.css";
import StoreProvider from "./contexto/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrearJugador from "./screens/CrearJugador";
import CrearPartida from "./screens/CrearPartida";

function App() {
  return (
    <StoreProvider>
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
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </WebSocketProvider>
    </StoreProvider>
  );
}

export default App;
