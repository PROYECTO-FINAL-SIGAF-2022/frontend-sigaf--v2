import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Productos.css";
import Alerta from "../../components/layouts/Alerta";
import Loading from "../../components/layouts/Loading";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import { Link } from "react-router-dom";
import { useEffect  } from "react";

function Productos() {
  const [
    setConfigFetchProductos,
    fetchDataProductos,
    loadingProductos,
    errorProductos,
  ] = useFetch();

  const getProductos = () => {
    setConfigFetchProductos({
      url: `${URL}/productos`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    });
  };

  useEffect(() => {
    getProductos();
  }, []);

  //console.log(fetchDataProductos)
  if (!errorProductos) {
    return <h1>Error</h1>;
  }

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div style={{ textAlign: "center" }}>
            {/* Es el stilo de la posicion es temporal, luego lo hago bien para que se ajuste a cualquier tamaño */}
          <button className="btn btn-success" style={{ position: "absolute", left: "68%" }} onClick={getProductos}>ACTUALIZAR</button>
            <Link to="/Formulario-productos">
              <button
                className="btn btn-success"
                style={{ position: "absolute", left: "80%" }}
              >
                + PRODUCTO
              </button>
            </Link>
          </div>
          <br></br>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <div className="table-responsive">
                    <table className="table user-list">
                      <thead>
                        <tr>
                          <th className="text-center">
                            <span>Producto</span>
                          </th>
                          <th className="text-center">
                            <span>Vencimiento</span>
                          </th>
                          <th className="text-center">
                            <span>Cantidad</span>
                          </th>
                          <th className="text-center">
                            <span>Tipo De Producto</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingProductos && <Loading />}

                        {errorProductos?.msg && (
                          <Alerta
                            claseAlerta="danger"
                            mensajeAlerta={errorProductos?.msg}
                          />
                        )}

                        {fetchDataProductos.length > 0 && (
                          <>
                            {
                              
                              //key={proveedor.id_proveedor}
                              fetchDataProductos?.map((item) => {
                                const fecha = new Date(item.fecha_vencimiento_producto);
                                const fechaConvertida = fecha.toLocaleDateString();
                                return( 
                                <tr>
                                  <td>
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/2713/2713463.png"
                                      alt=""
                                    />
                                    <a href="#" className="user-link">
                                      {item?.descripcion_producto}
                                    </a>
                                    <span className="user-subhead">
                                      Detalle
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="label label-default">
                                      {fechaConvertida}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="label label-default">
                                      {item?.cantidad_producto}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="label label-default">
                                      <a href="#">{item?.id_tipo_producto}</a>
                                    </span>
                                  </td>
                                  <td style={{ width: "20%" }}>
                                    <a href="#" className="table-link">
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x"></i>
                                        <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                    <a href="#" className="table-link">
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x "></i>
                                        <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                    <a href="#" className="table-link danger">
                                      <span className="fa-stack">
                                        <i className="fa fa-square fa-stack-2x"></i>
                                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                      </span>
                                    </a>
                                  </td>
                                </tr>
                              )})
                            }
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <br></br>
                  <br></br>
                  <nav aria-label="Page navigation">
                    <ul className="pagination pagination-reset justify-content-center">
                      <li className="page-item disabled">
                        <a
                          className="page-link"
                          href="#"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          <i className="zmdi zmdi-long-arrow-left"></i>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item d-none d-md-inline-block">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item d-none d-md-inline-block">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          8
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <i className="zmdi zmdi-long-arrow-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
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
}

export default Productos;
