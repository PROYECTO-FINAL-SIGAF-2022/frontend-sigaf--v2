import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";
import { formateador } from "../../../../helpers/formateadorNumero";
// import "./Index.css";

const VentasAlmacenes = () => {
  const [
    setFetchAlmacenes,
    fetchDataAlmacenes
    // loadingAlmacenes,
    // errorAlmacenes
  ] = useFetch([]);

  const [
    setFetchDeleteAlmacenContabilidad,
    fetchDataDeleteAlmacenContabilidad
    ,
    ,
    ,
    cleanStateDeleteAlmacenContabilidad
    // loadingDeleteAlmacenContabilidad,
    // errorDeleteAlmacenContabilidad
  ] = useFetch([]);

  const handleEliminarAlmacen = (fecha) => {
    setFetchDeleteAlmacenContabilidad({
      url: `${URL}/almacenes-vender/${fecha}`,
      headersRequest: {
        method: "DELETE"
      }
    });
  };

  useEffect(() => {
    setFetchAlmacenes({
      url: `${URL}/almacenes-vender`,
      headersRequest: {
        method: "GET"
      }
    });
  }, []);

  useEffect(() => {
    if (fetchDataDeleteAlmacenContabilidad) {
      setFetchAlmacenes({
        url: `${URL}/almacenes-vender`,
        headersRequest: {
          method: "GET"
        }
      });
      cleanStateDeleteAlmacenContabilidad();
    }
  }, [fetchDataDeleteAlmacenContabilidad]);

  return (
    <>
      <Link to="/venta-almacenes">
        <button className="btn btn-success mb-3">+ Venta Almacen</button>
      </Link>
      <Card>
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Nombre Almacen</span>
              </th>
              <th className="text-center">
                <span>Precio de Venta</span>
              </th>
              <th className="text-center">
                <span>Fecha de Venta</span>
              </th>
              <th className="text-center">
                <span>Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {fetchDataAlmacenes?.length > 0 &&
              fetchDataAlmacenes.map((almacen) => (
                <tr key={almacen.id_almacen}>
                  <td className="text-center">
                    <span className="label label-default">
                      {almacen.descripcion_almacen}
                    </span>
                  </td>

                  <td className="text-center">
                    <span className="label label-default">
                      {formateador(almacen.precio_venta)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {almacen.fecha_venta}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleEliminarAlmacen(
                            almacen.fecha_venta
                          )
                        }
                      >
                        Eliminar
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default VentasAlmacenes;
