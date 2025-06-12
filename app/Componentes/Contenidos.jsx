import BarraSuperior from './BarraSuperior';

export default function Contenidos({ children }) {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <BarraSuperior />
        <div className="container-fluid">{children}</div>
      </div>
    </div>
  );
}
