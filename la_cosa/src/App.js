import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrearPartida, IniciarPartida } from './components'

function App() {
  return (
      <Routes>
{/*         <Route exact path="/" element={<Home />} /> */}
        <Route path="/partida/crear" element={<CrearPartida />}/>
        <Route path='/lobby/' element={<IniciarPartida/>}/>
      </Routes>
  );
}

export default App;
