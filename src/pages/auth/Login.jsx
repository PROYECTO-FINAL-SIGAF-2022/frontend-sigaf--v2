import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MensajeErrorInput from "../../components/layouts/MensajeErrorInput";
import Loading from "../../components/layouts/Loading";
import { useFetch } from "../../hooks/useFetch";
import { useSetSession } from "../../context/SessionProvider";
import { URL } from "../../utils/getUrl";
import Alerta from "../../components/layouts/Alerta";
import NavbarLanding from "../../components/layouts/NavbarLanding";
import './Login.css'
import logo from '../../pages/Landing/styles/img/Logo/default.png'
const Login = () => {
  const [setConfigFetch, fetchData, loading, error] = useFetch();
  const formikRef = useRef();
  const setToken = useSetSession();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { username_usuario, password_usuario } = values;
    setConfigFetch({
      url: `${URL}/login`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          username_usuario,
          password_usuario
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
  }, [error]);

  useEffect(() => {
    if (fetchData.length === 0) return;
    // console.log(fetchData.token);

    setToken(fetchData.token);
    navigate("/perfiles-establecimientos");
  }, [fetchData]);

  return (
    <div className="container">
      <NavbarLanding/>
   

<aside class="profile-card">

    <header>
 
        <a href="/">
            <img src={logo} />
        </a>

    </header>

    
    <div class="profile-bio">
 
    <Formik
                innerRef={formikRef}
                initialValues={{
                  username_usuario: "",
                  password_usuario: ""
                }}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Ingrese su nombre de usuario:
                      </label>
                      <Field
                        type="text"
                        className="form-control mb-3"
                        id="username_usuario"
                        name="username_usuario"
                        placeholder="Por favor ingrese su nombre de usuario"
                        autoFocus
                      />
                      <MensajeErrorInput
                        name="username_usuario"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">
                          Ingrese su contraseña
                        </label>
                        {/* <a href="#">
                      <small>Forgot Password?</small>
                    </a> */}
                      </div>
                      <Field
                        type="password"
                        id="password_usuario"
                        className="form-control mb-3"
                        name="password_usuario"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      />
                      <MensajeErrorInput
                        name="password_usuario"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        disabled={isSubmitting}
                        className="btn btn-success d-grid w-100"
                        type="submit"
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              {loading && <Loading />}

              {error?.msg && (
                <Alerta claseAlerta="danger" mensajeAlerta={error?.msg} />
              )}

              <p className="text-center">
                <span>No esta registrado? </span>
                <Link to="/registrarse">
                  <strong>Créese una cuenta</strong>
                </Link>
              </p>
    
    </div>

   
    
</aside>

    </div>
  );
};

export default Login;
