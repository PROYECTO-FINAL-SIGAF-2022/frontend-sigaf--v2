import { useRef, useState, useEffect } from "react";

import { Card } from "reactstrap";
// import { Link } from "react-router-dom";
// import Alerta from "../../../../components/layouts/Alerta";
// import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";
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
    <div className="d-inline px-3" style={{ width: "20%" }}>
        <label htmlFor="smallSelect" className="form-label d-inline">
          Contable
        </label>
        <select
          id="smallSelect"
          className="form-select form-select-sm d-inline"
          defaultValue=""
          onChange={handleChangeContable}
        >
          <option value="todos">Todos</option>
          <option value="productos">productos</option>
        </select>
      </div>
      <div className="d-inline px-3" style={{ width: "20%" }}></div>
    <Card style={{ overflowY: "scroll", height: "363px" }}>
      <hr />
      <h4 className="text-center" >Productos</h4>
      {fetchDataProductos?.length > 0
        ? (
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Descripcion</span>
              </th>
              <th className="text-center">
                <span>Precio de compra</span>
              </th>
              <th className="text-center">
                <span>Fecha de Compra</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {fetchDataProductos?.length > 0 && (
            <>
              {
                fetchDataProductos?.map((producto) => {
                  const fecha = new Date(producto.fecha_compra);
                  const fechaConvertida = fecha.toLocaleDateString();
                  
                  return(
                    <tr key={`producto-${producto?.id_producto}`}>
                      <td className="text-center">
                        <span className="label label-default">
                        {producto?.descripcion_producto}
                        </span>
                      </td>
                      <td className="text-danger text-center">
                        <span className="label label-default">
                        $ {producto?.precio_total_producto}
                        {contador(producto.precio_total_producto)}
                      </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                        {fechaConvertida}
                        </span>
                      </td>
                    </tr>   
                )})
              }
            </>
          )}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay datos de productos cargados..</h3>
          )}
      <hr />          
      <h4 className="text-center" >Maquinas</h4>
      {fetchDataProductos?.length > 0
        ? (
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Descripcion</span>
              </th>
              <th className="text-center">
                <span>Precio de compra</span>
              </th>
              <th className="text-center">
                <span>Fecha de Compra</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {fetchDataMaquinas?.length > 0 && (
            <>
              {
                fetchDataMaquinas?.map((maquina) => {
                  const fecha = new Date(maquina.fecha_adquisicion_maquina);
                  const fechaConvertida = fecha.toLocaleDateString();
                  
                  return(
                    <tr key={`maquina-${maquina?.id_maquina}`}>
                      <td className="text-center">
                        <span className="label label-default">
                        {maquina?.descripcion_maquina}
                        </span>
                      </td>
                      <td className="text-danger text-center">
                        <span className="label label-default">
                        $ {maquina?.precio_adquisicion_maquina}
                        {contador(maquina.precio_adquisicion_maquina)}
                      </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                        {fechaConvertida}
                        </span>
                      </td>
                    </tr>   
                )})
              }
            </>
          )}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay datos de maquinas cargadas..</h3>
          )}
      <hr />          
      <h4 className="text-center" >Almacenes</h4>
      {fetchDataAlmacenes?.length > 0
        ? (
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Descripcion</span>
              </th>
              <th className="text-center">
                <span>Precio de compra</span>
              </th>
              <th className="text-center">
                <span>Fecha de Compra</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {fetchDataAlmacenes?.length > 0 && (
            <>
              {
                fetchDataAlmacenes?.map((almacen) => {
                  const fecha = new Date(almacen.fecha_adquisicion);
                  const fechaConvertida = fecha.toLocaleDateString();
                  
                  return(
                    <tr key={`almacen-${almacen?.id_almacen}`}>
                      <td className="text-center">
                        <span className="label label-default">
                        {almacen?.descripcion_almacen}
                        </span>
                      </td>
                      <td className="text-danger text-center">
                        <span className="label label-default">
                        $ {almacen?.precio_adquisicion}
                        {contador(almacen.precio_adquisicion)}
                      </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                        {fechaConvertida}
                        </span>
                      </td>
                    </tr>   
                )})
              }
            </>
          )}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay datos de almacenes cargados..</h3>
          )}
      <hr />          
      <h4 className="text-center" >Pagos de Personales</h4>
      {fetchDataPagoPersonal?.length > 0
        ? (
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Descripcion</span>
              </th>
              <th className="text-center">
                <span>Tipo de Pago</span>
              </th>
              <th className="text-center">
                <span>Monto</span>
              </th>
              <th className="text-center">
                <span>Fecha de Pago</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {fetchDataPagoPersonal?.length > 0 && (
            <>
              {
                fetchDataPagoPersonal?.map((pagoPersonal) => {
                  const fecha = new Date(pagoPersonal.fecha_contabilidad);
                  const fechaConvertida = fecha.toLocaleDateString();

                  if(pagoPersonal?.observacion_contabilidad !== "-"){
                    return(
                      <tr key={`pagoPersonal-${pagoPersonal?.id_contabilidad}`}>
                        <td className="text-center">
                          <span className="label label-default">
                          {pagoPersonal?.descripcion_contabilidad}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="label label-default">
                          {pagoPersonal?.observacion_contabilidad}
                          </span>
                        </td>
                        <td className="text-danger text-center">
                          <span className="label label-default">
                          $ {pagoPersonal?.monto_contabilidad}
                          {contador(pagoPersonal.monto_contabilidad)}
                        </span>
                        </td>
                        <td className="text-center">
                          <span className="label label-default">
                          {fechaConvertida}
                          </span>
                        </td>
                      </tr>   
                  )
                }
              })
              }
            </>
          )}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay datos de Pagos de Personales cargados..</h3>
          )}  
      <hr />          
      <h4 className="text-center" >Gastos de Maquinas</h4>
      {fetchDataGastoMaquina?.length > 0
        ? (
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Descripcion</span>
              </th>
              <th className="text-center">
                <span>Precio de compra</span>
              </th>
              <th className="text-center">
                <span>Fecha de Compra</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {fetchDataGastoMaquina?.length > 0 && (
            <>
              {
                fetchDataGastoMaquina?.map((gastoMaquina) => {
                  const fecha = new Date(gastoMaquina.fecha_contabilidad);
                  const fechaConvertida = fecha.toLocaleDateString();

                  if(gastoMaquina?.observacion_contabilidad === "-"){
                    return(
                      <tr key={`gastoMaquina-${gastoMaquina?.id_contabilidad}`}>
                        <td className="text-center">
                          <span className="label label-default">
                          {gastoMaquina?.descripcion_contabilidad}
                          </span>
                        </td>
                        <td className="text-danger text-center">
                          <span className="label label-default">
                          $ {gastoMaquina?.monto_contabilidad}
                          {contador(gastoMaquina.monto_contabilidad)}
                        </span>
                        </td>
                        <td className="text-center">
                          <span className="label label-default">
                          {fechaConvertida}
                          </span>
                        </td>
                      </tr>   
                  )
                }
              })
              }
            </>
          )}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay datos de Gastos de Maquinas cargados..</h3>
          )}  
    </Card>
    <hr />
    <b className="px-3">Total Egresos: ${total.current}</b>
    </>
  );
};

export default TotalesEgresos;
