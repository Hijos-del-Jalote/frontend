import React, { useState } from 'react';
import axios from 'axios'; 

function CrearJugador(){
    const [nombreJugador, setNombreJugador]= useState('');
    const[mensajeRespuesta, setMensajeRespuesta]=useState('');
    
    const handleCrearJugador = async () => {
        console.log('creado')
        try {
            axios.post(`http://localhost:8000/jugadores?nombre=${nombreJugador}`,
            {nombre: nombreJugador,
           });
            setMensajeRespuesta(`Jugador ${nombreJugador} creado exitosamente.`);
            setNombreJugador('');
            

        } catch(error){
            console.error('Error al crear el jugador');
            setMensajeRespuesta('Error al crear el jugador');
        }
    };
    return (
        
        <div className='container'>
        <h1 className="welcome" >Bienvenidos al juego La Cosa</h1>
        <div className='img'>
            <img src="https://1.bp.blogspot.com/-CdbElErUVhY/WM1FKf5iynI/AAAAAAAArDA/pTErZTfycC0mMowqt15ljZuZCfOyeR6WwCLcB/s400/DSCN7971.JPG" alt="" className="logo"/>
        </div>
        
        <h4 className='subtitulos'>Para poder comenzar a jugar</h4>
        <div className='caja'>
        <input 
            type="text"
            placeholder='Insertar nombre'
            value={nombreJugador}
            onChange={(e) => setNombreJugador(e.target.value)}/>
        <br/>
        <button onClick={() => handleCrearJugador()} className="btn btn-primary" >Crear Jugador</button>
        
        {mensajeRespuesta && <p className='mt-3'>{mensajeRespuesta}</p>}
        </div>
        
        </div>
    
    
    
);

};
export default CrearJugador;

