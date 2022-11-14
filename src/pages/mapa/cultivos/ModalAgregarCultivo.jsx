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

const ModalAgregarCultivo = ({
  optSmModal,
  setOptSmModal,
  toggleShow,
  idParcela,
  idCampania,
  cargarDetalleParcelaCultivo
}) => {
  const [
    setFetchCultivos,
    fetchDataCultivos
    // loadingCultivos,
    // errorCultivos
  ] = useFetch([]);
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
    id_cultivo: yup
      .number()
      .typeError("El cultivo es requerida")
      .min(1, "El cultivo es requerida")
      .required("El cultivo es requerida"),
    cantidad_sembrada: yup
      .number()
      .typeError("La cantidad sembrada debe ser numerica")
      .min(1, "La cantidad sembrada no puede ser menor a 1")
      .required("La cantidad sembrada es requerida"),
    fecha_inicio: yup.date().required("Fecha inicio es requerida"),
    unidad_medida_total_sembrada: yup
      .number()
      .typeError("La unidad medida es requerida")
      .min(1, "La unidad medida es requerida")
      .required("La unidad medida es requerida")
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      id_cultivo,
      cantidad_sembrada,
      fecha_inicio,
      unidad_medida_total_sembrada
    } = values;
    // console.log(values);
    setFetchGuardarCultivo({
      url: `${URL}/parcelas-cultivos`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          id_parcela: idParcela,
          id_campania: idCampania,
          id_cultivo,
          cantidad_sembrada,
          unidad_medida_total_sembrada,
          fecha_inicio
        })
      }
    });
  };
  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorGuardarCultivo]);

  useEffect(() => {
    setFetchCultivos({
      url: `${URL}/cultivos`,
      headersRequest: {
        method: "GET"
      }
    });
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
      formikRef.current.setFieldValue("id_cultivo", "");
      formikRef.current.setFieldValue("cantidad_sembrada", "");
      formikRef.current.setFieldValue("fecha_inicio", "");
      formikRef.current.setFieldValue("unidad_medida_total_sembrada", "");
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
            <MDBModalTitle>Asignar Cultivo</MDBModalTitle>
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
                  id_cultivo: "",
                  cantidad_sembrada: "",
                  fecha_inicio: "",
                  unidad_medida_total_sembrada: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={schemaAsignarCultivo}
              >
                {({ isSubmitting, isValid }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="id_cultivo" className="form-label">
                        Cultivo
                      </label>
                      <Field
                        as="select"
                        name="id_cultivo"
                        id="id_cultivo"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Cultivos
                        </option>
                        {fetchDataCultivos?.map((cultivo) => (
                          <option
                            key={cultivo.id_cultivo}
                            value={cultivo.id_cultivo}
                          >
                            {cultivo.descripcion_cultivo}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <MensajeErrorInput
                      name="id_cultivo"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="cantidad_sembrada" className="form-label">
                        Cantidad Sembrada
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        id="cantidad_sembrada"
                        name="cantidad_sembrada"
                        placeholder="Por favor ingrese su apellido"
                      />
                    </div>
                    <MensajeErrorInput
                      name="cantidad_sembrada"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="fecha_inicio" className="form-label">
                        Fecha Inicio
                      </label>
                      <Field
                        type="date"
                        className="form-control"
                        id="fecha_inicio"
                        name="fecha_inicio"
                        placeholder="Por favor ingrese su dni"
                      />
                    </div>
                    <MensajeErrorInput
                      name="fecha_inicio"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label
                        htmlFor="unidad_medida_total_sembrada"
                        className="form-label"
                      >
                        Unidad Medida Sembrada
                      </label>
                      <Field
                        as="select"
                        name="unidad_medida_total_sembrada"
                        id="unidad_medida_total_sembrada"
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
                      name="unidad_medida_total_sembrada"
                      className="alert alert-danger"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="btn btn-primary d-grid w-100"
                    >
                      Asignar Cultivo
                    </button>
                  </Form>
                )}
              </Formik>

              {loadingGuardarCultivo && (
                <h3 className="text-warning">Guardando Cultivo</h3>
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

export default ModalAgregarCultivo;
