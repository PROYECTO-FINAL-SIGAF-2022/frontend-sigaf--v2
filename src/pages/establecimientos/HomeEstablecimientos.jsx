import { Field, Form, Formik } from "formik";
import { useRef, useState, useEffect } from "react";

import { MapContainer } from "react-leaflet";
import Alerta from "../../components/layouts/Alerta";
// import { Link } from "react-router-dom";
// import Loading from "../../components/layouts/Loading";
import MensajeErrorInput from "../../components/layouts/MensajeErrorInput";
import Navbar from "../../components/layouts/Navbar";
import MapaEstablecimiento from "./MapaEstablecimiento";
import * as yup from "yup";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Loading from "../../components/layouts/Loading";
import { useNavigate } from "react-router-dom";

const HomeEstablecimientos = () => {
  const [center, setCenter] = useState({
    lat: "-26.18064675300086",
    lng: "-58.188628961794805"
  });
  const [mapDraw, setMapDraw] = useState([]);
  const [errorMap, setErrorMap] = useState("");

  const mapRef = useRef();
  const formikRef = useRef();

  const [setConfigFetchEstablecimiento, fetchDataEstablecimiento, loadingEstablecimiento, errorEstablecimiento] = useFetch();

  const navigate = useNavigate();

  const schemaEstablecimiento = yup.object().shape({
    descripcion_establecimiento: yup.string().required("La descripcion del establecimiento es requerido")
  });

  const handleSubmit = (values) => {
    const {
      descripcion_establecimiento
    } = values;

    if (mapDraw.length === 0) {
      setErrorMap("Debe dibujar su campo");
      return;
    }

    setErrorMap("");

    const georeferencia = JSON.stringify(mapDraw[0].latlngs);
    setConfigFetchEstablecimiento({
      url: `${URL}/establecimientos`,
      headersRequest: {
        method: "POST",
        body: JSON.stringify({
          descripcion_establecimiento,
          georeferencia,
          superficie: mapDraw[0].area
        })
      }
    });
  };

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    // console.log(error);
  }, [errorEstablecimiento, errorMap]);

  useEffect(() => {
    formikRef.current.setSubmitting(false);
    setErrorMap("");

    if (Object.prototype.hasOwnProperty.call(fetchDataEstablecimiento, "msg")) {
      navigate("/perfiles-establecimientos");
    }
  }, [fetchDataEstablecimiento]);

  return (
    <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      {/* <Menu /> */}
      <div className="layout-page">
        <Navbar />
        <div className="container-xxl" style={{ width: "70%" }}>
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="#" className="app-brand-link gap-2">
                  <span className="app-brand-text demo text-body fw-bolder">
                  Nuevo establecimiento 🚀
                  </span>
                </a>
              </div>
              <Formik
                innerRef={formikRef}
                initialValues={{
                  descripcion_establecimiento: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={schemaEstablecimiento}
              >
                {({ isSubmitting }) => (
                  <Form id="formAuthentication" className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="descripcion_establecimiento" className="form-label">
                        Descripcion Establecimiento
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="descripcion_establecimiento"
                        name="descripcion_establecimiento"
                        placeholder="Por favor ingrese su nombre"
                        autoFocus
                      />
                    </div>
                    <MensajeErrorInput
                      name="descripcion_establecimiento"
                      className="alert alert-danger"
                    />
                    {/* <div className="mb-3">
                      <label htmlFor="georeferencia" className="form-label">
                        Apellido
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="georeferencia"
                        name="georeferencia"
                        placeholder="Por favor ingrese su apellido"
                      />
                    </div>
                    <MensajeErrorInput
                      name="georeferencia"
                      className="alert alert-danger"
                    /> */}

                    <MapContainer style={{ zIndex: 1, width: "100%" }} center={center} zoom={14} ref={mapRef}>
                      <MapaEstablecimiento
                          center={center}
                          setCenter={setCenter}
                          setMapDraw={setMapDraw}
                          setErrorMap={setErrorMap}
                      />
                    </MapContainer>
                    <button
                      type="submit"
                      disabled={isSubmitting || errorMap !== ""}
                      className="btn btn-primary d-grid w-100 mt-3"
                    >
                    {/* {
                      console.log(isSubmitting || errorMap !== "")
                    } */}
                      Registrarse!
                    </button>
                  </Form>
                )}
              </Formik>

              {
                errorMap && <Alerta
                              claseAlerta="danger"
                              mensajeAlerta={errorMap}
                            />
              }

              {loadingEstablecimiento && <Loading />}

              {errorEstablecimiento?.errors &&
                errorEstablecimiento?.errors.map((msgError, i) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>

  );
};

export default HomeEstablecimientos;
