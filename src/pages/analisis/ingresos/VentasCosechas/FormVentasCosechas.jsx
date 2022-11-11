import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
// import { set } from "react-hook-form";

import { Link } from "react-router-dom";
import LayoutContainer from "../../../../components/layouts/LayoutContainer";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const FormVentasCosechas = () => {
  const [cantidadCosechada, setCantidadCosechada] = useState("");
  const [cantidadSembrada, setCantidadSembrada] = useState("");
  const [cantidadVendida, setCantidadVendida] = useState("");
  const [cantidadDisponible, setCantidadDisponible] = useState("");

  const [
    setFetchCampanias,
    fetchDataCampanias,
    loadingCampanias,
    errorCampanias
    // cleanStatesCampanias
  ] = useFetch([]);
  const [
    setFetchPacelasCultivos,
    fetchDataPacelasCultivos,
    loadingPacelasCultivos,
    errorPacelasCultivos
    // cleanStatesParcelasCultivos
  ] = useFetch([]);

  const formikRef = useRef();

  const hanldeChangeCampania = (e) => {
    const idCampania = e.target.value;
    setFetchPacelasCultivos({
      url: `${URL}/contabilidad-ingresos/${idCampania}`,
      headersRequest: {
        method: "GET"
      }
    });
    setCantidadCosechada("");
    setCantidadSembrada("");
  };

  const hanldeChangeParcelaCultivo = (e) => {
    const id = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[id];
    const cantidadCosechada = option.getAttribute("data-cantidad-cosechada");
    const unidadMedidaCosechada = option.getAttribute("data-unidad-medida-cosechada");

    const cantidadSembrada = option.getAttribute("data-cantidad-sembrada");
    const unidadMedidaSembrada = option.getAttribute("data-unidad-medida-sembrada");

    const cantidadTotalVendida = option.getAttribute("data-cantidad-vendida");
    const cantidadTotalDisponible = option.getAttribute("data-cantidad-disponible");

    console.log(cantidadTotalVendida);
    console.log(cantidadTotalDisponible);
    if (cantidadCosechada === null) {
      setCantidadCosechada("Aun no se ha realizado una cosecha");
    } else {
      setCantidadCosechada(`${cantidadCosechada} ${unidadMedidaCosechada}`);
    }

    // if (cantidadSembrada === null) {
    //   setCantidadSembrada("Aun no se ha realizado una siembra");
    // } else {
    // }
    setCantidadSembrada(`${cantidadSembrada} ${unidadMedidaSembrada}`);
    setCantidadVendida();

    // setCantidadSembrada(cantidadSembrada);
    // if (cantidadSembrada === null) {
    //   setCantidadSembrada("Aun no se ha realizado una cosecha");
    // } else {
    // }

    // setFetchPacelasCultivos({
    //   url: `${URL}/contabilidad-ingresos/${idCampania}`,
    //   headersRequest: {
    //     method: "GET"
    //   }
    // });
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  useEffect(() => {
    setFetchCampanias({
      url: `${URL}/campanias`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setFetchCampanias([]);
    };
  }, []);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [errorCampanias]);
  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-12">
                    <div className="card-body">
                      <Formik
                        innerRef={formikRef}
                        initialValues={{
                          campania: "",
                          parcela_cultivo: ""
                        }}
                        onSubmit={handleSubmit}
                        // validationSchema={schemaRegister}
                      >
                        {({ isSubmitting, handleChange }) => (
                          <Form id="formAuthentication" className="form-group">
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione Campaña
                              </label>
                              <Field
                                as="select"
                                name="campania"
                                id="campania"
                                className="form-control"
                                onChange={(e) => {
                                  handleChange(e);
                                  hanldeChangeCampania(e);
                                }}
                              >
                                <option value="" disabled>
                                  Campaña
                                </option>
                                {fetchDataCampanias?.map((campania) => (
                                  <option
                                    key={campania.id_campania}
                                    value={campania.id_campania}
                                  >
                                    {campania.descripcion_campania}
                                  </option>
                                ))}
                              </Field>

                              {
                                loadingCampanias && <b className="text-warning">Cargando Campañas</b>
                              }
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione una parcela cultivo
                              </label>
                              <Field
                                name="parcela_cultivo"
                                className="form-control mb-2"
                                as="select"
                                // defaultValue={errorPacelasCultivos ? "" : ""}
                                onChange={(e) => {
                                  handleChange(e);
                                  hanldeChangeParcelaCultivo(e);
                                }}
                              >
                                <option value="" disabled>
                                  Seleccione una parcela cultivo
                                </option>

                                {fetchDataPacelasCultivos?.map((parcelaCultivo) => (
                                  <option
                                    key={parcelaCultivo.id_parcela_cultivo}
                                    value={parcelaCultivo.id_parcela_cultivo}

                                    data-cantidad-cosechada = {parcelaCultivo.cantidad_total_cosechada}

                                    data-unidad-medida-cosechada = {`${parcelaCultivo.unidadMedidaTotalCosechada.descripcion_unidad_medida}`}

                                    data-cantidad-sembrada = {parcelaCultivo.cantidad_sembrada}

                                    data-unidad-medida-sembrada = {`${parcelaCultivo.unidadMedidaTotalSembrada.descripcion_unidad_medida}`}

                                    data-cantidad-vendida = {parcelaCultivo.suma_total_cantidad_vendida}
                                    data-cantidad-disponible = {(parcelaCultivo.cantidad_total_cosechada - parcelaCultivo.suma_total_cantidad_vendida).toString()}
                                  >
                                    {parcelaCultivo.parcela.descripcion_parcela} {"-"}
                                    ({parcelaCultivo.cultivo.descripcion_cultivo}){"-"}
                                    ({parcelaCultivo.activo ? "Activo" : "Inactivo"})
                                  </option>

                                ))}
                              </Field>
                              {
                                loadingPacelasCultivos && <b className="text-warning">Cargando Campañas</b>
                              }
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ingrese Cantidad Vendida
                              </label>
                              <Field
                                name="cantidad_vendida"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese la cantidad vendida"
                              />

                              {
                                cantidadCosechada && cantidadSembrada && (
                                  <>
                                  <span className="badge rounded-pill bg-warning mt-2">Cantidad sembrada: {cantidadSembrada}</span>
                                  <br />
                                  <span className="badge rounded-pill bg-success mt-2">Cantidad cosechada: {cantidadCosechada}</span>
                                  </>
                                )
                              }
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ingrese Monto Total
                              </label>
                              <Field
                                name="monto_total_vendido"
                                type="number"
                                className="form-control"
                                placeholder="Por favor ingrese el monto total"
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="mb-3">
                              <Link to="/Ingresos" state={{ tab: "tab2" }}>
                                <button className="btn btn-danger">
                                  Volver
                                </button>
                              </Link>
                              <button className="btn btn-success mx-2" disabled={!parseInt(cantidadCosechada)}>
                                Guardar Venta
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
              {
                errorPacelasCultivos && (
                  <h3>{errorPacelasCultivos}</h3>
                )
              }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
};

export default FormVentasCosechas;
