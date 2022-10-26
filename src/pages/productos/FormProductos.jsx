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


function FormProductos() {
  const { setConfigFetch, fetchData, loading, error } = useFetch();
  const formikRef = useRef();

  const navigate = useNavigate();

  const schemaFormProductos = yup.object().shape({
    descripcion_producto: yup.string().required("La descripcion del producto es requerida"),
    fecha_vencimiento_producto: yup.date().required("La fecha de vencimiento es requerida"),
    cantidad_producto: yup.number().required("La cantidad del producto es requerida"),
  

  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      descripcion_producto,
      fecha_vencimiento_producto,
      cantidad_producto,
      
    } = values;

    setConfigFetch({
      url: `${URL}/productos`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_producto,
          fecha_vencimiento_producto,
          cantidad_producto,
          id_proveedor:1,
          id_tipo_producto:1,
          id_usuario: 1,
          id_unidad_medida:1
        })
      }
    });
  };
console.log(fetchData)
  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [error]);

  useEffect(() => {
    if (fetchData.length === 0) return;
    navigate("/Productos");
  }, [fetchData]);
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
                        descripcion_producto: "",
                        fecha_vencimiento_producto: "",
                        cantidad_producto:"",
                        id_proveedor:"",
                        id_tipo_producto:""
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={schemaFormProductos}
                    >
                {({ isSubmitting }) => (
                      <Form id="formAuthentication" className="form-group">
                        <div className="mb-3">
                          <label  className="form-label">
                            Nombre Del Producto
                          </label>                        
                          <Field
                            type="text"
                            className="form-control"
                            id="descripcion_producto"
                            name="descripcion_producto"
                            placeholder="Por favor ingrese el nombre del producto"
                            aria-describedby="emailHelp"
                          />
                          <div id="emailHelp" className="form-text">
                            Agregar un nombre descriptivo
                          </div>
                        </div>
                        <MensajeErrorInput
                          name="descripcion_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label  className="form-label">
                            Fecha de Vencimiento
                          </label>
                          <Field
                            type="date"
                            className="form-control"
                            id="fecha_vencimiento_producto"
                            name="fecha_vencimiento_producto"
                            placeholder="Por favor ingrese el nombre del producto"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <MensajeErrorInput
                          name="fecha_vencimiento_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label  className="form-label">
                            Cantidad de productos
                          </label>
                          <Field
                            type="number"
                            className="form-control"
                            id="cantidad_producto"
                            name="cantidad_producto"
                            placeholder="Por favor ingrese el nombre del producto"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <MensajeErrorInput
                          name="cantidad_producto"
                          className="alert alert-danger"
                        />
                        {/* <div className="mb-3">
                          <label  className="form-label">
                            Tipo De Producto
                          </label>
                          <Field
                            as="select"
                            className="form-select"
                            id="id_tipo_producto"
                            name="id_tipo_producto"
                          >
                            <option disabled selected="selected">Lista Tipos Productos</option>
                            <option value="1">Fertilizante</option>
                            <option value="2">Vehiculo</option>
                            <option value="3">Edificio</option>
                          </Field>
                          
                        </div>
                        <MensajeErrorInput
                          name="id_tipo_producto"
                          className="alert alert-danger"
                        />
                        <div className="mb-3">
                          <label  className="form-label">
                            Proveedor
                          </label>
                          <Field
                            as="select"
                            className="form-select"
                            id="id_proveedor"
                            name="id_proveedor"
                          >
                            <option disabled selected="selected">Lista Proveedores</option>
                            <option value="1">Proveedor 1</option>
                            <option value="2">Proveedor 2</option>
                            <option value="3">Proveedor 3</option>
                          </Field>
                        </div>
                        <MensajeErrorInput
                          name="id_proveedor"
                          className="alert alert-danger"
                        /> */}
                        <br></br>
                        <Link to='/Productos'>
                        <button className="btn btn-danger mx-3">
                          Volver
                        </button>
                        </Link>
                        <button type="submit"  disabled={isSubmitting} className="btn btn-success">
                          Agregar Producto
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

export default FormProductos;
