"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import EditorRTE from "@/app/Componentes/EditorRTE";

export default function EditarIE() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [datosArticulo, setDatosArticulo] = useState({
    idArticulo: 0,
    idCategoria: 5,
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/IE/GetEditarArticulo/${id}`,
        );
        if (!res.ok) throw new Error("Artículo no encontrado");
        const data = await res.json();

        const fechaISO = new Date(data.fechaPublicacion)
          .toISOString()
          .slice(0, 16);

        setDatosArticulo({
          idArticulo: data.idArticulo,
          idCategoria: 5, // fijo a IE
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosArticulo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (newContent) => {
    setDatosArticulo((prev) => ({
      ...prev,
      contenido: newContent,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/IE/ActualizarArticulo/${id}`,
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
      <h3>Editar Artículo de IE</h3>
      <form onSubmit={handleSubmit}>
        {/* idCategoria oculto y fijo */}
        <input
          type="hidden"
          name="idCategoria"
          value={datosArticulo.idCategoria}
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
