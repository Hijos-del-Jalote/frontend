import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import IniciarPartida from "./IniciarPartida";

// Mock de Axios para simular solicitudes HTTP
jest.mock("axios");

describe("IniciarPartida Component", () => {
  it("renderiza el componente", async () => {
    // Configura una respuesta simulada para la solicitud HTTP (puedes personalizarla según tus necesidades)
    axios.get.mockResolvedValue({ data: [{ nombre: "nombre1" }] });

    render(
      <BrowserRouter>
        <IniciarPartida />
      </BrowserRouter>
    );

    // Espera a que se resuelva la solicitud HTTP antes de realizar aserciones
    const iniciarPartidaButton = screen.getByText("Iniciar Partida");
    expect(iniciarPartidaButton).toBeInTheDocument();
  });

  // it("desactiva el botón cuando hay menos de 4 jugadores", async () => {
  //   axios.get.mockResolvedValue({
  //     data: [
  //       { nombre: "nombre1" },
  //       { nombre: "nombre2" },
  //       { nombre: "nombre3" },
  //     ],
  //   });
  
  //   const { container } = render(
  //     <BrowserRouter>
  //       <IniciarPartida />
  //     </BrowserRouter>
  //   );
  
  //   const iniciarPartidaButton = screen.getByText("Iniciar Partida");
  //   fireEvent.click(iniciarPartidaButton);
  
  //   // Espera a que se resuelva la solicitud HTTP antes de realizar aserciones
  //   await waitFor(() => {
  //     expect(container.querySelector("button")).toBeDisabled();
  //   });
  // });
  

  // it("habilita el botón cuando hay entre 4 y 12 jugadores", async () => {
  //   axios.get.mockResolvedValue({
  //     data: [
  //       { nombre: "nombre1" },
  //       { nombre: "nombre2" },
  //       { nombre: "nombre3" },
  //       { nombre: "nombre4" },
  //     ],
  //   });
  
  //   render(
  //     <BrowserRouter>
  //       <IniciarPartida />
  //     </BrowserRouter>
  //   );
  
  //   const iniciarPartidaButton = screen.getByText("Iniciar Partida");
  
  //   // Espera a que se resuelva la solicitud HTTP antes de realizar aserciones
  //   await waitFor(() => {
  //     expect(iniciarPartidaButton).not.toHaveAttribute("disabled");
  //   });
  // });
  

/*   it("activa la función handleSubmit cuando se hace clic en el botón", async () => {
    // Configura una respuesta simulada para la solicitud GET
    axios.get.mockResolvedValue({
      data: [
        { nombre: "nombre1" },
        { nombre: "nombre2" },
        { nombre: "nombre3" },
        { nombre: "nombre4" },
      ],
    });

    // Configura un mock para la solicitud PUT
    axios.put.mockResolvedValue({}); // Puedes personalizar la respuesta según tus necesidades

    render(
      <BrowserRouter>
        <IniciarPartida />
      </BrowserRouter>
    );

    const iniciarPartidaButton = screen.getByText("Iniciar Partida");
    fireEvent.click(iniciarPartidaButton);

    // Espera a que se complete la solicitud PUT antes de realizar aserciones
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  }) */
  
});
