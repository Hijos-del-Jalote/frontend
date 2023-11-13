import React from "react";
import { render, waitFor,act, fireEvent } from "@testing-library/react";
import Defensa from "../components/Defender";
import { BrowserRouter } from "react-router-dom";

const mockWebSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
};

const jugador = {
  id: 1,
  nombre: "Pedro",
  cartas: [
    { id: 1, tipo: "defensa", nombre: "No gracias" },
    { id: 2, tipo: "defensa", nombre: "Carta2" },
  ],
};

jest.mock("../components/WebSocketContext", () => ({
  useWebSocket: () => mockWebSocket,
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "mocked-id"),
  })),
}));

describe("Efecto Cartas", () => {
  it('Al jugar no gracias en respuesta de un intercambio no se hace intercambio" event',  async () => {
    const { container, getByText, getByTestId} = render(
      <BrowserRouter>
        <Defensa jugadorActual={jugador} webSocket={mockWebSocket} />
      </BrowserRouter>
    );
    console.log(container.innerHTML);
    const intercambioRequestEvent = {
      event: "intercambio_request",
      data: {
        id: 17,
        descartada: false,
        template_carta: "Determinacion",
        jugador: 4,
        partida: 1,
      },
    };
    act(() => {
    mockWebSocket.onmessage({ data: JSON.stringify(intercambioRequestEvent) });
});
    await waitFor(() => {
      const defenderButton = getByText("Defender");
      const noDefenderButton = getByText("No defender");
      expect(defenderButton).toBeInTheDocument();
      expect(noDefenderButton).toBeInTheDocument();
    }, { timeout: 1000 });

    act(() => {
        fireEvent.click(getByText("Defender"));
      });

      await waitFor(() => {
        const test = getByText("No gracias");
        expect(test).toBeInTheDocument();
      }, { timeout: 1000 });

      act(() => {
        fireEvent.click(getByTestId("onClickCarta"));
      });

      const efectoNoGracias = {
        event: "fin_de_turno",
      };
      act(() => {
        mockWebSocket.onmessage({ data: JSON.stringify(efectoNoGracias) });
    });
    await waitFor(() => {
        const test = getByText("No gracias");
        expect(test).toBeInTheDocument();
      }, { timeout: 1000 });
  });
});