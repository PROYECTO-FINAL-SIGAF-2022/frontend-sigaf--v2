import { Field, Formik, Form } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutContainer from "../../../../../components/layouts/LayoutContainer";

import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";

const FormGastosMaquinas = () => {
  const [isSend, setIsSend] = useState(false)
  const [setConfigFetchPersonal, fetchDataPersonal] = useFetch();
  const [setConfigFetchContabilidad, fetchDataContabilidad] = useFetch();

  const [descripcionContabilidad, setDescripcionContabilidad] = useState("");
  /*   const [tipoContabilidad, setTipoContabilidad] = useState("1"); */

  const guardarDatos = (e) => {
    const nombrePersonal = e.target.value;
    setDescripcionContabilidad("Se pago al personal: " + nombrePersonal);
  };

  const formikRef = useRef();
  const navigate = useNavigate();

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
          descripcion_contabilidad: descripcionContabilidad,
          observacion_contabilidad,
          tipo_contabilidad: "egreso",
          monto_contabilidad: monto_contabilidad,
          id_parcela_cultivo: 1
        })
      }
    });

    setIsSend(true)
  };

  useEffect(() => {
    getPersonal();
  }, []);

  

  useEffect(()=> {
    if (!isSend) return;
    navigate("/Egresos", { state: { tab: "tab2" } });
  }, [isSend])

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
                      observacion_contabilidad: "",
                      monto_contabilidad: "",
                      personal: ""
                    }}
                    onSubmit={handleSubmit}
                    >
                      {({ handleChange }) => (
                        <Form id="formAuthentication" className="form-group">
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Personal
                          </label>
                          <Field
                            className="form-control"
                            as="select"
                            name="personal"
                            onChange={(e) => {
                              handleChange(e);
                              guardarDatos(e);
                            }}
                          >
                            <option value="" disabled>
                              Seleccionar Personal...
                            </option>
                            {fetchDataPersonal?.map((item) => {
                              return (
                                <option
                                  key={`${item.id_usuario}-personal`}
                                  value={`${item.nombre_persona} ${item.apellido_persona}`}
                                >
                                  {item.nombre_persona}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Seleccione Tipo de Pago
                          </label>
                          <Field className="form-control" as="select" name="observacion_contabilidad">
                            <option value="" disabled>Seleccionar Tipo...</option>
                            <option value="pago mensual">Mensual</option>
                            <option value="pago por dia">Diario</option>
                          </Field>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Monto
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            name= "monto_contabilidad"
                            placeholder= "Ingrese el valor del pago"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <br></br>
                        <Link to='/Egresos' state={{ tab: "tab2" }}>
                        <button className="btn btn-danger mx-3">
                          Volver
                        </button>
                        </Link >
                        <button type="submit" className="btn btn-success" >
                          Agregar Pago
                        </button>
                        </Form>
                      )
                  }
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
