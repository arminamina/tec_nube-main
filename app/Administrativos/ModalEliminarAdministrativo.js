import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ModalEliminarAdministrativo({
  mostrar,
  item,
  handleCerrar,
}) {
  const [error, setError] = useState(null);

  const eliminaArticulo = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Administrativos/EliminaArticulo?idArticulo=${item.idArticulo}`,
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div
        className={`modal ${mostrar ? "show" : ""}`}
        style={{ display: mostrar ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />{" "}
                Confirmar Eliminación
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCerrar}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar este artículo?</p>
              <div className="form-group">
                <label htmlFor="titulo">Título del Artículo</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  id="titulo"
                  value={item.tituloArticulo}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCerrar}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={eliminaArticulo}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      {mostrar && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
