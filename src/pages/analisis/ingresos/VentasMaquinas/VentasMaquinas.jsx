import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";
// import "../Index.css";

const VentasMaquinas = () => {
  const [
    setFetchMaquinas,
    fetchDataMaquinas
    // loadingMaquinas,
    // errorMaquinas
  ] = useFetch([]);

  const [
    setFetchDeleteMaquinaContabilidad,
    fetchDataDeleteMaquinaContabilidad
    ,
    ,
    ,
    cleanStateDeleteMaquinaContabilidad
    // loadingDeleteMaquinaContabilidad,
    // errorDeleteMaquinaContabilidad
  ] = useFetch([]);

  const handleEliminarMaquina = (fecha) => {
    setFetchDeleteMaquinaContabilidad({
      url: `${URL}/maquinas-vendidas/${fecha}`,
      headersRequest: {
        method: "DELETE"
      }
    });
  };

  useEffect(() => {
    setFetchMaquinas({
      url: `${URL}/maquinas-vendidas`,
      headersRequest: {
        method: "GET"
      }
    });
  }, []);

  useEffect(() => {
    if (fetchDataDeleteMaquinaContabilidad) {
      setFetchMaquinas({
        url: `${URL}/maquinas-vendidas`,
        headersRequest: {
          method: "GET"
        }
      });
      cleanStateDeleteMaquinaContabilidad();
    }
  }, [fetchDataDeleteMaquinaContabilidad]);

  return (
    <>
      <Link to="/venta-maquinas">
        <button className="btn btn-success mb-3">+ Venta Maquina</button>
      </Link>
      <Card>
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Nombre Maquina</span>
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
          {fetchDataMaquinas?.length > 0 &&
              fetchDataMaquinas.map((maquina) => (
                <tr key={maquina.id_maquina}>
                  <td className="text-center">
                    <span className="label label-default">
                      {maquina.descripcion_maquina}
                    </span>
                  </td>

                  <td className="text-center">
                    <span className="label label-default">
                      ${maquina.precio_venta_maquina}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {maquina.fecha_venta_maquina}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleEliminarMaquina(
                            maquina.fecha_venta_maquina
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
        {fetchDataDeleteMaquinaContabilidad && <h4 className="text-success">Registro de maquina y de contabilidad eliminadas</h4>}

      </Card>
    </>
  );
};

export default VentasMaquinas;
