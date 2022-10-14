import { Routes, Route } from "react-router-dom";
import { useSession } from "../../context/SessionProvider";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";
import Proveedor from '../../pages/proveedor/Proveedor';
import FormCliente from "../../pages/proveedor/FormProveedor";
import Productos from "../../pages/productos/Productos";
import MapaTest from "../../pages/mapa/MapaTest";
import FormProductos from "../../pages/productos/FormProductos";
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
