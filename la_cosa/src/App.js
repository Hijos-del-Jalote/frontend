import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarPartida from './pages/IniciarPartida';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/partida/:id' element={<IniciarPartida/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
