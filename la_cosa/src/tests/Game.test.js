import Game from "../Game";
import { apiCrearPartida } from "../data/apiService";
import { apiCrearJugador } from "../data/apiService";

// Mock de las funciones apiCrearJugador y apiCrearPartida
jest.mock('../data/apiService', () => ({
  apiCrearJugador: jest.fn(),
  apiCrearPartida: jest.fn(),
}));

describe('Game', () => {
  it('Crea un jugador con éxito', async () => {
    const userId = 123; 
    const nombre = 'Ejemplo';

    
    const { crearJugador } = Game();
    apiCrearJugador.mockResolvedValue(userId);

    const result = await crearJugador(nombre);

    expect(result).toBe(userId);
  });

  it('Crea una partida con éxito', async () => {
    const partidaId = 456; 
    const nombrePartida = 'Nueva Partida';
    const idJugador = 123;

    
    const { crearPartida } = Game();
    apiCrearPartida.mockResolvedValue(partidaId);

    const result = await crearPartida(nombrePartida, idJugador);

    expect(result).toBe(partidaId);
  });

});
