"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalEliminarAdministrativo from "./ModalEliminarAdministrativo";

export default function Administrativos() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [muestraModalEliminar, setMuestraModalEliminar] = useState(false);
  const handleMuestraEliminar = () => setMuestraModalEliminar(true);
  const handleCierraEliminar = () => setMuestraModalEliminar(false);

  const [articuloSeleccionado, setArticuloSeleccionado] = useState({
    idArticulo: 0,
    tituloArticulo: "",
    contenido: "",
    autor: "",
    fechaPublicacion: "",
    url: "",
  });

  function eliminarArticuloSeleccionado(item) {
    setArticuloSeleccionado(item);
    handleMuestraEliminar();
  }

  useEffect(() => {
    const obtenerListado = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/Administrativos/ListadoAdministrativos`,
        );
        setLista(response.data);
        setCargando(false);
      } catch (error) {
        setError(error);
        setCargando(false);
      }
    };
    obtenerListado();
  }, []);

  if (cargando) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container-fluid">
      <h1>Listado de Artículos Administrativos</h1>
      <div style={{ textAlign: "right" }} className="mb-3">
        <a href="/Administrativos/Nueva" className="btn btn-success">
          Nuevo Artículo
        </a>
      </div>
      <table className="table table-bordered" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>ID</th>
            <th style={{ width: "25%" }}>Título</th>
            <th style={{ width: "20%" }}>Autor</th>
            <th style={{ width: "30%" }}>Fecha de Publicación</th>
            <th style={{ width: "20%", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.idArticulo}>
              <td>{item.idArticulo}</td>
              <td>{item.tituloArticulo}</td>
              <td>{item.autor}</td>
              <td>{item.fechaPublicacion}</td>
              <td
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <a
                  href={`/Administrativos/Editar?id=${item.idArticulo}`}
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </a>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarArticuloSeleccionado(item)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalEliminarAdministrativo
        mostrar={muestraModalEliminar}
        item={articuloSeleccionado}
        handleCerrar={handleCierraEliminar}
      />
    </div>
  );
}
