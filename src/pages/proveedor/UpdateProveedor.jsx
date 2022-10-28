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
import { useParams } from 'react-router';

function UpdateProveedor () {
    const {proid} = useParams();
    console.log(proid)
    
  const [setConfigFetchProveedores, fetchData, loading, error] = useFetch();
  const formikRef = useRef();

  const navigate = useNavigate();

  const getProveedores = () => {
    setConfigFetchProveedores({
      url: `${URL}/proveedores/${proid}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  useEffect(() => {
    getProveedores();
  }, []);

  /*
   nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor,
  */
  const schemaFormProveedor = yup.object().shape({
    nombre_proveedor: yup.string().required("El nombre del proveedor es requerido"),
    telefono_proveedor: yup.number().required("El telefono del proveedor es requerido"),
    direccion_proveedor: yup.string().required("La direccion del proveedor es requerida")
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      nombre_proveedor,
      telefono_proveedor,
      direccion_proveedor
    } = values;

    setConfigFetchProveedores({
      url: `${URL}/proveedores`,
      headersRequest: {
        method: "UPDATE",
        body: JSON.stringify({
          nombre_proveedor,
          telefono_proveedor,
          direccion_proveedor
        })
      }
    }); 
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [error]);

 /*  useEffect(() => {
    if (fetchData.length === 0) return;
    navigate("/proveedores");
  }, [fetchData]); */

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
                        nombre_proveedor: "",
                        telefono_proveedor: "",
                        direccion_proveedor: ""
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={schemaFormProveedor}
                    >
                {({ isSubmitting }) => (
                      <Form id="formAuthentication" className="form-group">
                        <div className="mb-3">
                          <label className="form-label">
                            Nombre Del Preveedor
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="nombre_proveedor"
                            name="nombre_proveedor"
                            placeholder="Por favor ingrese el nombre del proveedor"
                            value={fetchData.nombre_proveedor}

                          />
                          <div id="emailHelp" className="form-text">
                            Agregar el nombre completo
                          </div>
                        </div>
                        <MensajeErrorInput
                          name="nombre_proveedor"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label className="form-label">
                           Telefono del proveedor
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            id="telefono_proveedor"
                            name="telefono_proveedor"
                            placeholder="Por favor ingrese el numero del proveedor"
                            value={fetchData.telefono_proveedor}

                          />
                        </div>
                        <MensajeErrorInput
                          name="telefono_proveedor"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label className="form-label">
                            Direccion del proveedor
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="direccion_proveedor"
                            name="direccion_proveedor"
                            placeholder="Por favor ingrese la direccion"
                            value={fetchData.direccion_proveedor}
                          />
                        </div>
                        <MensajeErrorInput
                          name="direccion_proveedor"
                          className="alert alert-danger"
                        />

                        <br></br>
                        <Link to='/proveedores'>
                        <button className="btn btn-danger mx-3">
                          Volver
                        </button>
                        </Link>
                        <button type="submit" disabled={isSubmitting} className="btn btn-info">
                          Actualizar Proveedor
                        </button>
                        </Form>
                )}
              </Formik>
                    </div>
                  </div>
                  {loading && <Loading />}

                {error?.errors &&
                  error?.errors.map((msgError, i) => (
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

export default UpdateProveedor;
