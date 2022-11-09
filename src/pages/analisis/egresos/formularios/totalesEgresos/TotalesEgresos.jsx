import React, { Fragment } from "react";
import Select from "react-select";
import "../../Index.css";
import { MDBCard } from "mdb-react-ui-kit";

const TotalesEgresos = () => {
  const optCampaña = [
    { label: "2020" },
    { label: "2021" },
    { label: "2022" }
  ];
  const optParcela = [
    { label: "Algodon" },
    { label: "Maiz" },
    { label: "Soja" }
  ];
  const optNombre = [
    { label: "Tractor" },
    { label: "Camion" },
    { label: "Cohete" }
  ];
  const optFecha = [
    { label: "22/10/2021" },
    { label: "05/06/2022" },
    { label: "11/07/2022" }
  ];
  return (
    <Fragment>
      <tr>
        <th>
          <i className='bx bx-filter-alt'>Filtros:</i>
        </th>
        <th>
        <Select
          placeholder="Campaña"
          options={optCampaña}
        />
        </th>
        <th>
        <Select
          placeholder="Parcela"
          options={optParcela}
        />
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
                    <span>Descripcion</span>
                    </th>
                    <th className="text-center">
                    <span>Observacion</span>
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
                <td>
                  <a className="text-center">
                    Se pago el sueldo del empleado Agustin
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

export default TotalesEgresos;
