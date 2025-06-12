"use client"; // if using Next 13+

import { useState } from "react";
import EditorRTE from "@/app/Componentes/EditorRTE";

export default function NuevoAdministrativo() {
  const [datosArticulo, setDatosArticulo] = useState({
    IdCategoria: "8", // Categoría fija para administrativos
    TituloArticulo: "",
    Contenido: "",
    Autor: "",
    FechaPublicacion: "",
    URL: "",
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
      Contenido: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Administrativos/AgregaArticulo`,
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
      alert("Artículo administrativo creado correctamente!");
      setDatosArticulo({
        IdCategoria: "8",
        TituloArticulo: "",
        Contenido: "",
        Autor: "",
        FechaPublicacion: "",
        URL: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el artículo administrativo");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Artículo Administrativo</h3>
      <form onSubmit={handleSubmit}>
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
