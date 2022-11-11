import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import MensajeErrorInput from "../../components/layouts/MensajeErrorInput";

import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Loading from "../../components/layouts/Loading";
import Alerta from "../../components/layouts/Alerta";

function FormMaquinas () {
  const [setConfigFetchMaquina, fetchDataMaquina, loadingMaquina, errorMaquina] = useFetch();
  const formikRef = useRef();

  const navigate = useNavigate();

  const schemaFormMaquinas = yup.object().shape({
      descripcion_maquina: yup.string().required("La descripcion de la maquina es requerida"),
      tipo_adquisicion_maquina: yup.string().required("El tipo de la maquina es requerido"),
      precio_adquisicion_maquina: yup.string().required("El precio de la maquina es requerido"),
      fecha_adquisicion_maquina: yup.string().required("La fecha de la maquina es requerida")
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      descripcion_maquina,
      tipo_adquisicion_maquina,
      precio_adquisicion_maquina,
      fecha_adquisicion_maquina
    } = values;

    setConfigFetchMaquina({
      url: `${URL}/maquinas`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_maquina,
          tipo_adquisicion_maquina,
          precio_adquisicion_maquina,
          fecha_adquisicion_maquina
        })
      }
    });
  };
  
  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorMaquina]);

  useEffect(() => {
    if (fetchDataMaquina.length === 0) return;
    navigate("/Maquinas");
  }, [fetchDataMaquina]);
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
                        descripcion_maquina: "",
                        tipo_adquisicion_maquina: "",
                        precio_adquisicion_maquina: "",
                        fecha_adquisicion_maquina: ""
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={schemaFormMaquinas}
                    >
                {({ isSubmitting }) => (
                      <Form id="formAuthentication" className="form-group">
                      <div className="mb-3">
                        <label  className="form-label">
                          Nombre De la maquina
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="descripcion_maquina"
                          name="descripcion_maquina"
                          placeholder="Por favor ingrese el nombre de la maquina"
                          
                        />
                        <div id="emailHelp" className="form-text">
                          Agregar un nombre descriptivo
                        </div>
                      </div>
                      <MensajeErrorInput
                        name="descripcion_maquina"
                        className="alert alert-danger"
                      />
                      <div className="mb-3">
                        <label className="form-label">
                          Tipo De Maquina
                        </label>
                        <Field
                            as="select"
                            className="form-select"
                            id="tipo_adquisicion_maquina"
                            name="tipo_adquisicion_maquina"
                            // defaultValue = ""
                          >
                            <option disabled value="">Lista Tipos Productos</option>
                            <option key="compra" value="compra">Comprado</option>
                            <option key="alquiler" value="alquiler">Alquilado</option>
                        </Field>
                      </div>
                      <MensajeErrorInput
                        name="tipo_adquisicion_maquina"
                        className="alert alert-danger"
                      />
                      <div className="mb-3">
                        <label className="form-label">
                          Precio de la maquina
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          id="precio_adquisicion_maquina"
                          name="precio_adquisicion_maquina"
                          placeholder="Por favor ingrese el precio de la adquisicion de la maquina"
                        />
                      </div>
                      <MensajeErrorInput
                        name="precio_adquisicion_maquina"
                        className="alert alert-danger"
                      />
                      <div className="mb-3">
                        <label className="form-label">
                          Fecha de la adquisicion
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          id="fecha_adquisicion_maquina"
                          name="fecha_adquisicion_maquina"
                          placeholder="Por favor ingrese la fecha de adquisicion"
                        />
                      </div>
                      <MensajeErrorInput
                        name="fecha_adquisicion_maquina"
                        className="alert alert-danger"
                      />
                      <button type="submit" disabled={isSubmitting} className="btn btn-success">
                        Agregar Maquina
                      </button>
                      </Form>
                )}
              </Formik>
                    </div>
                  </div>
                  {loadingMaquina && <Loading />}

                {errorMaquina?.errors &&
                  errorMaquina?.errors.map((msgError, i) => (
                    <Alerta
                      claseAlerta="danger"
                      key={i}
                      mensajeAlerta={msgError?.msg}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default FormMaquinas;
