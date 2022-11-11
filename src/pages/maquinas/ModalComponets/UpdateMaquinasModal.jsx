import { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import MensajeErrorInput from "../../../components/layouts/MensajeErrorInput";
import Loading from "../../../components/layouts/Loading";
import Alerta from "../../../components/layouts/Alerta";

import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";
import { Field, Form, Formik } from "formik";

import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const UpdateMaquinasModal = ({optSmModalEdit,setoptSmModalEdit,toggleShowEdit,datosMaquina, getMaquinas}) => {

  //console.log(datosMaquina)
  const [setConfigFetchMaquinasPUT,fetchDataMaquinasPUT, loadingPUT, errorPut] = useFetch();

  const formikRef = useRef();

  const schemaFormMaquinas = yup.object().shape({
    descripcion_maquina: yup.string().required("La descripcion de la maquina es requerida"),
    tipo_adquisicion_maquina: yup.string().required("Seleccione un tipo de maquina"),
    precio_adquisicion_maquina: yup.number().required("El precio la compra es requerido"),
    fecha_adquisicion_maquina: yup.date().required("La fecha de adquisicion es requerida"),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
      descripcion_maquina,
      tipo_adquisicion_maquina,
      precio_adquisicion_maquina,
      fecha_adquisicion_maquina,
    } = values;

    
    setConfigFetchMaquinasPUT({
      url: `${URL}/maquinass/${datosMaquina.id_maquina}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
          descripcion_maquina,
          tipo_adquisicion_maquina,
          precio_adquisicion_maquina,
          fecha_adquisicion_maquina,
        })
      }
    }); 
  };

  useEffect(()=>{
    getMaquinas()
  },[fetchDataMaquinasPUT])

  return (
    <MDBModal
    staticBackdrop
    stabindex="-1"
    show={optSmModalEdit}
    setShow={setoptSmModalEdit}
  >
    <MDBModalDialog centered>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>
            <h5>Editar Datos De La Maquina:</h5>
          </MDBModalTitle>
          <MDBBtn
            className="btn-close"
            color="none"
            onClick={toggleShowEdit}
          ></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
                <div >
                  <div className="card-body">
                  <Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                      descripcion_maquina: datosMaquina?.descripcion_maquina,
                      tipo_adquisicion_maquina: datosMaquina?.tipo_adquisicion_maquina,
                      precio_adquisicion_maquina: datosMaquina?.precio_adquisicion_maquina,
                      fecha_adquisicion_maquina: datosMaquina?.fecha_adquisicion_maquina,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={schemaFormMaquinas}
                  >
              {({ isSubmitting, dirty }) => (
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
                            <option key="compra" value="compra" style={{color:'green'}}>Comprado</option>
                            <option key="alquiler" value="alquiler" style={{color:'yelow'}}>Alquilado</option>
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
                      <button type="submit" disabled={!dirty} className="btn btn-success">
                        Editar Maquina
                      </button>
                      </Form>
              )}
            </Formik>
                  </div>
                </div>
                {loadingPUT && <Loading />}

              {errorPut?.errorPut &&
                errorPut?.errors.map((msgError, i) => (
                  <Alerta
                    claseAlerta="danger"
                    key={i}
                    mensajeAlerta={msgError?.msg}
                  />
                ))}
             
        </MDBModalBody>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>
  )
}

export default UpdateMaquinasModal