import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

import { Link } from "react-router-dom";
import LayoutContainer from "../../../../components/layouts/LayoutContainer";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const FormVentasCosechas = () => {
  const [cantidadCosechada, setCantidadCosechada] = useState("");

  const [
    setFetchCampanias,
    fetchDataCampanias,
    loadingCampanias,
    errorCampanias,
    cleanStatesCampanias
  ] = useFetch([]);
  const [
    setFetchPacelasCultivos,
    fetchDataPacelasCultivos,
    loadingPacelasCultivos,
    errorPacelasCultivos,
    cleanStatesParcelasCultivos
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
  };

  const hanldeChangeParcelaCultivo = (e) => {
    const id = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[id];
    const cantidadCosechada = option.getAttribute("data-cantidad-disponible");

    console.log(cantidadCosechada);

    if (cantidadCosechada === null) {
      setCantidadCosechada("Aun no se ha realizado una cosecha");
    } else {
      setCantidadCosechada(cantidadCosechada);
    }

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
                          campania: ""
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
                                {fetchDataCampanias.map((campania) => (
                                  <option
                                    key={campania.id_campania}
                                    value={campania.id_campania}
                                  >
                                    {campania.descripcion_campania}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione Parcela Cultivo
                              </label>
                              <Field
                                name="parcela_cultivo"
                                className="form-control mb-2"
                                as="select"
                                defaultValue={""}
                                onChange={(e) => {
                                  handleChange(e);
                                  hanldeChangeParcelaCultivo(e);
                                }}
                              >
                                <option value="" disabled>
                                  Seleccione una parcela cultivo
                                </option>

                                {fetchDataPacelasCultivos.map((parcelaCultivo) => (
                                  <option
                                    key={parcelaCultivo.id_parcela_cultivo}
                                    value={parcelaCultivo.id_parcela_cultivo}
                                    data-cantidad-disponible = {parcelaCultivo.cantidad_total_cosechada}
                                  >
                                    {parcelaCultivo.parcela.descripcion_parcela} {"-"}
                                    ({parcelaCultivo.cultivo.descripcion_cultivo}){"-"}
                                    ({parcelaCultivo.activo ? "Activo" : "Inactivo"})

                                  </option>
                                ))}
                                {/* <option value="red">Parcela 1</option>
                                <option value="green">Parcela 2</option>
                                <option value="blue">Parcela 3</option> */}
                              </Field>
                              {
                                loadingPacelasCultivos && <b className="text-danger">Cargando cultivos</b>
                              }
                              {
                                !parseInt(cantidadCosechada) ? <span className="badge bg-danger">{cantidadCosechada}</span> : <span className="badge bg-success">Stock Disponible: {cantidadCosechada}</span>
                              }

                            </div>
                            {/* <div className="mb-3">
                            <label className="form-label">
                              Seleccione Maquina
                            </label>
                            <Field className="form-control" as="select">
                              <option value="red">Tractor</option>
                              <option value="green">Camion</option>
                              <option value="blue">Cohete</option>
                            </Field>
                          </div> */}
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
