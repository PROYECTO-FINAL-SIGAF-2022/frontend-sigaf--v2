import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

                    {
                        fetchDataEstablecimientos.length > 0 && (
                        <>
                        <p className="mb-4" >
                            Por favor seleccione un <b>Establecimiento</b>.
                        </p>

                        {
                            fetchDataEstablecimientos?.map(establecimiento => (
                                <div className="card" style={{ width: "13rem" }} key={establecimiento.id_establecimiento}>
  {/* <img src="..." class="card-img-top" alt="..."> */}
                                <div className="card-body">
                                    <h5 className="card-title">{establecimiento.descripcion_establecimiento}</h5>
                                   <button className="btn btn-primary" onClick={() => handleClickEstablecimiento(establecimiento.id_establecimiento)}>Seleccionar</button>
                                </div>
                                </div>
                            ))
                        }
                        </>
                        )
                    }

                    <div className="card mt-3" style={{ width: "13rem" }} >
  {/* <img src="..." class="card-img-top" alt="..."> */}
                        <div className="card-body">
                            <h5 className="card-title">Crear un establecimiento</h5>
                            <NavLink
                                to="/establecimientos"
                                className="btn btn-success"
                            >
                            Crear
                        </NavLink>

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
