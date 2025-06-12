"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import EditorRTE from "@/app/Componentes/EditorRTE";

export default function Editar() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [datosArticulo, setDatosArticulo] = useState({
    idArticulo: 0,
    idCategoria: "",
    tituloArticulo: "",
    contenido: "",
    autor: "",
    fechaPublicacion: "",
    url: "",
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticulo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ISC/GetEditarArticulo/${id}`,
        );
        if (!res.ok) throw new Error("Artículo no encontrado");
        const data = await res.json();

        // Formato de hora local (datetime-local)
        const fechaISO = new Date(data.fechaPublicacion)
          .toISOString()
          .slice(0, 16);

        setDatosArticulo({
          idArticulo: data.idArticulo,
          idCategoria: data.idCategoria,
          tituloArticulo: data.tituloArticulo,
          contenido: data.contenido,
          autor: data.autor,
          fechaPublicacion: fechaISO,
          url: data.url || "",
        });
      } catch (error) {
        console.error(error);
        alert("Error al cargar el artículo");
      } finally {
        setCargando(false);
      }
    };

    fetchArticulo();
  }, [id]);

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosArticulo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el cambio en el editor de contenido
  const handleContentChange = (newContent) => {
    setDatosArticulo((prev) => ({
      ...prev,
      contenido: newContent,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ISC/ActualizarArticulo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosArticulo),
        },
      );

      if (!response.ok) throw new Error("Error al guardar cambios");

      alert("Artículo actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el artículo");
    }
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h3>Editar Artículo</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Categoría (ID)</label>
          <input
            type="number"
            name="idCategoria"
            className="form-control"
            value={datosArticulo.idCategoria}
            onChange={handleChange}
            required
          />
        </div>

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
            onChange={handleContentChange}
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
