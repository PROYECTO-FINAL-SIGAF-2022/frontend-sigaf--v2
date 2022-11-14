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

const UpdateAlmacenModal = ({optSmModalEdit,setoptSmModalEdit,toggleShowEdit,datosAlmacen, getAlmacen}) => {

  //console.log(datosMaquina)
  const [setConfigFetchAlmacenPUT,fetchDataAlmacenPUT, loadingPUT, errorPut] = useFetch();

  const formikRef = useRef();

  const schemaFormAlmacen = yup.object().shape({
    descripcion_almacen: yup.string().required("La descripcion del almacen es requerido"),
    tipo_adquisicion: yup.string().required("Seleccione un tipo de almacen"),
    precio_adquisicion: yup.number().required("El precio del almacen es requerido"),
    fecha_adquisicion: yup.date().required("La fecha de adquisicion es requerida"),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    const {
        descripcion_almacen,
    tipo_adquisicion,
    precio_adquisicion,
    fecha_adquisicion
    } = values;

    
    setConfigFetchAlmacenPUT({
      url: `${URL}/almacenes/${datosAlmacen.id_almacen}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
            descripcion_almacen,
    tipo_adquisicion,
    precio_adquisicion,
    fecha_adquisicion
        })
      }
    }); 
  };

  useEffect(()=>{
    getAlmacen()
  },[fetchDataAlmacenPUT])

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
            <h5>Editar Datos Del Almacen:</h5>
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
                        descripcion_almacen: datosAlmacen ? datosAlmacen.descripcion_almacen : "",
                        tipo_adquisicion: datosAlmacen ? datosAlmacen.tipo_adquisicion : "",
                        precio_adquisicion: datosAlmacen ? datosAlmacen.precio_adquisicion : "",
                        fecha_adquisicion: datosAlmacen ? datosAlmacen.fecha_adquisicion : ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={schemaFormAlmacen}
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
                        id="descripcion_almacen"
                        name="descripcion_almacen"
                        placeholder="Por favor ingrese el nombre de la maquina"
                        
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
                          <option disabled value="">Lista Tipos Productos</option>
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
                        Precio de la maquina
                      </label>
                      <Field
                        type="number"
                        className="form-control"
                        id="precio_adquisicion"
                        name="precio_adquisicion"
                        placeholder="Por favor ingrese el precio de la adquisicion de la maquina"
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

export default UpdateAlmacenModal