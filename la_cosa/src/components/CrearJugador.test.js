import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CrearJugador from "./CrearJugador";
import { MemoryRouter } from "react-router-dom";

// Mockear la función de axios.post para simular una respuesta exitosa
jest.mock("axios");

describe("CrearJugador", () => {
  // Test Suites
  it("debe manejar la creación de jugador con éxito", async () => {
    // Configura el mock de axios para devolver una respuesta exitosa
    axios.post.mockResolvedValue({ status: 201 });

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <CrearJugador />
      </MemoryRouter>
    );

    // Simula la entrada de un nombre de partida
    const nombreJugador = getByTestId("nombreJugadorInput");
    fireEvent.change(nombreJugador, { target: { value: "Pepito" } });

    // Simula el envío del formulario
    const crearJugador = getByTestId("buttonJugador");
    fireEvent.click(crearJugador);

    // Espera a que la respuesta del backend se refleje en la interfaz
    await waitFor(() => {
      const mensajeRespuesta = getByText(
        "Jugador creado exitosamente, redirigiendo al inicio ..."
      );
      expect(mensajeRespuesta).toBeInTheDocument();
    });
  });
});

describe("CrearJugador", () => {
  it("debe manejar errores al crear el jugador", async () => {
    // Configura el mock de axios para simular un error
    axios.post.mockResolvedValue({ status: 400 });

    const { getByText, getByTestId } = render(<MemoryRouter><CrearJugador /></MemoryRouter>);

    // Simula la entrada de un nombre de partida
    const nombreJugador = getByTestId("nombreJugadorInput");
    fireEvent.change(nombreJugador, { target: { value: "Pepito" } });

    // Simula el envío del formulario
    const crearJugador = getByText("Crear Jugador", {
      selector: "button.btn.btn-primary",
    });
    fireEvent.click(crearJugador);

    // Espera a que el mensaje de error se refleje en la interfaz
    await waitFor(() => {
      const mensajeRespuesta = getByText("Error al crear el jugador");
      expect(mensajeRespuesta).toBeInTheDocument();
    });
  });
});
