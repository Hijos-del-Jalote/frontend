import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

export default function Partida() {

const location=useLocation()
const id= location.pathname.split('/')[2]
const [jugadores, setJugadores] = useState([
  { nombre: "nombre1" },
  { nombre: "nombre2" },
  { nombre: "nombre3" },
  { nombre: "nombre4" }
])

const [cartas, setCartas] = useState([
  {
          id: 1,
          nombre: "fedfes",
          descripcion: "sds",
          tipo: "panico"
  },
  {
          id: 1,
          nombre: "fedfes",
          descripcion: "sds",
          tipo: "panico"
  },
  {
          id: 1,
          nombre: "fedfes",
          descripcion: "sds",
          tipo: "panico"
  }
])

useEffect(()=>{
  axios.get(`http://localhost:8000/jugador?idPArtida=${id}`)
  .then((data)=>setJugadores(data))
  .catch((error)=>console.log(error))
  axios.get(`http://localhost:8000/cartas/repartir?idPartida=${id}`)
  .then((data)=>console.log(data))
  .catch((error)=>console.log(error))
},[])

    return (
      <>
        <div>
          <h2>Listado de Oponentes:</h2>
          {jugadores.map((jugador, index) => (
            <div key={index}>
              {jugador.nombre}
            </div>
          ))}
        </div>
        <div>
          <h2>Mano del Jugador:</h2>
          {cartas.map((carta, index) => (
            <div key={index}>
              <button>{carta.tipo}</button>
            </div>
          ))}
        </div>
      </>
    );
  }