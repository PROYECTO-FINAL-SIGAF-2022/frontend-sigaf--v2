import { Field, Formik, Form } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LayoutContainer from "../../../../../components/layouts/LayoutContainer";

import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";

const FormGastosMaquinas = () => {
  const [setConfigFetchPersonal, fetchDataPersonal] = useFetch();
  // const [setConfigFetchContabilidad, fetchDataContabilidad] = useFetch();

  // const [descripcionC, setDescripcionC] = useState("");

  const seleccionarNombre = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log(descripcionC);
  }, [descripcionC]);

  const formikRef = useRef();

  const getPersonal = () => {
    setConfigFetchPersonal({
      url: `${URL}/usuarios`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  const handleSubmit = (values) => {
    const {
      descripcion_contabilidad,
      observacion_contabilidad,
      monto_contabilidad
    } = values;

    /* const tipo_contabilidad = "egreso";
    const descripcion_contabilidad = "se pago el personal " */

    setConfigFetchContabilidad({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_contabilidad,
          observacion_contabilidad,
          monto_contabilidad
        })
      }
    });
  };

  useEffect(() => {
    getPersonal();
  }, []);

  // console.log(fetchDataContabilidad);

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="col-sm-7">
                    <div className="card-body">
                    <Formik
                    innerRef={formikRef}
                    initialValues={{
                      descripcion_contabilidad: "",
                      observacion_contabilidad: "",
                      monto_contabilidad: "",
                      tipo_contabilidad: "",
                      fecha_contabilidad: "",
                      personal: ""
                    }}
                    onSubmit={handleSubmit}
                    >
                      <Form id="formAuthentication" className="form-group">
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Personal
                          </label>
                          <Field className="form-control" as="select" name="personal" onChange={(e) => { seleccionarNombre(e); }}>
                            <option value="" disabled>Seleccionar Personal</option>
                            {
                              fetchDataPersonal?.map((item) => {
                                return (
                                  <option key={`${item.id_usuario}-personal`} value={item.id_usuario} >{item.nombre_persona}</option>
                                );
                              })
                            }

                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Tipo de Pago
                          </label>
                          <Field className="form-control" as="select">
                            <option value="xs">Mensual</option>
                            <option value="xd">Diario</option>

                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Monto
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            placeholder= "Ingrese el valor del pago"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <br></br>
                        <Link to='/Egresos'>
                        <button className="btn btn-danger mx-3">
                          Volver
                        </button>
                        </Link >
                        <Link to='/Egresos'>
                        <button className="btn btn-success">
                          Agregar Pago
                        </button>
                        </Link >
                        </Form>
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

export default FormGastosMaquinas;
