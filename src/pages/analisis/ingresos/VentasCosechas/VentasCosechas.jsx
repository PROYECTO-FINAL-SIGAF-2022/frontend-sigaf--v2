import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import Alerta from "../../../../components/layouts/Alerta";
// import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const VentasCosechas = () => {
  const [
    setFetchCampanias,
    fetchDataCampanias
    // loadingCampanias,
    // errorCampanias
  ] = useFetch([]);

  const [
    setFetchParcelas,
    fetchDataParcelas
    // loadingParcelas,
    // errorParcelas
  ] = useFetch([]);
  const [
    setFetchDeleteParcelaCampania,
    fetchDataDeleteParcelaCampania
    ,
    ,
    ,
    cleanStateDeleteParcelaCampania
    // loadingDeleteParcelaCampania,
    // errorDeleteParcelaCampania
  ] = useFetch([]);

  const [campania, setCampania] = useState("");
  const [parcela, setParcela] = useState("");

  const [
    setFetchVentasCosechas,
    fetchDataContabilidadCosechas,
    loadingContabilidadCosechas,
    errorContabilidadCosechas
  ] = useFetch([]);

  const handleEliminarCosechaYContabilidad = (fecha) => {
    // console.log(fecha);
    setFetchDeleteParcelaCampania({
      url: `${URL}/contabilidad-cosechas/${fecha}`,
      headersRequest: {
        method: "DELETE"
      }
    });
  };

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
  }, []);

  useEffect(() => {
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

    if (campania !== "" && parcela !== "") {
      // console.log("Filtrado por campania y parcela");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/${campania}/${parcela}`,
        headersRequest: {
          method: "GET"
        }
      });
    }
    cleanStateDeleteParcelaCampania();
  }, [campania, parcela, fetchDataDeleteParcelaCampania]);

  return (
    <>
      <Link to="/venta-cosecha">
        <button className="btn btn-success mb-3">+ Venta Cosecha</button>
      </Link>
      <Card>
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
              <th className="text-center">
                <span>Eliminar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchDataContabilidadCosechas?.length > 0 &&
              fetchDataContabilidadCosechas.map((cosecha) => (
                <tr key={cosecha.id_cosecha}>
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
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      {cosecha.fecha_venta}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="label label-default">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleEliminarCosechaYContabilidad(
                            cosecha.fecha_venta
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
        {loadingContabilidadCosechas && <h4>Cargando datos de cosechas</h4>}
        {fetchDataDeleteParcelaCampania && <h4 className="text-success">Registro de cosecha y de contabilidad eliminadas</h4>}
        {errorContabilidadCosechas?.errors &&
          errorContabilidadCosechas?.errors.map((msgError, i) => (
            <Alerta
              claseAlerta="danger"
              key={i}
              mensajeAlerta={msgError?.msg}
            />
          ))}
      </Card>
    </>
  );
};

export default VentasCosechas;
