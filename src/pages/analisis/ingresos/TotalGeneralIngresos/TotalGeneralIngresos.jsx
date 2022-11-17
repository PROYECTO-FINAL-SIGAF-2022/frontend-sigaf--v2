import { useRef, useState, useEffect } from "react";

import { Card } from "reactstrap";
// import { Link } from "react-router-dom";
// import Alerta from "../../../../components/layouts/Alerta";
// import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";
const TotalGeneralIngresos = () => {
  const [
    setFetchCampanias,
    fetchDataCampanias,
    loadingCampanias
    // errorCampanias
  ] = useFetch([]);

  const [
    setFetchParcelas,
    fetchDataParcelas,
    loadingParcelas
    // errorParcelas
  ] = useFetch([]);
  const [
    setFetchVentasCosechas,
    fetchDataContabilidadCosechas,
    loadingContabilidadCosechas
    // errorContabilidadCosechas
  ] = useFetch([]);

  const [
    setFetchMaquinas,
    fetchDataMaquinas,
    loadingMaquinas
    // errorMaquinas
  ] = useFetch([]);

  const [
    setFetchAlmacenes,
    fetchDataAlmacenes,
    loadingAlmacenes
    // errorAlmacenes
  ] = useFetch([]);

  const [campania, setCampania] = useState("");
  const [parcela, setParcela] = useState("");

  const total = useRef(0);

  const handleChangeCampania = (e) => {
    const campania = e.target.value;
    // console.log(campania);
    setCampania(campania);
  };

  const handleChangeParcela = (e) => {
    const parcela = e.target.value;
    // console.log(parcela);
    setParcela(parcela);
  };

  useEffect(() => {
    total.current = 0;

    if (campania === "" && parcela === "") {
      // console.log("completo");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/0/0`,
        headersRequest: {
          method: "GET"
        }
      });
    }

    if (campania !== "" && parcela === "") {
      // console.log("filtrado por campania");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/${campania}/0`,
        headersRequest: {
          method: "GET"
        }
      });
    }

    if (campania === "" && parcela !== "") {
      // console.log("filtrado por parcela");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/0/${parcela}`,
        headersRequest: {
          method: "GET"
        }
      });
    }

    if (campania !== "" && parcela !== "") {
      // console.log("Filtrado por campania y parcela");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/${campania}/${parcela}`,
        headersRequest: {
          method: "GET"
        }
      });
    }
    return () => {
      total.current = 0;
    };
  }, [campania, parcela]);

  useEffect(() => {
    total.current = 0;

    setFetchAlmacenes({
      url: `${URL}/almacenes-vender`,
      headersRequest: {
        method: "GET"
      }
    });

    setFetchCampanias({
      url: `${URL}/campanias`,
      headersRequest: {
        method: "GET"
      }
    });
    setFetchParcelas({
      url: `${URL}/parcelas`,
      headersRequest: {
        method: "GET"
      }
    });

    setFetchMaquinas({
      url: `${URL}/maquinas-vendidas`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      // console.log("first");
      total.current = 0;
    };
  }, []);

  useEffect(() => {
    total.current = 0;

    return () => {
      total.current = 0;
    };
  }, [
    loadingCampanias,
    loadingParcelas,
    loadingContabilidadCosechas,
    loadingMaquinas,
    loadingAlmacenes
  ]);

  const contador = (precio) => {
    // console.log(precio);
    total.current += parseInt(precio);
  };
  total.current = 0;

  return (
    <Card style={{ overflowY: "scroll", height: "400px" }}>
      <div className="d-inline px-3" style={{ width: "20%" }}>
        <label htmlFor="smallSelect" className="form-label d-inline">
          Campaña
        </label>
        <select
          id="smallSelect"
          className="form-select form-select-sm d-inline"
          defaultValue=""
          onChange={handleChangeCampania}
        >
          <option value="">Todos</option>
          {fetchDataCampanias?.map((campania) => (
            <option key={campania.id_campania} value={campania.id_campania}>
              {campania.descripcion_campania}
            </option>
          ))}
        </select>
        <label htmlFor="smallSelect" className="form-label d-inline">
          Parcelas
        </label>
        <select
          id="smallSelect"
          className="form-select form-select-sm d-inline"
          defaultValue=""
          onChange={handleChangeParcela}
        >
          <option value="">Todos</option>
          {fetchDataParcelas?.map((parcela) => (
            <option key={parcela.id_parcela} value={parcela.id_parcela}>
              {parcela.descripcion_parcela}
            </option>
          ))}
        </select>
      </div>
      <div className="d-inline px-3" style={{ width: "20%" }}></div>
      <br></br>
      <h4 className="text-center">Cosechas</h4>
      {fetchDataContabilidadCosechas?.length > 0
        ? (
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Parcela</span>
              </th>
              <th className="text-center">
                <span>Cantidad Vendida</span>
              </th>
              <th className="text-center">
                <span>Precio</span>
              </th>
              <th className="text-center">
                <span>Fecha de Venta</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchDataContabilidadCosechas?.length > 0 &&
              fetchDataContabilidadCosechas.map((cosecha) => (
                <tr key={`cosecha-${cosecha.id_cosecha}`}>
                  <td className="text-center">
                    <span className="label label-default">
                      {cosecha.parcelas_cultivo.parcela.descripcion_parcela}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {cosecha.cantidad_total_vendida}{" "}
                      {cosecha.unidades_medida.descripcion_unidad_medida}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      ${cosecha.precio_venta}
                      {contador(cosecha.precio_venta)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {cosecha.fecha_venta}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay venta de cosechas</h3>
          )}

      {/* {loadingContabilidadCosechas && <h4>Cargando datos de cosechas</h4>}

    {errorContabilidadCosechas?.errors &&
      errorContabilidadCosechas?.errors.map((msgError, i) => (
        <Alerta
          claseAlerta="danger"
          key={i}
          mensajeAlerta={msgError?.msg}
        />
      ))} */}
      <hr />
      <h4 className="text-center">Maquinas</h4>
      {fetchDataMaquinas?.length > 0
        ? (
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
            </tr>
          </thead>
          <tbody>
            {fetchDataMaquinas?.length > 0 &&
              fetchDataMaquinas.map((maquina) => (
                <tr key={`maquina-${maquina.id_maquina}`}>
                  <td className="text-center">
                    <span className="label label-default">
                      {maquina.descripcion_maquina}
                    </span>
                  </td>

                  <td className="text-center">
                    <span className="label label-default">
                      ${maquina.precio_venta_maquina}
                      {contador(maquina.precio_venta_maquina)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {maquina.fecha_venta_maquina}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay venta de maquinas</h3>
          )}

      <hr />
      <h4 className="text-center">Almacenes</h4>
      {fetchDataAlmacenes?.length > 0
        ? (
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
            </tr>
          </thead>
          <tbody>
            {fetchDataAlmacenes?.length > 0 &&
              fetchDataAlmacenes.map((almacen) => (
                <tr key={`almacen-${almacen.id_almacen}`}>
                  <td className="text-center">
                    <span className="label label-default">
                      {almacen.descripcion_almacen}
                    </span>
                  </td>

                  <td className="text-center">
                    <span className="label label-default">
                      ${almacen.precio_venta}
                      {contador(almacen.precio_venta)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {almacen.fecha_venta}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
          )
        : (
        <h3 className="text-danger text-center">No hay venta de almacenes</h3>
          )}

      <hr />
      <b className="px-3">Campaña: {campania || "Todos"}</b>
      <b className="px-3">Parcela: {parcela || "Todos"}</b>
      <b className="px-3">Total Ingresos: ${total.current}</b>

    </Card>
  );
};

export default TotalGeneralIngresos;
