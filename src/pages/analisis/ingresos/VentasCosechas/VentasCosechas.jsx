import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import Alerta from "../../../../components/layouts/Alerta";
import { formateador } from "../../../../helpers/formateadorNumero";
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
    cleanStateDeleteParcelaCampania();
  }, [campania, parcela, fetchDataDeleteParcelaCampania]);

  return (
    <>
     <div class="wrapper">
      <div>
      <Link className="d-inline px-3" to="/venta-cosecha">
        <button className="btn btn-success mb-3">+ Venta Cosecha</button>
      </Link>
      </div>
      <div>
          <div className="d-inline px-3" style={{ width: "20%" }}>
            <label htmlFor="smallSelect" className="form-label d-inline">
              Campaña
            </label>
            <div class="selectCostoDiv mx-3">
                <select className="selectCosto"
                id="smallSelect"
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
          </div>
          <br></br>
          <div className="d-inline px-3" style={{ width: "20%" }}>
            <label htmlFor="smallSelect" className="form-label d-inline">
              Parcelas
            </label>
            <div class="selectCostoDiv mx-3">
                <select className="selectCosto"
                id="smallSelect"
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
          </div>
          </div>
          <div className="d-inline px-3" style={{ width: "20%" }}></div>
          <br></br>
        
        </div>

      <hr></hr>
        <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis green">
            <div class="cellAnalisis">Parcela</div>
            <div class="cellAnalisis">Cantidad Vendida</div>
            <div class="cellAnalisis">Precio</div>
            <div class="cellAnalisis">Fecha de Venta</div>
            <div class="cellAnalisis">Eliminar</div>
          </div>

          {fetchDataContabilidadCosechas?.length > 0 &&
              fetchDataContabilidadCosechas.map((cosecha) => {
                const fecha = new Date(cosecha?.fecha_venta);
                const fechaConvertida = fecha.toLocaleDateString();
                return(
                  <div class="rowAnalisis" key={cosecha.id_cosecha}>
                    <div class="cellAnalisis" data-title="Name">
                    {cosecha.parcelas_cultivo.parcela.descripcion_parcela}
                    </div>
                    <div class="cellAnalisis" data-title="Occupation" style={{color:'#429867'}}>
                    {cosecha.cantidad_total_vendida}{" "}
                        {cosecha.unidades_medida.descripcion_unidad_medida}
                    </div>
                    <div class="cellAnalisis" data-title="Location" style={{color:'#429867'}}>
                    <strong>{formateador(cosecha.precio_venta)}</strong>
                    </div>
                    <div class="cellAnalisis" data-title="Location">
                    {fechaConvertida}
                    </div>
                    <div class="cellAnalisis" data-title="actions">
                    
                        <a href="#" className="table-link danger" 
                          
                          onClick={() =>
                            handleEliminarCosechaYContabilidad(
                              cosecha.fecha_venta
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
     </div>
    </>
  );
};

export default VentasCosechas;
