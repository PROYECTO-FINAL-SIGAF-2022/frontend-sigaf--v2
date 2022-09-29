import { Field, Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import MensajeErrorInput from '../../components/layouts/MensajeErrorInput';
import { useSetSession } from '../../context/SessionProvider';
import { useFetch } from '../../hooks/useFetch';
import { URL } from '../../utils/getUrl';
import Loading from '../../components/layouts/Loading';
import Alerta from '../../components/layouts/Alerta';

const Register = () => {
  const { setConfigFetch, fetchData, loading, error } = useFetch();
  const formikRef = useRef();
  const setToken = useSetSession();
  const navigate = useNavigate();

  const schemaRegister = yup.object().shape({
    nombre_persona: yup.string().required('Su nombre es requerido'),
    apellido_persona: yup.string().required('Su apellido es requerido'),
    dni_persona: yup
      .string()
      .required('El dni es requerido')
      .min(8, 'EL dni debe tener como minimo 8 numeros')
      .max(8, 'El dni debe tener como maximo 8 numeros'),
    fecha_nac_persona: yup
      .date()
      .required('La fecha de nacimiento es requerido'),
    email_persona: yup
      .string()
      .email('El correo ingresado no tiene un formato valido')
      .required('El correo electronico es requerido'),
    telefono_persona: yup
      .string()
      .required('Su nombre es requerido')
      .min(10, 'El numero de telefono debe tener como minimo 10 caracteres')
      .max(10, 'El numero de telefono debe tener como maximo 10 caracteres'),
    username_usuario: yup
      .string()
      .required('El nombre de usuario es requerido'),
    password_usuario: yup.string().required('La contraseña es requerido'),
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
      password_usuario,
    } = values;

    setConfigFetch({
      url: `${URL}/registrarse`,
      headersRequest: {
        method: 'POST',
        body: JSON.stringify({
          nombre_persona,
          apellido_persona,
          dni_persona,
          fecha_nac_persona,
          email_persona,
          telefono_persona,
          username_usuario,
          password_usuario,
        }),
      },
    });
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [error]);

  useEffect(() => {
    if (fetchData.length === 0) return;
    setToken(fetchData.token);
    navigate('/');
  }, [fetchData]);
  return (
    <div className="container-xxl" style={{ width: '50%' }}>
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="#" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    {/* <svg
                      width="25"
                      viewBox="0 0 25 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs>
                        <path
                          d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                          id="path-1"
                        ></path>
                        <path
                          d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                          id="path-3"
                        ></path>
                        <path
                          d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                          id="path-4"
                        ></path>
                        <path
                          d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                          id="path-5"
                        ></path>
                      </defs>
                      <g
                        id="g-app-brand"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Brand-Logo"
                          transform="translate(-27.000000, -15.000000)"
                        >
                          <g
                            id="Icon"
                            transform="translate(27.000000, 15.000000)"
                          >
                            <g
                              id="Mask"
                              transform="translate(0.000000, 8.000000)"
                            >
                              <mask id="mask-2" fill="white">
                                <use xlinkHref="#path-1"></use>
                              </mask>
                              <use fill="#696cff" xlinkHref="#path-1"></use>
                              <g id="Path-3" mask="url(#mask-2)">
                                <use fill="#696cff" xlinkHref="#path-3"></use>
                                <use
                                  fillOpacity="0.2"
                                  fill="#FFFFFF"
                                  xlinkHref="#path-3"
                                ></use>
                              </g>
                              <g id="Path-4" mask="url(#mask-2)">
                                <use fill="#696cff" xlinkHref="#path-4"></use>
                                <use
                                  fillOpacity="0.2"
                                  fill="#FFFFFF"
                                  xlinkHref="#path-4"
                                ></use>
                              </g>
                            </g>
                            <g
                              id="Triangle"
                              transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                            >
                              <use fill="#696cff" xlinkHref="#path-5"></use>
                              <use
                                fillOpacity="0.2"
                                fill="#FFFFFF"
                                xlinkHref="#path-5"
                              ></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg> */}
                  </span>
                  <span className="app-brand-text demo text-body fw-bolder">
                    SIGAF 🚀
                  </span>
                </a>
              </div>
              <Formik
                innerRef={formikRef}
                initialValues={{
                  nombre_persona: '',
                  apellido_persona: '',
                  dni_persona: '',
                  fecha_nac_persona: '',
                  email_persona: '',
                  telefono_persona: '',
                  username_usuario: '',
                  password_usuario: '',
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
                      className="btn btn-primary d-grid w-100"
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
                  <span>Inicia Sesión</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
