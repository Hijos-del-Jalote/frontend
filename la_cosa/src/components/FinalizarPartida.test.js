import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import FinalizarPartida from "./FinalizarPartida";

jest.mock('axios');

test('Probar función FinalizarPartida', async () => {
  const idPartida = 1;
  const data = {
    finalizada: true,
    idGanador: 2
  };

  axios.get.mockResolvedValue({ data });

  const { getByText } = render(<FinalizarPartida idPartida={idPartida} />);

  // Espera a que la solicitud POST se complete y el componente se actualice
  await waitFor(() => {
    expect(getByText(`La partida está finalizada. El ganador es el jugador con ID: ${data.idGanador}`)).toBeInTheDocument();
  });
});