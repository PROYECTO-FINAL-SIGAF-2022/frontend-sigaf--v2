import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { useFetch } from "../../../../hooks/useFetch";

const VentasCosechas = () => {
  return (
    <>
      <Link to="/venta-cosecha">
        <button className="btn btn-success mb-3">+ Venta Cosecha</button>
      </Link>
      <Card>
        <table className="table user-list">
          <thead>
            <tr>
              <th className="text-center">
                <span>Parcela</span>
              </th>
              <th className="text-center">
                <span>Cantidad Vendida</span>
              </th>
              <th className="text-center">
                <span>Precio</span>
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
                  Algodon
                </a>
              </td>
              <td className="text-center">
                <span className="label label-default">1000 kg</span>
              </td>
              <td className="text-center">
                <span className="label label-default">$150.000</span>
              </td>
              <td className="text-center">
                <span className="label label-default">3/11/2022</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default VentasCosechas;
