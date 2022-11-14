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

function FormAlmacen () {

  const [setConfigFetchAlmacen, fetchDataAlmacen, loadingMaquinaAlmacen, errorAlmacen] = useFetch();
  const formikRef = useRef();

  const navigate = useNavigate();

  const schemaFormAlmacen = yup.object().shape({
      descripcion_almacen: yup.string().required("La descripcion del almacen es requerida"),
      tipo_adquisicion: yup.string().required("El tipo del almacen es requerido"),
      precio_adquisicion: yup.string().required("El precio del almacen es requerido"),
      fecha_adquisicion: yup.string().required("La fecha del almacen es requerida")
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
        descripcion_almacen,
        tipo_adquisicion,
        precio_adquisicion,
        fecha_adquisicion
    } = values;

    setConfigFetchAlmacen({
      url: `${URL}/almacenes`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
            descripcion_almacen,
            tipo_adquisicion,
            precio_adquisicion,
            fecha_adquisicion
        })
      }
    });
  };
  
  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorAlmacen]);

  useEffect(() => {
    if (fetchDataAlmacen.length === 0) return;
    navigate("/almacenes");
  }, [fetchDataAlmacen]);
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
                        descripcion_almacen: "",
                        tipo_adquisicion: "",
                        precio_adquisicion: "",
                        fecha_adquisicion: ""
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={schemaFormAlmacen}
                    >
                {({ isSubmitting }) => (
                      <Form id="formAuthentication" className="form-group">
                      <div className="mb-3">
                        <label  className="form-label">
                          Nombre Del almacen
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="descripcion_almacen"
                          name="descripcion_almacen"
                          placeholder="Por favor ingrese el nombre del almacen"
                          
                        />
                        <div id="emailHelp" className="form-text">
                          Agregar un nombre descriptivo
                        </div>
                      </div>
                      <MensajeErrorInput
                        name="descripcion_almacen"
                        className="alert alert-danger"
                      />
                      <div className="mb-3">
                        <label className="form-label">
                          Tipo De Maquina
                        </label>
                        <Field
                            as="select"
                            className="form-select"
                            id="tipo_adquisicion"
                            name="tipo_adquisicion"
                            // defaultValue = ""
                          >
                            <option disabled value="">Lista Tipos De Adquisicion</option>
                            <option key="compra" value="compra">Comprado</option>
                            <option key="alquiler" value="alquiler">Alquilado</option>
                        </Field>
                      </div>
                      <MensajeErrorInput
                        name="tipo_adquisicion"
                        className="alert alert-danger"
                      />
                      <div className="mb-3">
                        <label className="form-label">
                          Precio del almacen
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          id="precio_adquisicion"
                          name="precio_adquisicion"
                          placeholder="Por favor ingrese el precio de la adquisicion del almacen"
                        />
                      </div>
                      <MensajeErrorInput
                        name="precio_adquisicion"
                        className="alert alert-danger"
                      />
                      <div className="mb-3">
                        <label className="form-label">
                          Fecha de la adquisicion
                        </label>
                        <Field
                          type="date"
                          className="form-control"
                          id="fecha_adquisicion"
                          name="fecha_adquisicion"
                          placeholder="Por favor ingrese la fecha de adquisicion"
                        />
                      </div>
                      <MensajeErrorInput
                        name="fecha_adquisicion"
                        className="alert alert-danger"
                      />
                      <Link to='/almacenes'>
                        <button className="btn btn-danger mx-3">
                          Volver
                        </button>
                    </Link>

                      <button type="submit" disabled={isSubmitting} className="btn btn-success">
                        Agregar Almacen
                      </button>
                      
                      </Form>
                )}
              </Formik>
                    </div>
                  </div>
                  {loadingMaquinaAlmacen && <Loading />}

                {errorAlmacen?.errors &&
                  errorAlmacen?.errors.map((msgError, i) => (
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

export default FormAlmacen;