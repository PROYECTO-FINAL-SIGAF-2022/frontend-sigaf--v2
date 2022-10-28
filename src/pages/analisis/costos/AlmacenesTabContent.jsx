import { Fragment } from "react";
import { Card } from "reactstrap";
import "./Precios.css";

const AlmacenesTabContent = () => {
  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center" style={{ width: "30%" }}>
                    <span>Nombre Almacen</span>
                    </th>
                    <th className="text-center">
                    <span>Descripcion</span>
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
                    Almacen 1
                </a>
                </td>
                <td className="text-center">
                    <span className="user-link">
                    Deposito de Herramientas
                </span>
                </td>
                <td className="text-center">
                <span className="label label-default">
                    $15000
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

export default AlmacenesTabContent;
