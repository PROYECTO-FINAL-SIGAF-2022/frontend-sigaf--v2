import React, { Fragment } from "react";
import "../../Index.css";
import { MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Select from "react-select";

const PagosPersonal = () => {
  const optFecha = [
    { label: "2021" },
    { label: "2022" },
    { label: "2022" }
  ];
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
      <tr>
        <th>
          <i className='bx bx-filter-alt'>Filtros:</i>
        </th>
        <th>
        <Select
          placeholder="Fecha"
          options={optFecha}

          />
        </th>
      </tr>
      <br></br>
      <MDBCard>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center">
                    <span>Observacion</span>
                    </th>
                    <th className="text-center">
                    <span>Tipo</span>
                    </th>
                    <th className="text-center">
                    <span>Precio</span>
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
                    Se pago al personal Agustin
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
