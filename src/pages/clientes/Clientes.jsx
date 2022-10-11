import img1 from "../../assets/img/illustrations/man-with-laptop-light.png";
import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Cliente.css";
import Loading from "../../components/layouts/Loading";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import { useEffect, useState } from "react";
import { useSession, useSetSession } from "../../context/SessionProvider";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function Clientes() {
  const { setConfigFetch, fetchData, loading, error } = useFetch();
  const session = useSession();
  //console.log(session)
  useEffect(() => {
    if (session) {
      setConfigFetch({
        url: `${URL}/proveedores`,
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

  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto mb-4">
                <div className="section-title text-center ">
                  <h3 className="top-c-sep">LISTA DE CLIENTES/PROVEEDORES</h3>
                  <p>Descripcion de lo que sea Texto.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="career-search mb-60">
                  <div className="filter-result">
                    <div className="d-md-flex text-capitalize ">
                      <p className="mb-30 ff-montserrat">
                        Total De Clientes : {fetchData.length}
                      </p>
                    </div>
                    <div className="d-md-flex text-capitalize">
                      <Link to="/Formulario-proveedor" className="menu-link">
                        <button className="btn btn-infobtn  btn-outline-info">
                          Agregar Nuevo Cliente
                        </button>
                      </Link>
                    </div>
                    <br></br>
                    {!fetchData ? (
                      <Loading />
                    ) : (
                      fetchData.map((item) => {
                        return (
                          <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                            <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                              <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                {/* Modo Ejemplo */}
                                {item?.nombre_proveedor[0]}
                                {item?.nombre_proveedor[10]}
                              </div>
                              <div className="job-content">
                                <h5 className="text-md-left text-center">
                                  {item?.nombre_proveedor}
                                </h5>
                                <ul className="d-md-flex text-capitalize ff-open-sans">
                                  <li className="mr-md-4 mx-3">
                                    <i className="zmdi zmdi-pin mr-2"></i>{" "}
                                    {item?.direccion_proveedor}
                                  </li>

                                  <li className="mr-md-4">
                                    <i className="zmdi zmdi-smartphone mr-2"></i>{" "}
                                    +54
                                    {item?.telefono_proveedor}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="d-md-flex text-capitalize ff-open-sans">
                              <button className="btn  d-block w-100  btn-info mx-3">
                                Editar
                              </button>
                              <button
                                className="btn  d-block w-100 btn-danger"
                                onClick={toggleShow}
                              >
                                Eliminar
                              </button>
                            </div>
                            {/* Modal Eliminar */}

                            {/* <MDBBtn onClick={toggleShow}>Small modal</MDBBtn> */}
                            <MDBModal
                              show={optSmModal}
                              tabIndex="-1"
                              setShow={setOptSmModal}
                            >
                              <MDBModalDialog size="sm">
                                <MDBModalContent>
                                  <MDBModalHeader className="bg-danger text-white d-flex justify-content-center">
                                    <MDBModalTitle className="text-white ">
                                      ¿Quiere Eliminar El Proveedor?
                                    </MDBModalTitle>
                                    <MDBBtn
                                      className="btn-close"
                                      color="none"
                                      onClick={toggleShow}
                                    ></MDBBtn>
                                  </MDBModalHeader>
                                  <MDBModalBody className="text-danger d-flex justify-content-center">
                                  X
                                  </MDBModalBody>
                                  <MDBModalFooter>
                                    <MDBBtn
                                      className="btn btn-success"
                                      
                                      onClick={toggleShow}
                                    >
                                      Cancelar
                                    </MDBBtn>
                                    <MDBBtn color="danger">Eliminar</MDBBtn>
                                  </MDBModalFooter>
                                </MDBModalContent>
                              </MDBModalDialog>
                            </MDBModal>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-reset justify-content-center">
                    <li className="page-item disabled">
                      <a
                        className="page-link"
                        href="#"
                        tabindex="-1"
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

        <Footer />

        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default Clientes;
