/* import img1 from "../../assets/img/illustrations/man-with-laptop-light.png"; */
import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Explotaciones.css";
/* import Loading from "../../components/layouts/Loading";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import { useEffect, useState } from "react";
import { useSession, useSetSession } from "../../context/SessionProvider";
import { Link } from "react-router-dom"; */

function Explotaciones () {
  /* const { setConfigFetch, fetchData, loading, error } = useFetch();
  const session = useSession();
  //console.log(session)
  useEffect(() => {
    if (session) {
      setConfigFetch({
        url: `${URL}/explotaciones`,
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
  }

  */

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div style={{ textAlign: "center" }}>
          <h1 style={{ textAlign: "left" }} className="fw-lighter">Explotaciones</h1>
            <button
                className="btn btn-success"
                style={{ position: "absolute", left: "21%" }}
              >
                + Explotacion
              </button> 
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
                            <span>Nombre o Empresa</span>
                          </th>
                          <th className="text-center">
                            <span>DNI</span>
                          </th >
                          <th className="text-center">
                            <span>Superficie</span>
                          </th>
                          <th className="text-center">
                            <span>Campos</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td>
                            <a href="#" className="user-link">
                              Productor Pepito
                            </a>
                          </td>
                          <td className="text-left">
                              <span className="user-link">
                              42000000
                          </span>
                          </td>
                          <td className="text-center">
                            <span className="user-link">
                              50 ha
                            </span>
                          </td>
                          <td style={{ width: "20%" }}>
                            <span className="user-link">
                              <a href="#">5</a>
                              </span>
                          </td>
                          <td style={{ width: "15%" }}>
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
				  <br></br><br></br>
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

export default Explotaciones;