import { Fragment } from "react";
import { Card } from "reactstrap";
import "./Precios.css";

const PersonalTabContent = () => {
  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center" style={{ width: "40%" }}>
                    <span>Nombre Completo</span>
                    </th>
                    <th className="text-center">
                    <span>DNI</span>
                    </th >
                    <th className="text-center">
                    <span>Precio</span>
                    </th>

                </tr>
            </thead>
        <tbody>
            <tr>
                <td className="text-center" >
                <a href="#" className="user-link">
                    Agustin Centurion
                </a>
                </td>
                <td className="text-center">
                    <span className="user-link">
                    42000000
                </span>
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

export default PersonalTabContent;
