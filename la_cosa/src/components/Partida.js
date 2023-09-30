import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MultiChoiceModal from "./Modal";

export default function Partida() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [jugadores, setJugadores] = useState([
    { nombre: "nombre1" },
    { nombre: "nombre2" },
    { nombre: "nombre3" },
    { nombre: "nombre4" },
  ]);

  const [cartas, setCartas] = useState([
    {
      id: 1,
      nombre: "fedfes",
      descripcion: "sds",
      tipo: "panico",
    },
    {
      id: 1,
      nombre: "fedfes",
      descripcion: "sds",
      tipo: "panico",
    },
    {
      id: 1,
      nombre: "fedfes",
      descripcion: "sds",
      tipo: "panico",
    },
  ]);

  useEffect(() => {
    //para traer jugadores
    axios
      .get(`http://localhost:8000/jugador?idPArtida=${id}`)
      .then((data) => setJugadores(data))
      .catch((error) => console.log(error));
    //para repartir cartas
    axios
      .get(`http://localhost:8000/cartas/repartir?idPartida=${id}`)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Opción 1', 'Opción 2', 'Opción 3'];

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmModal = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setShowModal(false);
  };

  return (
    <>
      <div>
        <h2>Listado de Oponentes:</h2>
        {jugadores.map((jugador, index) => (
          <div key={index}>{jugador.nombre}</div>
        ))}
      </div>
      <div>
        <h2>Mano del Jugador:</h2>
        {cartas.map((carta, index) => (
          <div key={index}>
            <button onClick={handleOpenModal}>{carta.tipo}</button>
            {showModal && (
              <MultiChoiceModal
                options={options}
                onConfirm={handleConfirmModal}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
