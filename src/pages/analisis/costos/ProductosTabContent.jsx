import { Fragment } from "react";
import { Card } from "reactstrap";
import "./Precios.css";

const ProductosTabContent = () => {
  return (
    <Fragment>
      <Card>
        <>
        <table className="table user-list">
            <thead>
                <tr>
                    <th className="text-center" style={{ width: "33%" }}>
                    <span>Nombre Producto</span>
                    </th>
                    <th className="text-center">
                    <span>Tipo de Producto</span>
                    </th >
                    <th className="text-center">
                    <span>Cantidad</span>
                    </th>
                    <th className="text-center">
                    <span>Precio</span>
                    </th>
                </tr>
            </thead>
        <tbody>
            <tr>
                <td className="text-center" >
                <a href="#" className="user-link">
                    Fertilizante
                </a>
                </td>
                <td className="text-center">
                    <span className="user-link">
                    Nutriente
                </span>
                </td>
                <td className="text-center">
                <span className="label label-default">
                    2
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

export default ProductosTabContent;
