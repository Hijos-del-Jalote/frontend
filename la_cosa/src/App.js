import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrearPartida, Home, IniciarPartida } from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/partida/crear" element={<CrearPartida />}/>
        <Route exact path='/partida/:id' element={<IniciarPartida/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
