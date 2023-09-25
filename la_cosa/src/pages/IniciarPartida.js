import {useEffect} from 'react'
import axios from 'axios'

export default function IniciarPartida (){
	//Por ahora usamos estos datos.
	let jugadores = [
		{nombre: "nombre1"},
		{nombre: "nombre2"},
		{nombre: "nombre3"},
		{nombre: "nombre4"}
	]

  let idPartida= 5;

	useEffect(()=>{
    axios.get(`http://localhost:8000/jugador?idPArtida=${idPartida}`)
    .then((data)=>console.log(data))
    .catch((error)=>console.log(error))
	},[])

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(jugadores>=4 && jugadores<=12){
      axios.put(`http://localhost:8000/partidas/iniciar?idPartida=${idPartida}`)
      .then((data)=>console.log(data))
      .catch((error)=>console.log(error))
    }
  }

	return(
		<>
			<ul>
				{jugadores?.length && jugadores.map((jugador)=>{
					return(
						<li>{jugador.nombre}</li>
					)
				})}
			</ul>
			<button disabled={jugadores?.length<4 && jugadores?.length>12} onClick={()=>handleSubmit}>Iniciar Partida</button>
		</>
	)
}