import React, { Fragment } from "react";
import "../../Index.css";
import { MDBBtn, MDBCard, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { Button } from "reactstrap";

const GastosMaquinas = () => {
  return (
    <Fragment>
      <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
      <div style={{ textAlign: "center" }}>
        <Link to="/formulario-gastos">
          <button
            className="btn btn-success"
            style={{ position: "relative", left: "-47%" }}
          >
            + Costo
          </button>
        </Link>
      </div>
      </div>
      </div>
      <MDBCard>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center">
                    <span>Maquina</span>
                    </th>
                    <th className="text-center">
                    <span>Observacion</span>
                    </th>
                    <th className="text-center">
                    <span>Campaña</span>
                    </th>
                    <th className="text-center">
                    <span>Parcela</span>
                    </th>
                    <th className="text-center">
                    <span>Fecha</span>
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
                          Gasto Combustible
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                          2022
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                          Algodon
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                          12/10/2022
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
        </>
      </MDBCard>
      {/* <MDBCard>
      <div className="content-wrapper">
    <div className="container-xxl flex-grow-1 container-p-y">
      <div style={{ textAlign: "center" }}>
        <Link to="/formulario-gastos">
          <button
            className="btn btn-success"
            style={{ position: "absolute", left: "25%" }}
          >
            + Costo
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
                        <span>Observacion</span>
                      </th>
                      <th className="text-center">
                        <span>Campaña</span>
                      </th>
                      <th className="text-center">
                        <span>Parcela</span>
                      </th>
                      <th className="text-center">
                        <span>Fecha</span>
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
                          Gasto Combustible
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                          2022
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                          Algodon
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="label label-default">
                          12/10/2022
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
    <div className="content-backdrop fade"></div>
  </div>
    </MDBCard> */}
    </Fragment>
  );
};

export default GastosMaquinas;
