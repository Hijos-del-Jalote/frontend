import {useEffect, useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'

export default function IniciarPartida (){
	
  const [jugadores, setJugadores]= useState([
		{nombre: "nombre1"},
		{nombre: "nombre2"},
		{nombre: "nombre3"},
		{nombre: "nombre4"}
	])

  const location= useLocation()
  const id= location.pathname.split('/')[2]
  
  //Supongamos que la URL es http://localhost:3000/partida/id

	useEffect(()=>{
    console.log(id)
    axios.get(`http://localhost:8000/jugador?idPArtida=${id}`)
    .then((data)=>setJugadores(data))
    .catch((error)=>console.log(error))
	},[])

  const handleSubmit= (e)=>{
    e.preventDefault()
    if(jugadores>=4 && jugadores<=12){
      axios.put(`http://localhost:8000/partidas/iniciar?idPartida=${id}`)
      .then((data)=>console.log(data))
      .catch((error)=>console.log(error))
    }
  }

	return(
		<>
			<ul>
				{jugadores?.length && jugadores.map((jugador, index)=>{
					return(
						<li key={index}>{jugador.nombre}</li>
					)
				})}
			</ul>
			<button disabled={jugadores?.length<4 && jugadores?.length>12} onClick={()=>handleSubmit}>Iniciar Partida</button>
		</>
	)
}