import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
// import "./Index.css";

const VentasAlmacenes = () => {
  return (
    <>
      <Link to="/venta-almacenes">
        <button className="btn btn-success mb-3">+ Venta Almacen</button>
      </Link>
      <Card>
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Nombre Almacen</span>
              </th>
              <th className="text-center">
                <span>Precio de Venta</span>
              </th>
              <th className="text-center">
                <span>Fecha de Venta</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <a href="#" className="label label-default">
                  Almacen 1
                </a>
              </td>
              <td className="text-center">
                <span className="label label-default">$250.000</span>
              </td>
              <td className="text-center">
                <span className="label label-default">22/10/2022</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default VentasAlmacenes;
