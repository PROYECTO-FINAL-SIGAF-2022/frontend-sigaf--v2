import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Stock.css";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import { useEffect } from "react";
import Loading from "../../components/layouts/Loading";
import Alerta from "../../components/layouts/Alerta";

const StockCosechas = () => {
  const [
    setConfigFetchParcelaCultivo,
    fetchDataParcelaCultivo,
    loadingParcelaCultivo,
    errorParcelaCultivo,
  ] = useFetch();


  const [setConfigFetchCampanias, fetchDataCampanias] = useFetch();


  const getCampanias = () =>{
    setConfigFetchCampanias({
        url: `${URL}/campanias`,
        headersRequest: {
          method: "GET"
        }
      });
  }
  const getParcelaCultivo = (e) => {
    const idCampania = e.target.value;

    setConfigFetchParcelaCultivo({
      url: `${URL}/contabilidad-ingresos/${idCampania}`,
      headersRequest: {
        method: "GET",
      },
    });
  };



  useEffect(() => {
    
    getCampanias()
  }, []);

  console.log(fetchDataParcelaCultivo);
 
  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-lg-12 mb-4 order-0">
              <div className="card">
                <div className="d-flex align-items-end row">
                  <div className="">
                    <div className="card-body">
                      {loadingParcelaCultivo && <Loading />}

                      {errorParcelaCultivo?.message && (
                        <Alerta
                          claseAlerta="danger"
                          mensajeAlerta={errorParcelaCultivo?.message}
                        />
                      )}

                      <div className="contenedorCardsStock">
                        <div className="container">
                        <div className="text-center mb-60 position-relative">
                        <h5
                          className="font__family-montserrat font__weight-light text-uppercase font__size-18 text-blue brk-library-rendered"
                          data-brk-library="component__title"
                        >
                          STOCK
                        </h5>
                          
                        <hr
                          className="divider wow zoomIn brk-library-rendered"
                          data-brk-library="component__title"
                          style={{
                            visibility: "visible",
                            animationName: "zoomIn",
                          }}
                        />
                      </div>
                          <div className="row">
                              <div>
                            <label
                              htmlFor="smallSelect"
                              className="form-label d-inline"
                            >
                              Seleccionar una campaña para poder visualizar el stock
                            </label>
                            <select
                              id="smallSelect"
                              className="form-select form-select-sm d-inline"
                              defaultValue=""
                              onChange={getParcelaCultivo}
                            >
                              <option value="">Seleccionar</option>
                              {fetchDataCampanias?.map((campania) => (
                                <option
                                  key={campania.id_campania}
                                  value={campania.id_campania}
                                >
                                  {campania.descripcion_campania}
                                </option>
                              ))}
                            </select>
                                <br></br><br></br>
                            </div>
                            {fetchDataParcelaCultivo?.length > 0 && (
                              <>
                                {fetchDataParcelaCultivo?.map((item) => {
                                  
                                  return (
                                    <div className="col-12 col-sm-6 col-lg-4">
                                      <div className="cardStock">
                                        <div
                                          className="card border-success "
                                          style={{ fontWeight: "bold" }}
                                        >
                                          <div className="card-body">
                                            <h4 className="card-title">
                                              {item?.parcela?.descripcion_parcela}
                                            </h4>
                                            <h6 className="card-subtitle mb-2">
                                              La cosecha del:{" "}
                                              <strong>
                                                {item?.cultivo?.descripcion_cultivo}
                                              </strong>
                                            </h6>
                                            {item?.cantidad_total_cosechada ===
                                            null ? (
                                              <p className="card-text text-danger">
                                                Aun No se Cosecho Nada
                                              </p>
                                            ) : (
                                              <div>
                                                <p className="card-text text-success">
                                                  La cosecha total fue:{" "}
                                                  {
                                                    item?.cantidad_total_cosechada
                                                  }
                                                </p>
                                                {item?.sumaTotalCantidadVendida ? (
                                                  <p className="card-text text-success">
                                                    Actualmente se vendio:{" "}
                                                    {item?.sumaTotalCantidadVendida}
                                                  </p>
                                                ) : (
                                                  <p className="card-text text-danger">
                                                    Actualmente no se vendio
                                                    nada
                                                  </p>
                                                )}
                                                {item?.sumaTotalCantidadStock.charAt(0) === "0" ? (
                                                  <p className="card-text text-warning">
                                                    Disponible: {item?.sumaTotalCantidadStock}
                                                    {}
                                                  </p>
                                                ) : (
                                                  <p className="card-text text-success">
                                                    Disponible: {item?.sumaTotalCantidadStock}
                                                  </p>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}

                            {
                                fetchDataParcelaCultivo === undefined && (
                                    <div>
                                        <h1>No Hay Parcelas en esta compañá</h1>
                                    </div>
                                )
                            }

                            {/*  <div className="col-12 col-sm-6 col-lg-4">
                              <div className="cardStock">
                                <div
                                  className="card border-warning text-warning"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <div className="card-body">
                                    <h4 className="card-title">Vienna</h4>
                                    <h6 className="card-subtitle mb-2">
                                      Austria
                                    </h6>
                                    <p className="card-text">
                                      Apart from being regarded as the City of
                                      Music because of its musical legacy, it is
                                      also said to be "The City of Dreams".
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-4">
                              <div className="cardStock">
                                <div
                                  className="card border-danger text-danger"
                                  style={{ fontWeight: "bold" }}
                                >
                                  <div className="card-body">
                                    <h4 className="card-title">Amsterdam</h4>
                                    <h6 className="card-subtitle mb-2">
                                      Netherlands
                                    </h6>
                                    <p className="card-text">
                                      Originating as a small fishing village,
                                      Amsterdam became one of the most important
                                      ports in the world.
                                    </p>
                                  </div>
                                </div>
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
          </div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
};

export default StockCosechas;
