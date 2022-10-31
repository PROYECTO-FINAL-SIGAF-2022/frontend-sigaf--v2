import { Fragment } from "react";
import { Card } from "reactstrap";
import "./Precios.css";

const MaquinasTabContent = () => {
  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center" style={{ width: "40%" }}>
                    <span>Nombre Maquina</span>
                    </th>
                    <th className="text-center">
                    <span>Precio</span>
                    </th >
                </tr>
            </thead>
        <tbody>
            <tr>
                <td className="text-center" >
                <a href="#" className="user-link">
                    Tractor
                </a>
                </td>
                <td className="text-center">
                <span className="label label-default">
                    $1500
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