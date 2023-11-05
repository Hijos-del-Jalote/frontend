import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import axios from 'axios'; // Importa el mock personalizado
import IniciarPartida from "../components/IniciarPartida";
import { WebSocketProvider } from '../components/WebSocketContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock("axios"); // Mockea el módulo axios

describe("IniciarPartida", () => {
  
  it("maneja click del botón Abandonar Lobby ", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <WebSocketProvider>
          <IniciarPartida />
        </WebSocketProvider>
      </BrowserRouter>
    );
    const abandonarLobbyButton = getByText("Abandonar Lobby");

    // Configura el comportamiento simulado para axios.put
    axios.put.mockResolvedValue({status: 200, data: { message: "Jugador salió con exito" }});

    act(() => {
      fireEvent.click(abandonarLobbyButton);
    });

    // Espera a que se resuelva la promesa
    await waitFor(() => {
      // Verifica que el mensaje de éxito se muestra en el componente
      expect(getByText("Jugador salió con exito")).toBeInTheDocument();
    });
  });

});