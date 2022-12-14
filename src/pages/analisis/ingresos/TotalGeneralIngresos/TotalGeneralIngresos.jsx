import { useRef, useState, useEffect } from "react";
import { formateador } from "../../../../helpers/formateadorNumero";
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
    loadingCampanias,
    // errorCampanias
  ] = useFetch([]);

  const [
    setFetchParcelas,
    fetchDataParcelas,
    loadingParcelas,
    // errorParcelas
  ] = useFetch([]);
  const [
    setFetchVentasCosechas,
    fetchDataContabilidadCosechas,
    loadingContabilidadCosechas,
    // errorContabilidadCosechas
  ] = useFetch([]);

  const [
    setFetchMaquinas,
    fetchDataMaquinas,
    loadingMaquinas,
    // errorMaquinas
  ] = useFetch([]);

  const [
    setFetchAlmacenes,
    fetchDataAlmacenes,
    loadingAlmacenes,
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
          method: "GET",
        },
      });
    }

    if (campania !== "" && parcela === "") {
      // console.log("filtrado por campania");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/${campania}/0`,
        headersRequest: {
          method: "GET",
        },
      });
    }

    if (campania === "" && parcela !== "") {
      // console.log("filtrado por parcela");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/0/${parcela}`,
        headersRequest: {
          method: "GET",
        },
      });
    }

    if (campania !== "" && parcela !== "") {
      // console.log("Filtrado por campania y parcela");
      setFetchVentasCosechas({
        url: `${URL}/cosechas-campania-parcelas/${campania}/${parcela}`,
        headersRequest: {
          method: "GET",
        },
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
        method: "GET",
      },
    });

    setFetchCampanias({
      url: `${URL}/campanias`,
      headersRequest: {
        method: "GET",
      },
    });
    setFetchParcelas({
      url: `${URL}/parcelas`,
      headersRequest: {
        method: "GET",
      },
    });

    setFetchMaquinas({
      url: `${URL}/maquinas-vendidas`,
      headersRequest: {
        method: "GET",
      },
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
    loadingAlmacenes,
  ]);

  const contador = (precio) => {
    // console.log(precio);
    total.current += parseInt(precio);
  };
  total.current = 0;

  return (
    <>
      <div class="wrapper">
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
         <div style={{ overflowY: "scroll", height: "400px" }}>
         <h4 className="text-center">Cosechas</h4>
        <hr></hr>
        {fetchDataContabilidadCosechas?.length > 0 ? (
          <div class="tableAnalisis">
            <div class="rowAnalisis headerAnalisis green">
              <div class="cellAnalisis">Parcela</div>
              <div class="cellAnalisis">Cantidad Vendida</div>
              <div class="cellAnalisis">Precio</div>
              <div class="cellAnalisis">Fecha de Venta</div>
            </div>

            {fetchDataContabilidadCosechas?.length > 0 &&
              fetchDataContabilidadCosechas?.map((cosecha) => {
                const fecha = new Date(cosecha?.fecha_venta);
                const fechaConvertida = fecha.toLocaleDateString();
                return(
                  <div class="rowAnalisis" key={`cosecha-${cosecha?.id_cosecha}`}>
                  <div class="cellAnalisis" data-title="Name">
                    {cosecha?.parcelas_cultivo?.parcela?.descripcion_parcela}
                  </div>
                  <div class="cellAnalisis" data-title="Occupation" style={{color:'#429867'}}>
                  {cosecha?.cantidad_total_vendida}{" "}
                      {cosecha?.unidades_medida?.descripcion_unidad_medida}
                  </div>
                  <div class="cellAnalisis" data-title="Location" style={{color:'#429867'}}>
                  <strong>{formateador(cosecha?.precio_venta)}
                  {contador(cosecha?.precio_venta)}
                  </strong>
                  </div>
                  <div class="cellAnalisis" data-title="actions">
                    {fechaConvertida}
                  </div>
                </div>
                )
              })}
          </div>
        ) : (
          <h3 className="text-danger text-center">No hay venta de cosechas</h3>
        )}

        <hr />
        <h4 className="text-center">Maquinas</h4>
        {fetchDataMaquinas?.length > 0 ? (
          <div class="tableAnalisis">
            <div class="rowAnalisis headerAnalisis green">
              <div class="cellAnalisis">Nombre Maquina</div>
              <div class="cellAnalisis">Precio de Venta</div>
              <div class="cellAnalisis">Fecha de Venta</div>
            </div>
            {fetchDataMaquinas?.length > 0 &&
              fetchDataMaquinas?.map((maquina) => {
                const fecha = new Date(maquina?.fecha_venta_maquina);
                const fechaConvertida = fecha.toLocaleDateString();
                return(
                  <div class="rowAnalisis" key={`maquina-${maquina?.id_maquina}`}>
                    <div class="cellAnalisis" data-title="Name">
                      {maquina?.descripcion_maquina}
                    </div>
                    <div class="cellAnalisis" data-title="Occupation">
                      <strong style={{ color: "#429867" }}>
                        {formateador(maquina?.precio_venta_maquina)}
                        {contador(maquina?.precio_venta_maquina)}
                      </strong>
                    </div>
                    <div class="cellAnalisis" data-title="actions">
                      {fechaConvertida}
                    </div>
                  </div>
                )
              })}
          </div>
        ) : (
          <h3 className="text-danger text-center">No hay venta de maquinas</h3>
        )}

        <hr />
        <h4 className="text-center">Almacenes</h4>

        {fetchDataAlmacenes?.length > 0
        ? (
          <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis green">
            <div class="cellAnalisis">Nombre Almacen</div>
            <div class="cellAnalisis">Precio de Venta</div>
            <div class="cellAnalisis">Fecha de Venta</div>
          </div>
            {fetchDataAlmacenes?.length > 0 &&
              fetchDataAlmacenes?.map((almacen) => {
                const fecha = new Date(almacen?.fecha_venta);
                const fechaConvertida = fecha.toLocaleDateString();
                return(
                  <div class="rowAnalisis" key={`almacen-${almacen?.id_almacen}`}>
                    <div class="cellAnalisis" data-title="Name">
                    {almacen?.descripcion_almacen}
                    </div>
                    <div class="cellAnalisis" data-title="Occupation">
                      <strong style={{ color: "#429867" }}>
                      {formateador(almacen?.precio_venta)}
                        {contador(almacen?.precio_venta)}
                      </strong>
                    </div>
                    <div class="cellAnalisis" data-title="actions">
                    {fechaConvertida}
                    </div>
                  </div>
                )
              })}
          </div>
          )
        : (
        <h3 className="text-danger text-center">No hay venta de almacenes</h3>
          )}
         </div>

         <hr />
      <b className="px-3" style={{fontSize:"20px"}}>Campaña:<strong style={{ color: "#24211a" }}> {campania || "Todos"}</strong></b>
      <b className="px-3" style={{fontSize:"20px"}}>Parcela: <strong style={{ color: "#24211a" }}>{parcela || "Todos"}</strong></b>
      <b className="px-3" style={{fontSize:"20px"}}>Total Ingresos: <strong style={{ color: "#429867" }}>{formateador(total.current) }</strong></b>
      </div>
    </>
  );
};

export default TotalGeneralIngresos;
