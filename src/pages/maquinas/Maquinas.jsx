import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Maquinas.css";
/* import Loading from "../../components/layouts/Loading"; */

import { Link } from "react-router-dom";

function Maquinas () {
  /*  const { setConfigFetch, fetchData, loading, error } = useFetch();
  const session = useSession();
  //console.log(session)
  useEffect(() => {
    if (session) {
      setConfigFetch({
        url: `${URL}/productos`,
        headersRequest: {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      });
    }
  }, []);

  //console.log()
  if (!error) {
    return <h1>Error</h1>;
  } */

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div style={{ textAlign: "center" }}>
            <Link to="">
              <button
                className="btn btn-success"
                style={{ position: "absolute", left: "80%" }}
              >
                + Maquina
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
                            <span>Maquina</span>
                          </th>
                          <th className="text-center">
                            <span>Precio</span>
                          </th>
                          <th className="text-center">
                            <span>Fecha de la compra</span>
                          </th>
                          <th className="text-center">
                            <span>Estado</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="https://pngimages.in/uploads/png-thumb/Tractor_png_photo_editing.png"
                              alt=""
                            />
                            <a href="#" className="user-link">
                              Tractor
                            </a>
                            <span className="user-subhead">Detalle</span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">
                              100.000$
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">
                              12/10/2022
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">
                              <a href="#">ACTIVO</a>
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
                        <tr>
                          <td>
                            <img
                              src="https://pngimages.in/uploads/png-thumb/Tractor_png_photo_editing.png"
                              alt=""
                            />
                            <a href="#" className="user-link">
                              Tractor
                            </a>
                            <span className="user-subhead">Detalle</span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">90.000$</span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">
                              23/5/2010
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">
                              <a href="#" style={{ color: "red" }}>
                                MANTENIMIENTO
                              </a>
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

export default Maquinas;
