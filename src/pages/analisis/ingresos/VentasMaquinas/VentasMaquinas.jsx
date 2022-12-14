import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";
import { formateador } from "../../../../helpers/formateadorNumero";
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
       
      <div class="wrapper">
      <div>
      <Link to="/venta-maquinas">
        <button className="btn btn-success mb-3">+ Venta Maquina</button>
      </Link>
      </div>
      <hr></hr>
        <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis green">
            <div class="cellAnalisis">Nombre Maquina</div>
            <div class="cellAnalisis">Precio de Venta</div>
            <div class="cellAnalisis">Fecha de Venta</div>
            
            <div class="cellAnalisis">Eliminar</div>
          </div>

          {fetchDataMaquinas?.length > 0 &&
              fetchDataMaquinas.map((maquina) => {
                const fecha = new Date(maquina?.fecha_venta_maquina);
                const fechaConvertida = fecha.toLocaleDateString();
                return(
                  <div class="rowAnalisis" key={maquina.id_maquina}>
                    <div class="cellAnalisis" data-title="Name">
                    {maquina.descripcion_maquina}
                    </div>
                    <div class="cellAnalisis" data-title="Occupation">
                    <strong style={{color:'#429867'}}>{formateador(maquina.precio_venta_maquina)}</strong>
                    </div>
                    <div class="cellAnalisis" data-title="Location">
                    {fechaConvertida}
                    </div>
                    <div class="cellAnalisis" data-title="actions">
                    
                        <a href="#" className="table-link danger" 
                          onClick={() =>
                            handleEliminarMaquina(
                              maquina.fecha_venta_maquina
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
        {fetchDataDeleteMaquinaContabilidad && <h4 className="text-success">Registro de maquina y de contabilidad eliminadas</h4>}

          

         
        </div>
     </div>
    </>
  );
};

export default VentasMaquinas;
