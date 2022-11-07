import { Fragment } from "react";
import { Card } from "reactstrap";
import "./Index.css";

const MaquinasTabContent = () => {
  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center">
                    <span>Nombre Maquina</span>
                    </th>
                    <th className="text-center">
                    <span>Precio de Venta</span>
                    </th >
                    <th className="text-center">
                    <span>Fecha de Venta</span>
                    </th >
                </tr>
            </thead>
        <tbody>
            <tr>
                <td className="text-center" >
                <a href="#" className="label label-default">
                    Tractor
                </a>
                </td>
                <td className="text-center">
                <span className="label label-default">
                    $1500
                </span>
                </td>
                <td className="text-center">
                <span className="label label-default">
                    5/11/2022
                </span>
                </td>
            </tr>
        </tbody>
        </table>
        </>
      </Card>
    </Fragment>
  );
};

export default MaquinasTabContent;