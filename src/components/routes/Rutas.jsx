import { Routes, Route } from "react-router-dom";
import { useSession } from "../../context/SessionProvider";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";
import Proveedor from "../../pages/proveedor/Proveedor";
import FormCliente from "../../pages/proveedor/FormProveedor";
import Productos from "../../pages/productos/Productos";
import FormProductos from "../../pages/productos/FormProductos";
import Almacenes from "../../pages/almacenes/Almacenes";
import Maquinas from "../../pages/maquinas/maquinas";
import Personal from "../../pages/personal/Persona";
import MapaHome from "../../pages/mapa/MapaHOme";
import HomePerfilesEstablecimientos from "../../pages/perfilesEstablecimientos/HomePerfilesEstablecimientos";
import HomeEstablecimientos from "../../pages/establecimientos/HomeEstablecimientos";
import FormPersonal from "../../pages/personal/FormPersonal";
import FormMaquinas from "../../pages/maquinas/FormMaquinas";
import UpdateProveedor from "../../pages/proveedor/UpdateProveedor";
import Explotaciones from "../../pages/explotaciones/Explotaciones";
import Campos from "../../pages/campos/Campos";
import Ingresos from "../../pages/analisis/ingresos/Index";
import Egresos from "../../pages/analisis/egresos/Index";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import FormGastosMaquinas from "../../pages/analisis/egresos/formularios/gastosMaquinas/FormGastosMaquinas";
import FormVentasCosechas from "../../pages/analisis/ingresos/VentasCosechas/FormVentasCosechas";
import FormVentasAlmacenes from "../../pages/analisis/ingresos/VentasAlmacenes/FormVentasAlmacenes";
import FormVentasMaquinas from "../../pages/analisis/ingresos/VentasMaquinas/FormVentasMaquinas";
function Rutas () {
  const session = useSession();

  const [setConfigFetchVerifyToken, fetchDataVerifyToken,,, cleanStates] = useFetch();
  useEffect(() => {
    if (session) {
      // console.log("first");
      setConfigFetchVerifyToken({
        url: `${URL}/verificar-token-establecimiento-usuario`,
        headersRequest: {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      });
    }

    return () => {
      cleanStates();
    };
  }, [session]);

  // console.log(fetchDataVerifyToken);
  // console.log(errorVerifyToken);
  if (session != null) {
    // console.log(fetchDataVerifyToken);
    if (fetchDataVerifyToken?.length > 0) {
      return (
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* <Route path="/perfiles-establecimientos" exact element={<HomePerfilesEstablecimientos />} /> */}
          <Route path='/proveedores' exact element={<Proveedor/>} />
          <Route path='/formulario-proveedor' exact element={<FormCliente/>} />
          <Route path='/productos' exact element={<Productos/>} />
          <Route path='/mapa' exact element={<MapaHome/>} />
          <Route path='/formulario-productos' exact element={<FormProductos/>} />
          <Route path='/formulario-gastos' exact element={<FormGastosMaquinas/>} />
          <Route path='/maquinas' exact element={<Maquinas/>} />
          <Route path='/almacenes' exact element={<Almacenes/>} />
          <Route path='/personal' exact element={<Personal/>} />
          <Route path="/formulario-personal" exact element={<FormPersonal/>}/>
          <Route path="/formulario-maquinas" exact element={<FormMaquinas/>}/>
          <Route path="/actualizar-proveedor/:proid" exact element={<UpdateProveedor/>}/>
          <Route path='/Explotaciones' exact element={<Explotaciones/>} />
          <Route path='/Campos' exact element={<Campos/>} />
          <Route path='/Ingresos' exact element={<Ingresos/>} />
          <Route path='/Egresos' exact element={<Egresos/>} />
          <Route path='/venta-cosecha' exact element={<FormVentasCosechas/>} />
          <Route path='/venta-almacenes' exact element={<FormVentasAlmacenes/>} />
          <Route path='/venta-maquinas' exact element={<FormVentasMaquinas/>} />
          <Route path="*" exact element={<Home />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/perfiles-establecimientos" exact element={<HomePerfilesEstablecimientos />} />
          <Route path='/crear-establecimientos' exact element={<HomeEstablecimientos/>} />
          <Route path="*" exact element={<HomePerfilesEstablecimientos />} />
        </Routes>
      );
    }
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
