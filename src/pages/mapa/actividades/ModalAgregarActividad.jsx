import { Field, Form, Formik } from "formik";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTabsContent
} from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";
import * as yup from "yup";
import Alerta from "../../../components/layouts/Alerta";

import MensajeErrorInput from "../../../components/layouts/MensajeErrorInput";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";

const ModalAgregarActividad = ({
  optSmModal,
  setOptSmModal,
  toggleShow,
  idParcela,
  // idCampania,
  cargarDetalleHistorialParcelaCultivo
}) => {
  const [
    setFetchActividad,
    fetchDataActividad
    // loadingActividad,
    // errorActividad
  ] = useFetch([]);
  const [
    setFetchUsuarios,
    fetchDataUsuarios
    // loadingUsuarios,
    // errorUsuarios
  ] = useFetch([]);
  const [
    setFetchProductos,
    fetchDataProductos
    // loadingProductos,
    // errorProductos
  ] = useFetch([]);
  const [
    setFetchMaquinas,
    fetchDataMaquinas
    // loadingMaquinas,
    // errorMaquinas
  ] = useFetch([]);

  const [
    setFetchGuardarActividad,
    fetchDataGuardarActividad,
    loadingGuardarActividad,
    errorGuardarActividad
  ] = useFetch([]);

  const formikRef = useRef();

  const schemaAsignarActividad = yup.object().shape({
    id_actividad: yup
      .number()
      .typeError("La actividad es requerida")
      .min(1, "La actividad es requerida")
      .required("La actividad es requerida"),
    id_usuario: yup
      .number()
      .typeError("El empeleado es requerido")
      .min(1, "El empeleado es requerido")
      .required("El empeleado es requerido"),
    cantidad_uso_producto: yup.number()
      .typeError("La cantidad de producto es requerida")
      .min(1, "La cantidad de producto es requerida")
      .required("La cantidad de producto es requerida"),
    id_producto: yup
      .number()
      .typeError("El producto es requerido")
      .min(1, "El producto es requerido")
      .required("El producto es requerido"),
    id_maquina: yup
      .number()
      .typeError("La maquina es requerida")
      .min(1, "La maquina es requerida")
      .required("La maquina es requerida"),
    fecha_historial: yup.date().required("Fecha historial es requerida")

  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      id_actividad, id_usuario, cantidad_uso_producto, id_producto, fecha_historial,
      id_maquina
    } = values;
    // console.log(values);
    setFetchGuardarActividad({
      url: `${URL}/historiales/${idParcela}`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          id_actividad,
          id_usuario,
          id_producto,
          cantidad_uso_producto,
          fecha_historial,
          id_maquina
        })
      }
    });
  };
  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorGuardarActividad]);

  useEffect(() => {
    setFetchActividad({
      url: `${URL}/actividades`,
      headersRequest: {
        method: "GET"
      }
    });

    setFetchUsuarios({
      url: `${URL}/usuarios`,
      headersRequest: {
        method: "GET"
      }
    });
    setFetchProductos({
      url: `${URL}/productos`,
      headersRequest: {
        method: "GET"
      }
    });
    setFetchMaquinas({
      url: `${URL}/maquinas`,
      headersRequest: {
        method: "GET"
      }
    });
  }, []);

  useEffect(() => {
    if ("msg" in fetchDataGuardarActividad) {
      cargarDetalleHistorialParcelaCultivo();
      toggleShow();
      formikRef.current.setFieldValue("id_actividad", "");
      formikRef.current.setFieldValue("id_usuario", "");
      formikRef.current.setFieldValue("cantidad_uso_producto", "");
      formikRef.current.setFieldValue("id_producto", "");
      formikRef.current.setFieldValue("fecha_historial", "");
      formikRef.current.setFieldValue("id_maquina", "");
    }
  }, [fetchDataGuardarActividad]);

  return (
    <MDBModal
      staticBackdrop
      stabindex="-1"
      show={optSmModal}
      setShow={setOptSmModal}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Cargar Actividad</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBTabsContent>
              <Formik
                innerRef={formikRef}
                initialValues={{
                  id_actividad: "",
                  id_usuario: "",
                  cantidad_uso_producto: "",
                  id_producto: "",
                  fecha_historial: "",
                  id_maquina: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={schemaAsignarActividad}
              >
                {({ isSubmitting, isValid }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="id_actividad" className="form-label">
                        Actividad
                      </label>
                      <Field
                        as="select"
                        name="id_actividad"
                        id="id_actividad"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Seleccione una Actividad
                        </option>
                        {fetchDataActividad?.map((actividad) => (
                          <option
                            key={`actividad-${actividad.id_actividad}`}
                            value={actividad.id_actividad}
                          >
                            {actividad.descripcion_actividad}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <MensajeErrorInput
                      name="id_actividad"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="id_usuario" className="form-label">
                        Empleado a Cargo
                      </label>
                      <Field
                        as="select"
                        name="id_usuario"
                        id="id_usuario"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Seleccione un empleado
                        </option>
                        {fetchDataUsuarios?.map((empleado) => (
                          <option
                            key={`empleado-${empleado.id_usuario}`}
                            value={empleado.id_usuario}
                          >
                            {empleado.nombre_persona}-
                            {empleado.apellido_persona}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <MensajeErrorInput
                      name="id_usuario"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label
                        htmlFor="cantidad_uso_producto"
                        className="form-label"
                      >
                        Cantidad Producto
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        id="cantidad_uso_producto"
                        name="cantidad_uso_producto"
                        placeholder="Por favor ingrese la cantidad de producto a utilizar"
                      />
                    </div>
                    <MensajeErrorInput
                      name="cantidad_uso_producto"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="id_producto" className="form-label">
                        Producto
                      </label>
                      <Field
                        as="select"
                        name="id_producto"
                        id="id_producto"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Seleccione un Producto
                        </option>
                        {fetchDataProductos?.map((producto) => (
                          <option
                            key={`producto-${producto.id_producto}`}
                            value={producto.id_producto}
                          >
                            {producto.descripcion_producto}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <MensajeErrorInput
                      name="id_producto"
                      className="alert alert-danger"
                    />

                    <div className="mb-3">
                      <label htmlFor="fecha_historial" className="form-label">
                        Fecha Actividad
                      </label>
                      <Field
                        type="date"
                        className="form-control"
                        id="fecha_historial"
                        name="fecha_historial"
                      />
                    </div>
                    <MensajeErrorInput
                      name="fecha_historial"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="id_maquina" className="form-label">
                        Maquina
                      </label>
                      <Field
                        as="select"
                        name="id_maquina"
                        id="id_maquina"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Seleccione una Maquina
                        </option>
                        {fetchDataMaquinas?.map((maquina) => (
                          <option
                            key={`producto-${maquina.id_maquina}`}
                            value={maquina.id_maquina}
                          >
                            {maquina.descripcion_maquina}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <MensajeErrorInput
                      name="id_maquina"
                      className="alert alert-danger"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="btn btn-primary d-grid w-100"
                    >
                      Asignar Activdad
                    </button>
                  </Form>
                )}
              </Formik>

              {loadingGuardarActividad && (
                <h3 className="text-warning">Guardando Actividad</h3>
              )}

              {errorGuardarActividad?.errors &&
                errorGuardarActividad?.errors.map((msgError, i) => (
                  <Alerta
                    claseAlerta="danger"
                    key={i}
                    mensajeAlerta={msgError?.msg}
                  />
                ))}
              {/* <p className="text-center">
                <span>Ya tienes una cuenta?</span>
                <Link to="/auth">
                  <span>Inicia Sesión</span>
                </Link>
              </p> */}
              {/* </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </MDBTabsContent>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default ModalAgregarActividad;
