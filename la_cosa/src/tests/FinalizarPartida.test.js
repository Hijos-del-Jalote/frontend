import React from 'react';
import { render, screen } from '@testing-library/react';
import FinalizarPartida from '../components/FinalizarPartida';

test('Muestra el mensaje correcto cuando los Humanos son ganadores', () => {
  const winners = [11, 12, 13];
  render(<FinalizarPartida isHumanoTeamWinner={true} winners={winners} />);
  const mensaje = screen.getByText(/La partida termina porque los Humanos ganaron como equipo/i);
  const ganadores = screen.getByText(/Jugador 11/i);
  expect(mensaje).toBeInTheDocument();
  expect(ganadores).toBeInTheDocument();
});

test('Muestra el mensaje correcto cuando La Cosa e Infectados son ganadores', () => {
  const winners = [11, 12, 13];
  render(<FinalizarPartida isHumanoTeamWinner={false} winners={winners} />);
  const mensaje = screen.getByText(/La partida termina porque La Cosa y los Infectados ganaron como equipo/i);
  const ganadores = screen.getByText(/Jugador 11/i);
  expect(mensaje).toBeInTheDocument();
  expect(ganadores).toBeInTheDocument();
});
