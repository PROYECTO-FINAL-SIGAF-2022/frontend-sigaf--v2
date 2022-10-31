import { Routes, Route } from "react-router-dom";
import { useSession } from "../../context/SessionProvider";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";
import Proveedor from "../../pages/proveedor/Proveedor";
import FormCliente from "../../pages/proveedor/FormProveedor";
import Productos from "../../pages/productos/Productos";
import MapaTest from "../../pages/mapa/MapaTest";
import FormProductos from "../../pages/productos/FormProductos";
import Almacenes from "../../pages/almacenes/Almacenes";
import Maquinas from "../../pages/maquinas/maquinas";
import Personal from "../../pages/personal/Persona";
import Explotaciones from "../../pages/explotaciones/Explotaciones";
import Campos from "../../pages/campos/Campos";
import Costos from "../../pages/analisis/costos/Costos";
import Precios from "../../pages/analisis/precios/Precios";

function Rutas () {
  const session = useSession();

  if (session != null) {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='/Proveedores' exact element={<Proveedor/>} />
        <Route path='/Formulario-Proveedor' exact element={<FormCliente/>} />
        <Route path='/Productos' exact element={<Productos/>} />
        <Route path='/Mapa' exact element={<MapaTest/>} />
        <Route path='/Formulario-Productos' exact element={<FormProductos/>} />
        <Route path='/Maquinas' exact element={<Maquinas/>} />
        <Route path='/Almacenes' exact element={<Almacenes/>} />
        <Route path='/Personal' exact element={<Personal/>} />
        <Route path='/Explotaciones' exact element={<Explotaciones/>} />
        <Route path='/Campos' exact element={<Campos/>} />
        <Route path='/Costos' exact element={<Costos/>} />
        <Route path='/Precios' exact element={<Precios/>} />
        <Route path="*" exact element={<Home />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" exact element={<Login />} />
      <Route path="/registrarse" exact element={<Register />} />
      <Route path="*" exact element={<Login />} />
    </Routes>
  );
}

export default Rutas;
