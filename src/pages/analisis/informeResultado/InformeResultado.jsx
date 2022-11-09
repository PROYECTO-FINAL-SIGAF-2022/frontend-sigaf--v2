import { MDBCard } from "mdb-react-ui-kit";
import React, { Fragment } from "react";
import Select from "react-select";
import LayoutContainer from "../../../components/layouts/LayoutContainer";
import "./Index.css";

const InformeResultado = () => {
  return (
    <LayoutContainer>
        <h1 className="text-center text-dark">Informe de Resultado</h1>
        <Fragment>
      <tr>
        <th>
          <i className='bx bx-filter-alt'>Filtros:</i>
        </th>
        <th>
        <Select
          placeholder="Campaña"
        />
        </th>
        <th>
        <Select
          placeholder="Parcela"
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
                    <span>Campaña</span>
                    </th>
                    <th className="text-center">
                    <span>Parcela</span>
                    </th>
                    <th className="text-center">
                    <span>Costos Totales</span>
                    </th>
                    <th className="text-center">
                    <span>Ingresos</span>
                    </th>
                    <th className="text-center">
                    <span>Margen</span>
                    </th>
                    <th className="text-center">
                    <span>Estado</span>
                    </th>
                </tr>
            </thead>
        <tbody>
            <tr>
                <td className="text-center">
                  <a className="text-center">
                    2022
                  </a>
                </td>
                <td className="text-center" >
                  <a>
                    Algodon
                  </a>
                </td>
                <td className="text-center">
                  <a className="egresos">
                    $-25.000
                  </a>
                </td>
                <td className="text-center" >
                  <a className="ingresos">
                    $100.000
                  </a>
                </td>
                <td className="text-center">
                  <a className="text-center">
                    $75.000
                  </a>
                </td>
                <td className="text-center">
                  <a className="text-center">
                    ACTIVO
                  </a>
                </td>
            </tr>
        </tbody>
        </table>
        </>
      </MDBCard>
    </Fragment>
    </LayoutContainer>
  );
};

export default InformeResultado;
