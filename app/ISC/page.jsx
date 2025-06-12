"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalEliminarISC from "./ModalEliminarISC";

export default function ISC() {
  const [general, setGeneral] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [muestraModalEliminar, setMuestraModalEliminar] = useState(false);
  const handleMuestraEliminar = () => setMuestraModalEliminar(true);
  const handleCierraEliminar = () => setMuestraModalEliminar(false);

  const [articuloSeleccionado, setArticuloSelecionado] = useState({
    idArticulo: 0,
    tituloArticulo: "",
    contenido: "",
    autor: "",
    fechaPublicacion: "",
    url: "",
  });

  function eliminarArticuloSeleccionad(item) {
    setArticuloSelecionado(item);
    handleMuestraEliminar();
  }

  useEffect(() => {
    const obtenListadoArticulosISC = async () => {
      try {
        // Hacer el request GET
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ISC/ListadoISC`,
        );
        // Actualizar el estado de datos
        setGeneral(response.data);
        setCargando(false);
      } catch (error) {
        // En caso de error
        setError(error);
        setCargando(false);
      }
    };
    // llamar a la funcion
    obtenListadoArticulosISC();
  }, []);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid">
      <h1>Listado de Articulos Publicados en ISC</h1>
      <div style={{ textAlign: "right" }} className="mb-3">
        <a href="/ISC/Nueva" className="btn btn-success">
          Nueva Publicacion
        </a>
      </div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <table
          className="table table-bordered dataTable"
          id="dataTable"
          width="100%"
          cellSpacing="0"
          role="grid"
          aria-describedby="dataTable_info"
          style={{ width: "100%" }}
        >
          <thead>
            <tr role="row">
              <th style={{ width: "5%" }}>Id</th>
              <th style={{ width: "20%" }}>Titulo</th>
              <th style={{ width: "25%" }}>Contenido</th>
              <th style={{ width: "10%" }}>Autor</th>
              <th style={{ width: "10%" }}>Fecha de Publicacion</th>
              <th style={{ width: "20%" }}>URL</th>
              <th style={{ width: "30%", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {general.map((item) => {
              return (
                <tr key={item.idArticulo} className="odd">
                  <td style={{ maxWidth: "20px" }}>{item.idArticulo} </td>
                  <td>{item.tituloArticulo} </td>
                  <td style={{ maxWidth: "200px", overflow: "hidden" }}>
                    {item.contenido.substring(0, 100) + "..."}{" "}
                  </td>
                  <td>{item.autor}</td>
                  <td>{item.fechaPublicacion} </td>
                  <td style={{ maxWidth: "200px", overflow: "hidden" }}>
                    {item.url}{" "}
                  </td>
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
                      href={`/ISC/Editar?id=${item.idArticulo}`}
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </a>

                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarArticuloSeleccionad(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalEliminarISC
        mostrar={muestraModalEliminar}
        item={articuloSeleccionado}
        handleCerrar={handleCierraEliminar}
      />
    </div>
  );
}
