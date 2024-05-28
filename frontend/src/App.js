import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; 
import Home from "./components/Home";
import RegistroEstablecimiento from "./components/Registro";
import IniciarSesionEstablecimiento from "./components/IniciarSesion";
import ListaDeReproduccionCliente from "./components/ListaDeReproducciónCliente";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MesasAdmin from "./components/MesasAdmin";
import Cookies from "./components/Cookies";
import TablaClientes from "./components/TablaClientes";
import Error404 from "./components/Error404";

function App() {
  return (
    <Router>
      <Cookies />
      <Header />
      <Routes>
        <Route
          path="/ListaDeReproduccionCliente"
          element={
            <PrivateRoute redirectTo="/">
              <ListaDeReproduccionCliente />
            </PrivateRoute>
          }
        />
        
        <Route path="/" element={<Home />} />
        <Route path="/RegistroEstablecimiento" element={<RegistroEstablecimiento />} />
        <Route path="/IniciarSesionEstablecimiento" element={<IniciarSesionEstablecimiento />} />
        <Route path="/MesasAdmin" element={<MesasAdmin />} />
        <Route path="/TablaClientes" element={<TablaClientes />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;