import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import CrearPartida from './CrearPartida';

// Mockear la función de axios.post para simular una respuesta exitosa
jest.mock('axios');

describe('CrearPartida', () => {
  it('debe manejar la creación de partida con éxito', async () => {
    // Configura el mock de axios para devolver una respuesta exitosa
    axios.post.mockResolvedValue({ data: 'Partida creada con éxito' });

    const { getByText, getByLabelText } = render(<CrearPartida />);

    // Simula la entrada de un nombre de partida
    const nombrePartidaInput = getByLabelText('Nombre de la partida:');
    fireEvent.change(nombrePartidaInput, { target: { value: 'Mi Partida' } });

    // Simula el envío del formulario
    const crearPartidaButton = getByText('Crear Partida', { selector: 'button.btn.btn-primary' });
    fireEvent.click(crearPartidaButton);

    // Espera a que la respuesta del backend se refleje en la interfaz
    await waitFor(() => {
      const mensajeRespuesta = getByText('Partida creada con éxito');
      expect(mensajeRespuesta).toBeInTheDocument();
    });
  });
});

describe('CrearPartida', () => {
    it('debe manejar errores al crear la partida', async () => {
      // Configura el mock de axios para simular un error
      axios.post.mockRejectedValue(new Error('Error al crear la partida'));
  
      const { getByText, getByLabelText } = render(<CrearPartida />);
  
      // Simula la entrada de un nombre de partida
      const nombrePartidaInput = getByLabelText('Nombre de la partida:');
      fireEvent.change(nombrePartidaInput, { target: { value: 'Mi Partida' } });
  
      // Simula el envío del formulario
      const crearPartidaButton = getByText('Crear Partida', { selector: 'button.btn.btn-primary' });
      fireEvent.click(crearPartidaButton);
  
      // Espera a que el mensaje de error se refleje en la interfaz
      await waitFor(() => {
        const mensajeRespuesta = getByText('Error al crear la partida');
        expect(mensajeRespuesta).toBeInTheDocument();
      });
    });
  });
  