"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function EditarAdministrativo() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [datosArticulo, setDatosArticulo] = useState({
    idArticulo: 0,
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/Administrativos/GetEditarArticulo/${id}`,
        );
        if (!res.ok) throw new Error("Artículo no encontrado");

        const data = await res.json();

        setDatosArticulo({
          idArticulo: data.idArticulo,
          tituloArticulo: data.tituloArticulo,
          contenido: data.contenido,
          autor: data.autor,
          fechaPublicacion: data.fechaPublicacion?.substring(0, 10) || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Administrativos/ActualizarArticulo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...datosArticulo,
            idCategoria: 8, // Asegura categoría "Administrativo"
          }),
        },
      );

      if (!response.ok) throw new Error("Error al guardar cambios");

      alert("Artículo administrativo actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el artículo");
    }
  };

  if (cargando) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Editar Artículo Administrativo</h3>
      <form onSubmit={handleSubmit}>
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
          <textarea
            name="contenido"
            className="form-control"
            rows="5"
            value={datosArticulo.contenido}
            onChange={handleChange}
            required
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
            type="date"
            name="fechaPublicacion"
            className="form-control"
            value={datosArticulo.fechaPublicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">URL</label>
          <input
            type="text"
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
