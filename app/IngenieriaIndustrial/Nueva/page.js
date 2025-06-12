"use client"; // if using Next 13+

import { useState } from "react";
import EditorRTE from "@/app/Componentes/EditorRTE";

export default function Nueva() {
  // Estado para almacenar los datos del artículo
  const [datosArticulo, setDatosArticulo] = useState({
    IdCategoria: "",
    TituloArticulo: "",
    Contenido: "",
    Autor: "",
    FechaPublicacion: "",
    URL: "",
  });

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosArticulo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el cambio en el editor de contenido
  const handleContenidoChange = (value) => {
    setDatosArticulo((prev) => ({
      ...prev,
      Contenido: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/IngIndustrial/AgregaArticuloIndustrial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosArticulo),
        },
      );

      if (!response.ok) {
        throw new Error("Error al enviar los datos del articulo");
      }

      const data = await response.json();
      alert("Artículo creado correctamente!");
      setDatosArticulo({
        IdCategoria: "",
        TituloArticulo: "",
        Contenido: "",
        Autor: "",
        FechaPublicacion: "",
        URL: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el articulo");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Artículo</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Categoría (ID)</label>
          <select
            name="IdCategoria"
            className="form-control"
            value={datosArticulo.IdCategoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="4">II</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="TituloArticulo"
            className="form-control"
            value={datosArticulo.TituloArticulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contenido</label>
          <EditorRTE
            value={datosArticulo.Contenido}
            onChange={handleContenidoChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            type="text"
            name="Autor"
            className="form-control"
            value={datosArticulo.Autor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Publicación</label>
          <input
            type="datetime-local"
            name="FechaPublicacion"
            className="form-control"
            value={datosArticulo.FechaPublicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">URL (opcional)</label>
          <input
            type="url"
            name="URL"
            className="form-control"
            value={datosArticulo.URL}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Artículo
        </button>
      </form>
    </div>
  );
}
