import Image from "next/image";
import cohete from "./undraw_rocket.svg";
import logoISC from "../Recursos/img/logoISCPNG.png";

export default function BarraLateral() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">ADMINISTRACIÓN</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Inicio</span>
        </a>
      </li>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <a className="nav-link" href="/General">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>General</span>
        </a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="./IGE">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span> Ing. Gestión Empresarial</span>
        </a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/Docentes">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Docentes</span>
        </a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/IngenieriaIndustrial">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>II</span>
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/IE">
          <i className="fas fa-fw fa-user-tie"></i>
          <span>Ingeniería Electromecánica</span>
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/Administrativos">
          <i className="fas fa-fw fa-user-tie"></i>
          <span>Administrativos</span>
        </a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/extraescolar">
          <i className="fas fa-fw fa-user-tie"></i>
          <span>Extra escolar/Tutorias</span>
        </a>
      </li>

      <li className="nav-item active">
        <a className="nav-link" href="/IM">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Ingenieria en minas</span>
        </a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/ISC">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Ingenieria en Sistemas</span>
        </a>
      </li>

      <div className="sidebar-card d-none d-lg-flex">
        <Image
          className="sidebar-card-illustration mb-2 fade-image"
          src={logoISC}
          alt="ISC"
          style={{ height: "100px", width: "100px" }}
        />
        <p className="text-center mb-2">
          <strong>Proyecto Tabloide Tek</strong> Programacion Web
        </p>
        <p className="text-center mb-2">Enero - Junio 2025 </p>
        <p className="text-center mb-2">
          Ingenieria en Sistemas Computacionales{" "}
        </p>
      </div>
    </ul>
  );
}
