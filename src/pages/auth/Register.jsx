import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import MensajeErrorInput from "../../components/layouts/MensajeErrorInput";
import { useSetSession } from "../../context/SessionProvider";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Loading from "../../components/layouts/Loading";
import Alerta from "../../components/layouts/Alerta";
import NavbarLanding from "../../components/layouts/NavbarLanding";
import NavbarLanding2 from "../../components/layouts/NavbarLanding2";
import logo from '../../pages/Landing/styles/img/Logo/logo 1.png'

const Register = () => {
  const [setConfigFetch, fetchData, loading, error] = useFetch();
  const formikRef = useRef();
  const setToken = useSetSession();
  const navigate = useNavigate();

  const schemaRegister = yup.object().shape({
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
    password_usuario: yup.string().required("La contraseña es requerido")
  });

  const handleSubmit = (values) => {
    // console.log(values);
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

    setConfigFetch({
      url: `${URL}/registrarse`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          nombre_persona,
          apellido_persona,
          dni_persona,
          fecha_nac_persona,
          email_persona,
          telefono_persona,
          username_usuario,
          password_usuario
        })
      }
    });
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [error]);

  useEffect(() => {
    if (fetchData.length === 0) return;
    setToken(fetchData.token);
    navigate("/");
  }, [fetchData]);
  return (
    <div className="container">
      <NavbarLanding2/>
      <br></br> <br></br> <br></br>
      <div className="container-xxl" style={{ width: "50%" }}>
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="#" className="app-brand-link gap-2">
                  <span className="app-brand-text demo text-body fw-bolder">
                    REGISTRO
                  </span>
                </a>
              </div>
              <Formik
                innerRef={formikRef}
                initialValues={{
                  nombre_persona: "",
                  apellido_persona: "",
                  dni_persona: "",
                  fecha_nac_persona: "",
                  email_persona: "",
                  telefono_persona: "",
                  username_usuario: "",
                  password_usuario: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={schemaRegister}
              >
                {({ isSubmitting }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="nombre_persona" className="form-label">
                        Nombre
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="nombre_persona"
                        name="nombre_persona"
                        placeholder="Por favor ingrese su nombre"
                        autoFocus
                      />
                    </div>
                    <MensajeErrorInput
                      name="nombre_persona"
                      className="alert alert-danger"
                    />
                    <div className="mb-3">
                      <label htmlFor="apellido_persona" className="form-label">
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
                      <label htmlFor="dni_persona" className="form-label">
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
                      <label htmlFor="fecha_nac_persona" className="form-label">
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
                      <label htmlFor="email_persona" className="form-label">
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
                      <label htmlFor="telefono_persona" className="form-label">
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
                      <label htmlFor="username_usuario" className="form-label">
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
                    <div className="mb-3 form-password-toggle">
                      <label className="form-label" htmlFor="password_usuario">
                        Password
                      </label>
                      <div className="input-group input-group-merge">
                        <Field
                          type="password"
                          id="password_usuario"
                          className="form-control"
                          name="password_usuario"
                          placeholder="Por favor ingrese una contraseña para su usuario"
                          aria-describedby="password_usuario"
                        />
                      </div>
                    </div>
                    <MensajeErrorInput
                      name="password_usuario"
                      className="alert alert-danger"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-success d-grid w-100"
                    >
                      Registrarse!
                    </button>
                  </Form>
                )}
              </Formik>

              {loading && <Loading />}

              {error?.errors &&
                error?.errors.map((msgError, i) => (
                  <Alerta
                    claseAlerta="danger"
                    key={i}
                    mensajeAlerta={msgError?.msg}
                  />
                ))}
              <p className="text-center">
                <span>Ya tienes una cuenta?</span>
                <Link to="/auth">
                  <span> Inicia Sesión</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
