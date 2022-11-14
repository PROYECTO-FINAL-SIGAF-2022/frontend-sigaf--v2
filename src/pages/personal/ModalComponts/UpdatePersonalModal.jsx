import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle,
  } from "mdb-react-ui-kit";
  import * as yup from "yup";
  import { useEffect, useState, useRef  } from "react";
  import { Field, Form, Formik } from "formik";
  import MensajeErrorInput from "../../../components/layouts/MensajeErrorInput";
  import { useFetch } from "../../../hooks/useFetch";
  import { URL } from "../../../utils/getUrl";
  import Loading from "../../../components/layouts/Loading";
  import Alerta from "../../../components/layouts/Alerta";

const UpdatePersonalModal = ({optSmModalEdit,setoptSmModalEdit,toggleShowEdit,datosPersonal, getPersonal}) => {
    const formikRef = useRef();

    const [
        setConfigFetchPersonalPUT,
        fetchDataPersonalPUT,
        loadingPersonalPUT,
        errorPersonalPUT,
      ] = useFetch();


      const schemaEditarPersonal = yup.object().shape({
        nombre_persona: yup.string().required("Su nombre es requerido"),
        apellido_persona: yup.string().required("Su apellido es requerido"),
        dni_persona: yup
          .string()
          .required("El dni es requerido")
          .min(8, "EL dni debe tener como minimo 8 numeros")
          .max(8, "El dni debe tener como maximo 8 numeros"),
        fecha_nac_persona: yup
          .date()
          .required("La fecha de nacimiento es requerido"),
        email_persona: yup
          .string()
          .email("El correo ingresado no tiene un formato valido")
          .required("El correo electronico es requerido"),
        telefono_persona: yup
          .string()
          .required("Su nombre es requerido")
          .min(10, "El numero de telefono debe tener como minimo 10 caracteres")
          .max(10, "El numero de telefono debe tener como maximo 10 caracteres"),
        username_usuario: yup
          .string()
          .required("El nombre de usuario es requerido"),
        password_usuario: yup.string().required("La contraseña es requerido"),
      });


      const handleSubmit = (values) => {
         console.log(values);
        const {
          nombre_persona,
          apellido_persona,
          dni_persona,
          fecha_nac_persona,
          email_persona,
          telefono_persona,
          username_usuario,
          password_usuario
        } = values;
    
        setConfigFetchPersonalPUT({
          url: `${URL}/usuarios/${datosPersonal.id_persona}`,
          headersRequest: {
            method: "PUT",
            body: JSON.stringify({
              nombre_persona,
              apellido_persona,
              dni_persona,
              fecha_nac_persona,
              email_persona,
              telefono_persona,
              username_usuario,
              password_usuario
            }),
          },
        });
      };

      useEffect(()=>{
        console.log(fetchDataPersonalPUT)
      },[fetchDataPersonalPUT])
      useEffect(() => {
        formikRef.current.setSubmitting(false);
        // console.log(error);
      }, [errorPersonalPUT]);
  
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
                <h5>Editar Datos Del Personal:</h5>
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShowEdit}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <Formik
                        innerRef={formikRef}
                        enableReinitialize={true}
                        initialValues={{
                          nombre_persona: datosPersonal ? datosPersonal.nombre_persona : '',
                          apellido_persona: datosPersonal ? datosPersonal.apellido_persona : '',
                          dni_persona: datosPersonal ? datosPersonal.dni_persona : '',
                          fecha_nac_persona: datosPersonal ? datosPersonal.fecha_nac_persona : '',
                          email_persona: datosPersonal ? datosPersonal.email_persona : '',
                          telefono_persona: datosPersonal ? datosPersonal.telefono_persona : '',
                          username_usuario: datosPersonal ? datosPersonal.username_usuario : '',
                          password_usuario: '123456'
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={schemaEditarPersonal}
                      >
                        {({ isSubmitting, dirty }) => (
                          <Form id="formAuthentication" className="form-group">
                            <div className="mb-3">
                              <label className="form-label">
                                Nombre Del Personal
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                id="nombre_persona"
                                name="nombre_persona"
                                placeholder="Por favor ingrese su nombre"
                              />
                            </div>
                            <MensajeErrorInput
                              name="nombre_persona"
                              className="alert alert-danger"
                            />
                            <div className="mb-3">
                              <label
                                htmlFor="apellido_persona"
                                className="form-label"
                              >
                                Apellido
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                id="apellido_persona"
                                name="apellido_persona"
                                placeholder="Por favor ingrese su apellido"
                              />
                            </div>
                            <MensajeErrorInput
                              name="apellido_persona"
                              className="alert alert-danger"
                            />
                            <div className="mb-3">
                              <label
                                htmlFor="dni_persona"
                                className="form-label"
                              >
                                Dni
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                id="dni_persona"
                                name="dni_persona"
                                placeholder="Por favor ingrese su dni"
                              />
                            </div>
                            <MensajeErrorInput
                              name="dni_persona"
                              className="alert alert-danger"
                            />
                            <div className="mb-3">
                              <label
                                htmlFor="fecha_nac_persona"
                                className="form-label"
                              >
                                Fecha Nacimiento
                              </label>
                              <Field
                                type="date"
                                className="form-control"
                                id="fecha_nac_persona"
                                name="fecha_nac_persona"
                                placeholder="Por favor ingrese su fecha de nacimiento"
                              />
                            </div>
                            <MensajeErrorInput
                              name="fecha_nac_persona"
                              className="alert alert-danger"
                            />
                            <div className="mb-3">
                              <label
                                htmlFor="email_persona"
                                className="form-label"
                              >
                                Correo Electronico
                              </label>
                              <Field
                                type="email"
                                className="form-control"
                                id="email_persona"
                                name="email_persona"
                                placeholder="Por favor ingrese su correo electronico"
                              />
                            </div>
                            <MensajeErrorInput
                              name="email_persona"
                              className="alert alert-danger"
                            />
                            <div className="mb-3">
                              <label
                                htmlFor="telefono_persona"
                                className="form-label"
                              >
                                Telefono
                              </label>
                              <Field
                                type="number"
                                className="form-control"
                                id="telefono_persona"
                                name="telefono_persona"
                                placeholder="Por favor ingrese su numero de telefono"
                              />
                            </div>
                            <MensajeErrorInput
                              name="telefono_persona"
                              className="alert alert-danger"
                            />
                            <div className="mb-3">
                              <label
                                htmlFor="username_usuario"
                                className="form-label"
                              >
                                Nombre de usuario
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                id="username_usuario"
                                name="username_usuario"
                                placeholder="Por favor ingrese un nombre de usuario"
                              />
                            </div>
                            <MensajeErrorInput
                              name="username_usuario"
                              className="alert alert-danger"
                            />           
                            <div className="mb-3">
                              <label
                                htmlFor="password_usuario"
                                className="form-label"
                              >
                                Contraseña
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                id="password_usuario"
                                name="password_usuario"
                                placeholder="Por favor ingrese la contraseña"
                              />
                            </div>
                            <MensajeErrorInput
                              name="password_usuario"
                              className="alert alert-danger"
                            />           
                            <br></br>
                            
                            <button
                              type="submit"
                              disabled={!dirty}
                              className="btn btn-success"
                            >
                              Editar Personal
                            </button>
                          </Form>
                        )}
                      </Formik>
                  {loadingPersonalPUT && <Loading />}

                  {errorPersonalPUT?.errors &&
                    errorPersonalPUT?.errors.map((msgError, i) => (
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

export default UpdatePersonalModal