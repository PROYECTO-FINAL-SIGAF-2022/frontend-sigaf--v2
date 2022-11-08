import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import LayoutContainer from "../../../../components/layouts/LayoutContainer";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const FormVentasCosechas = () => {
  const [setFetchCampanias, fetchDataCampanias, loadingCampanias, errorCampanias, cleanStates] = useFetch([]);

  const formikRef = useRef();

  const hanldeChangeCampania = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (values) => {
    console.log(values);
    // setConfigFetch({
    //   url: `${URL}/login`,
    //   headersRequest: {
    //     method: "POST",
    //     body: JSON.stringify({
    //       username_usuario,
    //       password_usuario
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //     }
    //   }
    // });
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
                        // initialValues={{
                        // nombre_persona: "",
                        // apellido_persona: "",
                        // dni_persona: "",
                        // fecha_nac_persona: "",
                        // email_persona: "",
                        // telefono_persona: "",
                        // username_usuario: "",
                        // password_usuario: ""
                        // }}
                        onSubmit={handleSubmit}
                        // validationSchema={schemaRegister}
                      >
                      {({ isSubmitting, handleChange }) => (

                        <Form id="formAuthentication" className="form-group">
                          <div className="mb-3">
                            <label className="form-label">
                              Seleccione Campaña
                            </label>
                            <Field className="form-control" as="select" defaultValue={""} onChange={(e) => {
                              handleChange(e);
                              hanldeChangeCampania(e);
                            }}>
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
                            <Field className="form-control" as="select" defaultValue={""}>
                              <option value="">Seleccione una parcela cultivo</option>
                              <option value="red">Parcela 1</option>
                              <option value="green">Parcela 2</option>
                              <option value="blue">Parcela 3</option>
                            </Field>
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
                            <label className="form-label">Ingrese Cantidad Vendida</label>
                            <Field
                              type="text"
                              className="form-control"
                              placeholder="Ingrese la cantidad vendida"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Ingrese Monto Total</label>
                            <Field
                              type="number"
                              className="form-control"
                              placeholder="Por favor ingrese el monto total"
                              aria-describedby="emailHelp"
                            />
                          </div>
                          <br></br>
                          <Link to="/Ingresos" state={{ tab: "tab2" }}>
                            <button className="btn btn-danger mx-3">
                              Volver
                            </button>
                          </Link>
                          {/* <Link to="/Egresos"> */}
                          <button className="btn btn-success">
                            Guardar Venta
                          </button>
                          {/* </Link> */}
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
