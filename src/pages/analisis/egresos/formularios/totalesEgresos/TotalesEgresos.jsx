import { useRef, useState, useEffect } from "react";

import { Card } from "reactstrap";
// import { Link } from "react-router-dom";
// import Alerta from "../../../../components/layouts/Alerta";
// import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";
import { formateador } from "../../../../../helpers/formateadorNumero";
const TotalesEgresos = () => {

  const [
    setFetchGastoMaquina,
    fetchDataGastoMaquina,
    loadingGastoMaquina
    // errorAlmacenes
  ] = useFetch([]);

  const [
    setFetchPagoPersonal,
    fetchDataPagoPersonal,
    loadingPagoPersonal
    // errorAlmacenes
  ] = useFetch([]);

  const [
    setFetchAlmacenes,
    fetchDataAlmacenes,
    loadingAlmacenes
    // errorAlmacenes
  ] = useFetch([]);

  const [
    setFetchMaquinas,
    fetchDataMaquinas,
    loadingMaquinas
    // errorMaquinas
  ] = useFetch([]);

  const [
    setFetchProductos,
    fetchDataProductos,
    loadingProductos
    // errorContabilidadCosechas
  ] = useFetch([]);

  const total = useRef(0);

  useEffect(() => {
    total.current = 0;

    setFetchGastoMaquina({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "GET"
      }
    });

    setFetchPagoPersonal({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "GET"
      }
    });

    setFetchAlmacenes({
      url: `${URL}/almacenes`,
      headersRequest: {
        method: "GET"
      }
    });
    
    setFetchMaquinas({
      url: `${URL}/maquinas`,
      headersRequest: {
        method: "GET"
      }
    }); 

    setFetchProductos({
      url: `${URL}/productos`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      total.current = 0;
    };
  }, []);

  useEffect(() => {
    total.current = 0;

    return () => {
      total.current = 0;
    };
  }, [
    loadingGastoMaquina,
    loadingPagoPersonal,
    loadingAlmacenes,
    loadingMaquinas,
    loadingProductos
  ]);

  const [contable, setContable] = useState("");

  const handleChangeContable = (e) => {
    const contable = e.target.value;
    // console.log(parcela);
    setContable(contable);
  };

  useEffect(() => {
    total.current = 0;

    if (contable === "productos") {
      setFetchProductos({
        url: `${URL}/productos`,
        headersRequest: {
          method: "GET"
        }
      });
    }

    return () => {
      total.current = 0;
    };
  }, [contable]);

  const contador = (precio) => {
    total.current += parseInt(precio);
  };
  total.current = 0;

  return (
   <>
    <div class="wrapper"> 
    <div className="d-inline px-3" style={{ width: "20%" }}>
        <label htmlFor="smallSelect" className="form-label d-inline">
          Filtrar 
        </label>
       
      <div class="selectCostoDiv mx-3">
      <select className="selectCosto"
      id="smallSelect"
       defaultValue=""
       onChange={handleChangeContable}
      >
          <option value="" disabled>Todos</option>
          <option value="productos">Productos</option>
      </select>
    </div>
        
      </div>
    <div className="d-inline px-3" style={{ width: "20%" }}></div>
      <div className="scrollCard" style={{ overflowY: "scroll", height: "400px" }}> {/* 363 */}
      <hr />
      <h4 className="text-center" >Productos</h4>
      {fetchDataProductos?.length > 0
    ? (
      <div class="tableAnalisis">
      <>
        <div class="rowAnalisis headerAnalisis blue">
          <div class="cellAnalisis">Descripcion</div>
          <div class="cellAnalisis">Precio de compra</div>
          <div class="cellAnalisis">Fecha de Compra</div>
        </div>
     
        {fetchDataProductos?.length > 0 && (
          <>
            {
              fetchDataProductos?.map((producto) => {
                const fecha = new Date(producto?.fecha_compra);
                const fechaConvertida = fecha.toLocaleDateString();
                
                return(
                  <div class="rowAnalisis" key={`producto-${producto?.id_producto}`}>
                <div class="cellAnalisis" data-title="Name">
                {producto?.descripcion_producto}
                </div>
                <div class="cellAnalisis" data-title="Occupation">
                <strong style={{color:'red'}}>{formateador(producto?.precio_total_producto)}
                      {contador(producto?.precio_total_producto)}</strong>
                </div>
                <div class="cellAnalisis" data-title="Location">
                {fechaConvertida}
                </div>
              </div>
              )})
            }
          </>
        )}
      </>
      </div>
      )
    : (
    <h3 className="text-danger text-center">No hay datos de productos cargados..</h3>
      )}
      <hr /> 
      <h4 className="text-center" >Maquinas</h4>
      {fetchDataProductos?.length > 0
    ? (
      <div class="tableAnalisis">
      <div class="rowAnalisis headerAnalisis blue">
        <div class="cellAnalisis">Descripcion</div>
        <div class="cellAnalisis">Precio de compra</div>
        <div class="cellAnalisis">Fecha de Compra</div>
      </div>
      {fetchDataMaquinas?.length > 0 && (
        <>
          {
            fetchDataMaquinas?.map((maquina) => {
              const fecha = new Date(maquina.fecha_adquisicion_maquina);
              const fechaConvertida = fecha.toLocaleDateString();
              
              return(
                <div class="rowAnalisis" key={`maquina-${maquina?.id_maquina}`}>
                <div class="cellAnalisis" data-title="Name">
                {maquina?.descripcion_maquina}
                </div>
                <div class="cellAnalisis" data-title="Occupation">
                <strong style={{color:'red'}}>{formateador(maquina?.precio_adquisicion_maquina)}
                    {contador(maquina.precio_adquisicion_maquina)}</strong>
                </div>
                <div class="cellAnalisis" data-title="Location">
                {fechaConvertida}
                </div>
              
              </div>
            )})
          }
        </>
      )}
      </div>
      )
    : (
    <h3 className="text-danger text-center">No hay datos de maquinas cargadas..</h3>
      )}
  <hr />          
  <h4 className="text-center" >Almacenes</h4>
  {fetchDataAlmacenes?.length > 0
    ? (
      <div class="tableAnalisis">
      <div class="rowAnalisis headerAnalisis blue">
        <div class="cellAnalisis">Descripcion</div>
        <div class="cellAnalisis">Precio de compra</div>
        <div class="cellAnalisis">Fecha de Compra</div>
      </div>
      {fetchDataAlmacenes?.length > 0 && (
        <>
          {
            fetchDataAlmacenes?.map((almacen) => {
              const fecha = new Date(almacen.fecha_adquisicion);
              const fechaConvertida = fecha.toLocaleDateString();
              
              return(
                <div class="rowAnalisis" key={`almacen-${almacen?.id_almacen}`}>
                <div class="cellAnalisis" data-title="Name">
                {almacen?.descripcion_almacen}
                </div>
                <div class="cellAnalisis" data-title="Occupation">
                <strong style={{color:'red'}}> {formateador(almacen?.precio_adquisicion)}
                    {contador(almacen.precio_adquisicion)}</strong>
                </div>
                <div class="cellAnalisis" data-title="Location">
                {fechaConvertida}
                </div>
               
              </div>
            )})
          }
        </>
      )}
      </div>
      )
    : (
    <h3 className="text-danger text-center">No hay datos de almacenes cargados..</h3>
      )}
  <hr />          
  <h4 className="text-center" >Pagos de Personales</h4>
  {fetchDataPagoPersonal?.length > 0
    ? (
      <div class="tableAnalisis">
      <div class="rowAnalisis headerAnalisis blue">
        <div class="cellAnalisis">Descripcion</div>
        <div class="cellAnalisis">Monto</div>
        <div class="cellAnalisis">Tipo de Pago</div>
        <div class="cellAnalisis">Fecha de Pago</div>
      </div>
      {fetchDataPagoPersonal?.length > 0 && (
        <>
          {
            fetchDataPagoPersonal?.map((pagoPersonal) => {
              const fecha = new Date(pagoPersonal.fecha_contabilidad);
              const fechaConvertida = fecha.toLocaleDateString();

              if(pagoPersonal?.observacion_contabilidad !== "-"){
                return(
                  <div class="rowAnalisis" key={`pagoPersonal-${pagoPersonal?.id_contabilidad}`}>
                  <div class="cellAnalisis" data-title="Name">
                  {pagoPersonal?.descripcion_contabilidad}
                  </div>
                  <div class="cellAnalisis" data-title="Occupation">
                  <strong style={{color:'red'}}> {formateador(pagoPersonal?.monto_contabilidad)}
                      {contador(pagoPersonal.monto_contabilidad)}</strong>
                  </div>
                  <div class="cellAnalisis" data-title="Name">
                  {pagoPersonal?.observacion_contabilidad}
                  </div>
                  
                  <div class="cellAnalisis" data-title="Location">
                  {fechaConvertida}
                  </div>
                
                </div>
              )
            }
          })
          }
        </>
      )}
       </div>
      )
    : (
    <h3 className="text-danger text-center">No hay datos de Pagos de Personales cargados..</h3>
      )}  
  <hr />          
  <h4 className="text-center" >Gastos de Maquinas</h4>

  {fetchDataGastoMaquina?.length > 0
    ? (
      <div class="tableAnalisis">
      <div class="rowAnalisis headerAnalisis blue">
        <div class="cellAnalisis">Descripcion</div>
        <div class="cellAnalisis">Monto</div>
        <div class="cellAnalisis">Fecha de Pago</div>
      </div>
      {fetchDataGastoMaquina?.length > 0 && (
        <>
          {
            fetchDataGastoMaquina?.map((gastoMaquina) => {
              const fecha = new Date(gastoMaquina.fecha_contabilidad);
              const fechaConvertida = fecha.toLocaleDateString();

              if(gastoMaquina?.observacion_contabilidad === "-" && gastoMaquina?.tipo_contabilidad === "egreso"){
                return(
                  <div class="rowAnalisis" key={`gastoMaquina-${gastoMaquina?.id_contabilidad}`}>
                  <div class="cellAnalisis" data-title="Name">
                  {gastoMaquina?.descripcion_contabilidad}
                  </div>
                  
                  <div class="cellAnalisis" data-title="Occupation">
                  <strong style={{color:'red'}}>  {formateador(gastoMaquina?.monto_contabilidad)}
                      {contador(gastoMaquina.monto_contabilidad)}</strong>
                  </div>
                  <div class="cellAnalisis" data-title="Location">
                  {fechaConvertida}
                  </div>
                </div>
              )
            }
          })
          }
        </>
      )}
      </div>
      )
    : (
    <h3 className="text-danger text-center">No hay datos de Gastos de Maquinas cargados..</h3>
      )}  
      </div>
  </div>

  <div>
    <hr/>
    <h4 className="px-5"><b>Total Egresos:</b> <strong style={{color:'red'}}>{formateador(total.current)}</strong></h4>
  </div>
   </>
  );
};

export default TotalesEgresos;
