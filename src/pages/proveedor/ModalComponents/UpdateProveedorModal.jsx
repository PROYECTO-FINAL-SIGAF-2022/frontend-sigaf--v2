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

const UpdateProveedorModal = ({optSmModal,setOptSmModal,toggleShow,item,getProveedores}) => {
  //console.log(item);

  const [setConfigFetchProveedoresPUT,fetchDataProveedoresPUT, loadingPUT, errorPut] = useFetch();

  const formikRef = useRef();

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

    //console.log(nombre_proveedor, telefono_proveedor, direccion_proveedor)
    setConfigFetchProveedoresPUT({
      url: `${URL}/proveedores/${item.id_proveedor}`,
      headersRequest: {
        method: "PUT",
        body: JSON.stringify({
          nombre_proveedor,
          telefono_proveedor,
          direccion_proveedor
        })
      }
    }); 
  };

 useEffect(()=>{
  getProveedores()
 },[fetchDataProveedoresPUT])

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
            <MDBModalTitle>
              <h5>Editar Datos del Proveedor:</h5>
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <Formik
              enableReinitialize={true}
              innerRef={formikRef}
              initialValues={{
                nombre_proveedor: item.nombre_proveedor,
                telefono_proveedor: item?.telefono_proveedor,
                direccion_proveedor: item?.direccion_proveedor
              }}
              validationSchema={schemaFormProveedor}
              onSubmit={handleSubmit}
              
            >
              {({ isSubmitting, dirty }) => (
                <Form id="formAuthentication" className="form-group">
                  <div className="mb-3">
                    <label className="form-label">Nombre Proveedor</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="nombre_proveedor"
                      name="nombre_proveedor"
                      placeholder="Por favor ingrese un nombre para el proveedor"
                    />
                  </div>
                  <MensajeErrorInput
                    name="nombre_proveedor"
                    className="alert alert-danger"
                  />
                  <div className="mb-3">
                    <label className="form-label">Telefono del Proveedor</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="telefono_proveedor"
                      name="telefono_proveedor"
                      placeholder="Por favor ingrese el numero del proveedor"
                    />
                  </div>
                  <MensajeErrorInput
                    name="telefono_proveedor"
                    className="alert alert-danger"
                  />
                  <div className="mb-3">
                    <label className="form-label">Direccion del Proveedor</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="direccion_proveedor"
                      name="direccion_proveedor"
                      placeholder="Por favor ingrese la direccion del proveedor"
                    />
                  </div>
                  <MensajeErrorInput
                    name="direccion_proveedor"
                    className="alert alert-danger"
                  />

                  <button
                    type="submit"
                    disabled={!dirty}
                    className="btn btn-success"
                  >
                    Editar Proveedor
                  </button>
                </Form>
              )}
               
            </Formik>
            {/* {loadingPUT && <Loading />} */}

                {errorPut?.errors &&
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
  );
};

export default UpdateProveedorModal;
