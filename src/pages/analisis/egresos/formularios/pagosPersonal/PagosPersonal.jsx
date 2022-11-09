import React, { Fragment } from "react";
import "../../Index.css";
import { MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const PagosPersonal = () => {
  return (
    <Fragment>
      <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
      <div style={{ textAlign: "center" }}>
        <Link to="/formulario-pagos-personal">
          <button
            className="btn btn-success"
            style={{ position: "relative", left: "-47%" }}
          >
            + Pago
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
                    <span>Nombre Personal</span>
                    </th>
                    <th className="text-center">
                    <span>Tipo</span>
                    </th>
                    <th className="text-center">
                    <span>Precio</span>
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
                <td className="text-center">
                  <a className="text-center">
                    Agustin Centurion
                  </a>
                </td>
                <td className="text-center" >
                  <a>
                    Mensual
                  </a>
                </td>
                <td className="text-center" >
                  <a>
                    $25000
                  </a>
                </td>
                <td className="text-center" >
                  <a>
                    2022
                  </a>
                </td>
                <td className="text-center">
                  <a className="text-center">
                    Parcela Algodon
                  </a>
                </td>
                <td className="text-center" >
                  <a>
                    5/11/2022
                  </a>
                </td>
                <td className="text-center">
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
    </Fragment>
  );
};

export default PagosPersonal;
