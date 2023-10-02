import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import RobarCarta from "./RobarCarta";

jest.mock('axios');


test('Probar funcion RobarCarta', async () =>{
    const data={
        idJugador: 2,
        carta: {
            id:1,
            nombre: 'fedfes',
            descripcion: 'sds',
            tipo: 'panico',
        }
    };

    axios.get.mockResolvedValue({data});

    const {getByText} = render(<RobarCarta idJugador={2}/>);

    const robarCartaButton = getByText('Robar Carta');

    fireEvent.click(robarCartaButton); // Simula hacer clic en el botón

    // Espera a que se actualice la interfaz después de la respuesta de la solicitud
    await waitFor(() => {
    expect(getByText(`Jugador: ${data.idJugador}`)).toBeInTheDocument();
    expect(getByText(`Carta: ${data.carta}`)).toBeInTheDocument();
});
});