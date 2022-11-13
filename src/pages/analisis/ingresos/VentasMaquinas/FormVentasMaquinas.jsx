import { Field, Form, Formik } from "formik";
import { useRef, useEffect, useState } from "react";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import LayoutContainer from "../../../../components/layouts/LayoutContainer";
import MensajeErrorInput from "../../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../../hooks/useFetch";
import { URL } from "../../../../utils/getUrl";

const FormVentasMaquinas = () => {
  const [
    setFetchMaquinas,
    fetchDataMaquinas,
    loadingMaquinas,
    errorMaquinas
  ] = useFetch([]);

  const [
    setFetchContabilidad,
    fetchDataContabilidad,
    // loadingContabilidad,
    errorContabilidad
  ] = useFetch([]);
  const [
    setFetchVentaMaquina,
    fetchDataVentaMaquina,
    // loadingVentaMaquina,
    errorVentaMaquina
  ] = useFetch([]);
  const [descripcionMaquina, setDescripcionMaquina] = useState("");
  const formikRef = useRef();
  const navigate = useNavigate();

  const schemaVentaMaquina = yup.object().shape({
    maquinas: yup.string().required("La campaña es requerida"),
    precio_venta: yup
      .number()
      .typeError("El monto total a vender debe ser numerica")
      .min(1, "El monto a vender no puede ser menor a 1")
      .required("El monto a vender es requerida")
  });

  const hanldeChangeMaquina = (e) => {
    const id = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[id];
    const descripcionMaquina = option.getAttribute("data-descripcion-maquina");
    setDescripcionMaquina(descripcionMaquina);
  };

  const handleSubmit = (values) => {
    const {
      maquinas,
      precio_venta
    } = values;

    console.log(values);

    setFetchVentaMaquina({
      url: `${URL}/maquinas-vender/${maquinas}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
          precio_venta_maquina: precio_venta
        })
      }
    });

    setFetchContabilidad({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_contabilidad: `Se realizo la venta de la maquina: ${descripcionMaquina}`,
          observacion_contabilidad: "-",
          tipo_contabilidad: "ingreso",
          monto_contabilidad: precio_venta,
          id_parcela_cultivo: "1"
        })
      }
    });
  };

  useEffect(() => {
    formikRef.current.setFieldValue("maquinas", "");

    setFetchMaquinas({
      url: `${URL}/maquinas`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setFetchMaquinas([]);
    };
  }, []);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [errorMaquinas]);

  useEffect(() => {
    if ("msg" in fetchDataVentaMaquina && "msg" in fetchDataContabilidad) {
      alert("Venta guardada exitosamente");
      navigate("/Ingresos", { state: { tab: "tab3" } });
    }
  }, [fetchDataContabilidad, fetchDataVentaMaquina]);

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
                          maquinas: "",
                          precio_venta: ""
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={schemaVentaMaquina}
                      >
                        {({ isSubmitting, handleChange, isDirty, isValid }) => (
                          <Form className="form-group">
                            <div className="mb-3">
                              <label className="form-label">
                                Seleccione Maquina
                              </label>
                              <Field
                                as="select"
                                name="maquinas"
                                id="maquinas"
                                className="form-control"
                                onChange={(e) => {
                                  handleChange(e);
                                  hanldeChangeMaquina(e);
                                }}
                              >
                                <option value="" disabled>
                                  Seleccione una maquina
                                </option>
                                {fetchDataMaquinas?.map((maquina) => (
                                  <option
                                    key={maquina.id_maquina}
                                    value={maquina.id_maquina}
                                    disabled={maquina.precio_venta_maquina !== null}
                                    data-descripcion-maquina={maquina.descripcion_maquina}
                                  >
                                    {maquina.descripcion_maquina}
                                  </option>
                                ))}
                              </Field>

                              <MensajeErrorInput
                                name="campania"
                                className="alert alert-danger mt-2"
                              />
                              {loadingMaquinas && (
                                <b className="text-warning">
                                  Cargando Campañas
                                </b>
                              )}
                              {errorMaquinas?.length > 0 && (
                                <b className="text-warning">
                                {errorMaquinas}
                                </b>
                              )}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Ingrese Monto Total
                              </label>
                              <Field
                                name="precio_venta"
                                type="number"
                                className="form-control"
                                placeholder="Por favor ingrese el monto total"
                                aria-describedby="emailHelp"
                              />
                              <MensajeErrorInput
                                name="precio_venta"
                                className="alert alert-danger mt-2"
                              />
                            </div>
                            <div className="mb-3">
                              <Link to="/Ingresos" state={{ tab: "tab3" }}>
                                <button className="btn btn-danger">
                                  Volver
                                </button>
                              </Link>
                              <input
                                type="submit"
                                className="btn btn-success mx-2"
                                disabled={isSubmitting || !isValid}
                                value="Guardar Venta"
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {/* {errorPacelasCultivos && <h3>{errorPacelasCultivos}</h3>} */}

                      {
                        (errorContabilidad?.length > 0 && errorVentaMaquina?.length > 0) && (
                          <h3 className="text-danger">Error al guardar la venta</h3>
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

export default FormVentasMaquinas;
