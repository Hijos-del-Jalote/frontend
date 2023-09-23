export default function IniciarPartida (){
	//Por ahora usamos estos datos.
	let jugadores = [
		{nombre: "nombre1"},
		{nombre: "nombre2"},
		{nombre: "nombre3"},
		{nombre: "nombre4"}
	]
	return(
		<>
			<ul>
				{jugadores?.length && jugadores.map((jugador)=>{
					return(
						<li>{jugador.nombre}</li>
					)
				})}
			</ul>
			<button disabled={jugadores?.length<4}>Iniciar Partida</button>
		</>
	)
}