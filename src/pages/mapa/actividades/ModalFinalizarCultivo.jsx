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

const ModalFinalizarCultivo = ({
  optSmModal,
  setOptSmModal,
  toggleShow,
  cargarDetalleParcelaCultivo,
  idParcelaCultivo
}) => {
  const [
    setFetchUnidadesMedidas,
    fetchDataUnidadesMedidas
    // loadingUnidadesMedidas,
    // errorUnidadesMedidas
  ] = useFetch([]);
  const [
    setFetchGuardarCultivo,
    fetchDataGuardarCultivo,
    loadingGuardarCultivo,
    errorGuardarCultivo
  ] = useFetch([]);

  const formikRef = useRef();

  const schemaAsignarCultivo = yup.object().shape({
    cantidad_total_cosechada: yup
      .number()
      .typeError("La cantidad sembrada debe ser numerica")
      .min(1, "La cantidad sembrada no puede ser menor a 1")
      .required("La cantidad sembrada es requerida"),
    fecha_final: yup.date().required("Fecha inicio es requerida"),
    unidad_medida_total_cosechada: yup
      .number()
      .typeError("La unidad medida es requerida")
      .min(1, "La unidad medida es requerida")
      .required("La unidad medida es requerida")
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      cantidad_total_cosechada,
      fecha_final,
      unidad_medida_total_cosechada
    } = values;
    // console.log(values);
    // console.log(idParcelaCultivo);
    setFetchGuardarCultivo({
      url: `${URL}/parcelas-cultivos/${idParcelaCultivo}`,
      headersRequest: {
        method: "PATCH",
        body: JSON.stringify({
          cantidad_total_cosechada,
          fecha_final,
          unidad_medida_total_cosechada
        })
      }
    });
  };
  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorGuardarCultivo]);

  useEffect(() => {
    setFetchUnidadesMedidas({
      url: `${URL}/unidades-medidas`,
      headersRequest: {
        method: "GET"
      }
    });
  }, []);

  useEffect(() => {
    if ("msg" in fetchDataGuardarCultivo) {
      cargarDetalleParcelaCultivo();
      toggleShow();
      formikRef.current.setFieldValue("cantidad_total_cosechada", "");
      formikRef.current.setFieldValue("fecha_final", "");
      formikRef.current.setFieldValue("unidad_medida_total_cosechada", "");
    }
  }, [fetchDataGuardarCultivo]);

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
            <MDBModalTitle>Finalizar Cultivo</MDBModalTitle>
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
                  cantidad_total_cosechada: "",
                  fecha_final: "",
                  unidad_medida_total_cosechada: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={schemaAsignarCultivo}
              >
                {({ isSubmitting, isValid }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="cantidad_total_cosechada" className="form-label">
                        Cantidad Cosechada
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        id="cantidad_total_cosechada"
                        name="cantidad_total_cosechada"
                        placeholder="Por favor ingrese su apellido"
                      />
                    </div>
                    <MensajeErrorInput
                      name="cantidad_total_cosechada"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="fecha_final" className="form-label">
                        Fecha Finalización
                      </label>
                      <Field
                        type="date"
                        className="form-control"
                        id="fecha_final"
                        name="fecha_final"
                        placeholder="Por favor ingrese su dni"
                      />
                    </div>
                    <MensajeErrorInput
                      name="fecha_final"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label
                        htmlFor="unidad_medida_total_cosechada"
                        className="form-label"
                      >
                        Unidad Medida Sembrada
                      </label>
                      <Field
                        as="select"
                        name="unidad_medida_total_cosechada"
                        id="unidad_medida_total_cosechada"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Unidades Medidas
                        </option>
                        {fetchDataUnidadesMedidas?.map((unidadesMedida) => (
                          <option
                            key={unidadesMedida.id_unidad_medida}
                            value={unidadesMedida.id_unidad_medida}
                          >
                            {unidadesMedida.descripcion_unidad_medida}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <MensajeErrorInput
                      name="unidad_medida_total_cosechada"
                      className="alert alert-danger"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="btn btn-primary d-grid w-100"
                    >
                      Finalizar Cultivo
                    </button>
                  </Form>
                )}
              </Formik>

              {loadingGuardarCultivo && (
                <h3 className="text-warning">Finalizando Cultivo</h3>
              )}

              {errorGuardarCultivo?.errors &&
                errorGuardarCultivo?.errors.map((msgError, i) => (
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

export default ModalFinalizarCultivo;
