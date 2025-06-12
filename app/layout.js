import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import BarraLateral from './Componentes/BarraLateral';
import Contenidos from './Componentes/Contenidos';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="page-top">
        <div id="wrapper">
          <BarraLateral />
          <Contenidos>{children}</Contenidos>
        </div>
      </body>
    </html>
  );
}
