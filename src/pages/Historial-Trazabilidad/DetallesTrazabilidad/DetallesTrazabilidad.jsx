import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/layouts/Footer";
import LayoutContainer from "../../../components/layouts/Layoutcontainer";
import "./DetallesTrazabilidad.css";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";
import { useEffect } from "react";
import Loading from "../../../components/layouts/Loading";
import Alerta from "../../../components/layouts/Alerta";

const DetallesTrazabilidad = () => {
  const { idParcelaCultivo, parcela } = useParams();
  
  const [
    setConfigFetchHistorial,
    fetchDataHistorial,
    loadingHistorial,
    errorHistorial,
  ] = useFetch();

  const getHistorial = () => {
    setConfigFetchHistorial({
      url: `${URL}/historiales-parcelas-cultivos/${idParcelaCultivo}`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    });
  };

  useEffect(() => {
    getHistorial();
  }, []);

/*   console.log(fetchDataHistorial); */
//console.log(fetchDataHistorial)
var mostrarDiv = -1;
  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="card-body">
                    <div className="container">
                      <div className="text-center mb-60 position-relative">
                        <h5
                          className="font__family-montserrat font__weight-light text-uppercase font__size-18 text-blue brk-library-rendered"
                          data-brk-library="component__title"
                        >
                          <strong>HISTORIAL DE LA PARCELA LLAMADA: {parcela}</strong>
                        </h5>
                          <Link to="/historiales" className="btn btn-success">Volver</Link>
                        <hr
                          className="divider wow zoomIn brk-library-rendered"
                          data-brk-library="component__title"
                          style={{
                            visibility: "visible",
                            animationName: "zoomIn",
                          }}
                        />
                      </div>
                      {fetchDataHistorial === undefined && (
                            <div Align="center">
                              <h1>No se registro ninguna actividad</h1>
                            </div>
                          )}

                      <div className="timeline">
                        {loadingHistorial && <Loading />}

                        {errorHistorial?.msg && (
                          <Alerta
                            claseAlerta="danger"
                            mensajeAlerta={errorHistorial?.msg}
                          />
                        )}

                        {fetchDataHistorial?.length > 0 && (
                          <>
                            {fetchDataHistorial?.map((item) => {
                              let options = {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              };
                              const fecha = new Date(item?.fecha_historial);
                              const fechaConvertida = fecha.toLocaleDateString(
                                "es-ES",
                                options
                              );

                              /*  var descripcionCultivo;
                                                        // console.info(fetchDataProductos.length)

                                                          for (var i = 0; i < fetchDataHistorial?.length; i++) {
                                                            if(item?.id_cultivo === fetchDataHistorial[i]?.id_cultivo){
                                                              descripcionCultivo= fetchDataHistorial[i]?.descripcion_cultivo
                                                            }
                                                          } */

                              
                              mostrarDiv = mostrarDiv + 1
                              
                              console.info(mostrarDiv)
                              
                              return (
                                <>
                                  {mostrarDiv % 2 === 0 ? (
                                    <div className="containerSigaf left">
                                      <div className="date">
                                        {fechaConvertida}
                                      </div>
                                      <i className="icon fa fa-home"></i>
                                      <div className="content">
                                        <h2>
                                          La actividad:{" "}
                                          <strong>
                                            {
                                              item?.actividade
                                                ?.descripcion_actividad
                                            }
                                          </strong>
                                        </h2>
                                        <p>
                                          El personal encargado fue:{" "}
                                          <strong>
                                            {item?.usuario?.nombre_persona}{" "}
                                            {item?.usuario?.apellido_persona}
                                          </strong>
                                          , se aplico el producto:{" "}
                                          <strong>
                                            {
                                              item?.producto
                                                ?.descripcion_producto
                                            }
                                          </strong>
                                          , con la maquina:{" "}
                                          <strong>
                                            {item?.maquina?.descripcion_maquina}
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="containerSigaf right">
                                      <div className="date">{fechaConvertida}</div>
                                      <i className="icon fa fa-gift"></i>
                                      <div className="content">
                                      <h2>
                                          La actividad:{" "}
                                          <strong>
                                            {
                                              item?.actividade
                                                ?.descripcion_actividad
                                            }
                                          </strong>
                                        </h2>
                                        <p>
                                          El personal encargado fue:{" "}
                                          <strong>
                                            {item?.usuario?.nombre_persona}{" "}
                                            {item?.usuario?.apellido_persona}
                                          </strong>
                                          , se aplico el producto:{" "}
                                          <strong>
                                            {
                                              item?.producto
                                                ?.descripcion_producto
                                            }
                                          </strong>
                                          , con la maquina:{" "}
                                          <strong>
                                            {item?.maquina?.descripcion_maquina}
                                          </strong>
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </>
                              );
                              
                            }
                            
                            )}
                           
                          </>
                          
                        )}
                         
                        {/* <div className="containerSigaf right">
                          <div className="date">22 Oct</div>
                          <i className="icon fa fa-gift"></i>
                          <div className="content">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>
                              Lorem ipsum dolor sit amet elit. Aliquam odio
                              dolor, id luctus erat sagittis non. Ut blandit
                              semper pretium.
                            </p>
                          </div>
                        </div>
                        <div className="containerSigaf left">
                          <div className="date">10 Jul</div>
                          <i className="icon fa fa-user"></i>
                          <div className="content">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>
                              Lorem ipsum dolor sit amet elit. Aliquam odio
                              dolor, id luctus erat sagittis non. Ut blandit
                              semper pretium.
                            </p>
                          </div>
                        </div>
                        <div className="containerSigaf right">
                          <div className="date">18 May</div>
                          <i className="icon fa fa-running"></i>
                          <div className="content">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>
                              Lorem ipsum dolor sit amet elit. Aliquam odio
                              dolor, id luctus erat sagittis non. Ut blandit
                              semper pretium.
                            </p>
                          </div>
                        </div>
                        <div className="containerSigaf left">
                          <div className="date">10 Feb</div>
                          <i className="icon fa fa-cog"></i>
                          <div className="content">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>
                              Lorem ipsum dolor sit amet elit. Aliquam odio
                              dolor, id luctus erat sagittis non. Ut blandit
                              semper pretium.
                            </p>
                          </div>
                        </div>
                        <div className="containerSigaf right">
                          <div className="date">01 Jan</div>
                          <i className="icon fa fa-certificate"></i>
                          <div className="content">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>
                              Lorem ipsum dolor sit amet elit. Aliquam odio
                              dolor, id luctus erat sagittis non. Ut blandit
                              semper pretium.
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
};

export default DetallesTrazabilidad;
