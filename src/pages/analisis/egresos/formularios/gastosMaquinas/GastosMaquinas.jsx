import React, { Fragment } from "react";
import Select from "react-select";
import "../../Index.css";
import { MDBCard } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const GastosMaquinas = () => {
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
  const optMaquina = [
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
      <tr>
        <th>
          <i className='bx bx-filter-alt'>Filtros:</i>
        </th>
        <th>
        <Select
          placeholder="Maquina"
          options={optMaquina}
        />
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
                    <span>Maquina</span>
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
                          $2500
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

export default GastosMaquinas;
