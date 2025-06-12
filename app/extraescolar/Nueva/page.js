"use client";

import { useState } from "react";
import EditorRTE from "@/app/Componentes/EditorRTE";

export default function NuevaExtraescolar() {
  const [datosArticulo, setDatosArticulo] = useState({
    IdCategoria: 8, // Cambia el IdCategoria si es diferente para extraescolar
    tituloArticulo: "",
    contenido: "",
    autor: "",
    fechaPublicacion: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosArticulo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContenidoChange = (value) => {
    setDatosArticulo((prev) => ({
      ...prev,
      contenido: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/extraescolar/AgregaArticulo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosArticulo),
        },
      );

      if (!response.ok) {
        throw new Error("Error al enviar los datos del artículo");
      }

      await response.json();
      alert("¡Artículo creado correctamente!");
      setDatosArticulo({
        IdCategoria: 8,
        tituloArticulo: "",
        contenido: "",
        autor: "",
        fechaPublicacion: "",
        url: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el artículo");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Artículo de Extraescolar</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="IdCategoria"
          value={datosArticulo.IdCategoria}
        />

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="tituloArticulo"
            className="form-control"
            value={datosArticulo.tituloArticulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contenido</label>
          <EditorRTE
            value={datosArticulo.contenido}
            onChange={handleContenidoChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            type="text"
            name="autor"
            className="form-control"
            value={datosArticulo.autor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Publicación</label>
          <input
            type="datetime-local"
            name="fechaPublicacion"
            className="form-control"
            value={datosArticulo.fechaPublicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">URL (opcional)</label>
          <input
            type="url"
            name="url"
            className="form-control"
            value={datosArticulo.url}
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
