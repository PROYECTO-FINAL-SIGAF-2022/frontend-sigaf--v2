import { useEffect } from "react";
import "./PerfilesEstablecimientos.css";
import { useNavigate } from "react-router-dom";
import Alerta from "../../components/layouts/Alerta";
import Loading from "../../components/layouts/Loading";
// import Footer from "../../components/layouts/Footer";
// import LayoutContainer from "../../components/layouts/LayoutContainer";
import { useSession, useSetSession } from "../../context/SessionProvider";
import { useFetch } from "../../hooks/useFetch";
import useGetUser from "../../hooks/useGetUser";
import { URL } from "../../utils/getUrl";

const HomePerfilesEstablecimientos = () => {
  const [setConfigFetchEstablecimientos, fetchDataEstablecimientos, loadingEstablecimientos, errorEstablecimientos] = useFetch();
  const [setConfigFetchToken, fetchDataToken, loadingToken, errorToken] = useFetch();
  //   const formikRef = useRef();
  //   const setToken = useSetSession();
  const navigate = useNavigate();

  const session = useSession();
  const setToken = useSetSession();

  const { user } = useGetUser(session);

  const getEstablecimientosUsuario = () => {
    setConfigFetchEstablecimientos({
      url: `${URL}/establecimientos-usuarios`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  const handleClickEstablecimiento = (idEstablecimiento) => {
    setConfigFetchToken({
      url: `${URL}/establecimientos-usuarios/${idEstablecimiento}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  useEffect(() => {
    getEstablecimientosUsuario();
  }, []);

  useEffect(() => {
    if (fetchDataToken.token) {
      setToken(fetchDataToken.token);
      navigate("/");
    };
  }, [fetchDataToken]);

  return (
    // <LayoutContainer>
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-lg-12 mb-4 order-0">
            <div className="card">
              <div className="d-flex align-items-end row">
                <div className="col-sm-12">
                  <div className="card-body text-center">
                    <h5 className="card-title text-primary">
                    Bienvenido {user?.username_usuario}!!! 🎉
                    </h5>
                    {loadingEstablecimientos && <Loading />}

                    {errorEstablecimientos?.msg && (
                    <Alerta claseAlerta="danger" mensajeAlerta={errorEstablecimientos?.msg} />
                    )}
                     <p className="mb-4" >
                            Por favor seleccione un <b>Establecimiento</b>.
                        </p>
                        <div className="contenidoCardEstablecimiento">
                    {
                        fetchDataEstablecimientos.length > 0 && (
                        <>
                        {
                            fetchDataEstablecimientos?.map(establecimiento => (
                                <div className="grid" key={establecimiento.id_establecimiento}>
                                    <label className="cardEstablecimiento">
                                      <input className="card__input" name="inputRadio" type="radio" onClick={() => handleClickEstablecimiento(establecimiento.id_establecimiento)}/>
                                      <div className="card__body">
                                        <div className="card__body-cover"><img className="card__body-cover-image" src="https://i.ytimg.com/vi/frs32vDWVTw/maxresdefault.jpg"/><span className="card__body-cover-checkbox">
                                            <svg className="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                                              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg></span></div>
                                        <header className="card__body-header">
                                          <h5 className="card__body-header-title">Establecimiento 1</h5>
                                          <p className="card__body-header-subtitle">Seleccionar</p>
                                        </header>
                                      </div>
                                    </label>
                                {/* <div className="card-body">
                                    <h5 className="card-title">{establecimiento.descripcion_establecimiento}</h5>
                                   <button className="btn btn-primary" onClick={() => handleClickEstablecimiento(establecimiento.id_establecimiento)}>Seleccionar</button>
                                </div> */}
                                </div>
                            ))
                        }
                        </>
                        )
                    }

                          <div className="grid" >
                                    <label className="cardEstablecimiento">
                                      <input className="card__input" name="inputRadio" type="radio" />
                                      <div className="card__body">
                                        <div className="card__body-cover"><img className="card__body-cover-image" src="https://unionclm.files.wordpress.com/2019/08/roma-maquinaria-agrc3adcola-tractores.jpg"/><span className="card__body-cover-checkbox">
                                            <svg className="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                                              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg></span></div>
                                        <header className="card__body-header">
                                          <h5 className="card__body-header-title">Establecimiento 2</h5>
                                          <p className="card__body-header-subtitle">Seleccionar</p>
                                        </header>
                                      </div>
                                    </label>
                                {/* <div className="card-body">
                                    <h5 className="card-title">{establecimiento.descripcion_establecimiento}</h5>
                                   <button className="btn btn-primary" onClick={() => handleClickEstablecimiento(establecimiento.id_establecimiento)}>Seleccionar</button>
                                </div> */}
                                </div>
                    <div className="grid" >
                            <label className="cardEstablecimiento">
                              <input className="card__input" name="inputRadio" type="radio" />
                              <div className="card__body">
                                <div className="card__body-cover">
                                  <img className="card__body-cover-image" src="https://i.ibb.co/WDwmPy5/other.png"/>
                                  <span className="card__body-cover-checkbox">
                                    <svg className="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg></span></div>
                                <header className="card__body-header">
                                  <h5 className="card__body-header-title">Crear</h5>
                                  <p className="card__body-header-subtitle">Crear Otro Establecimiento</p>
                                </header>
                              </div>
                            </label>
                    </div>
                    </div>
                    {loadingToken && <Loading />}

                    {errorToken?.msg && (
                    <Alerta claseAlerta="danger" mensajeAlerta={errorToken?.msg} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  //   </LayoutContainer>

  );
};

export default HomePerfilesEstablecimientos;
