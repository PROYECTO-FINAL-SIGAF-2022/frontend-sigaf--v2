import { Link } from "react-router-dom";
import { Card } from "reactstrap";
// import "../Index.css";

const VentasMaquinas = () => {
  return (
    <>
      <Link to="/venta-maquinas">
        <button className="btn btn-success mb-3">+ Venta Maquina</button>
      </Link>
      <Card>
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Nombre Maquina</span>
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
                  Tractor
                </a>
              </td>
              <td className="text-center">
                <span className="label label-default">$1500</span>
              </td>
              <td className="text-center">
                <span className="label label-default">5/11/2022</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default VentasMaquinas;
