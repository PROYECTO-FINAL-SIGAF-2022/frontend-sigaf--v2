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
      <div class="wrapper">
      <div>
      <Link to="/venta-almacenes">
        <button className="btn btn-success mb-3">+ Venta Almacen</button>
      </Link>
      </div>
      <hr></hr>
        <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis green">
            <div class="cellAnalisis">Nombre Almacen</div>
            <div class="cellAnalisis">Precio de Venta</div>
            <div class="cellAnalisis">Fecha de Venta</div>
            
            <div class="cellAnalisis">Eliminar</div>
          </div>

          {fetchDataAlmacenes?.length > 0 &&
              fetchDataAlmacenes.map((almacen) => {
                const fecha = new Date(almacen?.fecha_venta);
                const fechaConvertida = fecha.toLocaleDateString();
                return(
                  <div class="rowAnalisis" key={almacen.id_almacen}>
                    <div class="cellAnalisis" data-title="Name">
                    {almacen.descripcion_almacen}
                    </div>
                    <div class="cellAnalisis" data-title="Occupation">
                    <strong style={{color:'#429867'}}>{formateador(almacen.precio_venta)}</strong>
                    </div>
                    <div class="cellAnalisis" data-title="Location">
                    {fechaConvertida}
                    </div>
                    <div class="cellAnalisis" data-title="actions">
                    
                        <a href="#" className="table-link danger" 
                          onClick={() =>
                            handleEliminarAlmacen(
                              almacen.fecha_venta
                            )
                          }>
                          <span className="fa-stack" style={{color:'red'}}>
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>
                    </div>
                  </div>
                )
              })}
        </div>
     </div>
    </>
  );
};

export default VentasAlmacenes;
