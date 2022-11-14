import Footer from "../../components/layouts/Footer";
import LayoutContainer from "../../components/layouts/LayoutContainer";
import "./Personal.css";
import Loading from "../../components/layouts/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { useFetch } from "../../hooks/useFetch";
import { URL } from "../../utils/getUrl";
import Alerta from "../../components/layouts/Alerta";
import { useEffect, useState } from "react";

import DetallePersonalModal from "./ModalComponts/DetallesPersonalModal";
import UpdatePersonalModal from "./ModalComponts/UpdatePersonalModal";

function Personal() {
  const [
    setConfigFetchPersonal,
    fetchDataPersonal,
    loadingPersonal,
    errorPersonal,
  ] = useFetch();

  const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
  const [optSmModalEdit, setOptSmModalEdit] = useState(false);

  const [datosPersonal, setDatosPersonal] = useState("");
  const [datosPersonalEdit, setDatosPersonalEdit] = useState("");

  const toggleShowDetalles = (item) => {
    //console.log(item)
    setDatosPersonal(item);
    setOptSmModalDetalles(!optSmModalDetalles);
  };
  const toggleShowEdit = (item) => {
    // console.log(item)
      setDatosPersonalEdit(item);
     setOptSmModalEdit(!optSmModalEdit);
     //console.log(item)
   };

  const getPersonal = () => {
    setConfigFetchPersonal({
      url: `${URL}/usuarios`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    });
  };

  useEffect(() => {
    getPersonal();
  }, []);

  const MySwal = withReactContent(Swal);

  const handleBounceIn = () => {
    return MySwal.fire({
      title: "Seguro que lo quiere eliminar?",
      text: "Se eliminara permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El archivo fue eliminado.", "success");
      }
    });
  };

  return (
    <LayoutContainer>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div style={{ textAlign: "center" }}>
            <Link to="/formulario-personal">
              <button
                className="btn btn-success"
                style={{ position: "absolute", left: "80%" }}
              >
                + Personal
              </button>
            </Link>
          </div>
          <br></br>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <div className="table-responsive">
                    <table className="table user-list">
                      <thead>
                        <tr key={"Tabla"}>
                          <th className="text-center">
                            <span>Nombre Completo</span>
                          </th>
                          <th className="text-center">
                            <span>DNI</span>
                          </th>
                          <th className="text-center">
                            <span>Telefono</span>
                          </th>
                          <th className="text-center">
                            <span>Cargo</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                      {loadingPersonal && <Loading />}

{errorPersonal?.msg && (
  <Alerta
    claseAlerta="danger"
    mensajeAlerta={errorPersonal?.msg}
  />
)}
{fetchDataPersonal.length > 0 && (
  <>
    {fetchDataPersonal?.map((item) => {
      return (
        <tr key={item.id_persona}>
          <td key={"img" + item.id_persona}>
            <img
              src="https://iconarchive.com/download/i6148/custom-icon-design/pretty-office-4/female-user-info.ico"
              alt=""
            />
            <a href="#" className="user-link">
              {item.nombre_persona}{" "}
              {item.apellido_persona}
            </a>
            <span className="user-subhead">
              Detalle
            </span>
          </td>
          <td
            className="text-center"
            key={item.dni_persona}
          >
            <span className="label label-default">
              {item.dni_persona}
            </span>
          </td>
          <td
            className="text-center"
            key={item.telefono_persona}
          >
            <span className="label label-default">
              +54 {item.telefono_persona}
            </span>
          </td>
          <td
            className="text-center"
            key={
              item.tipo_usuario.descripcion_tipo_usuario
            }
          >
            <span className="label label-default">
              {
                item.tipo_usuario
                  .descripcion_tipo_usuario
              }
            </span>
          </td>
          <td
            style={{ width: "20%" }}
            key={"btn" + item.id_persona}
          >
            <a
              href="#"
              className="table-link"
              onClick={() => {
                toggleShowDetalles(item);
              }}
            >
              <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
              </span>
            </a>
            <a href="#" className="table-link" onClick={()=>{toggleShowEdit(item)}}>
              <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x "></i>
                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
              </span>
            </a>
            <a
              href="#"
              className="table-link danger"
              onClick={handleBounceIn}
            >
              <span className="fa-stack">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </td>
        </tr>
      );
    })}
  </>
)}
                      </tbody>
                    </table>
                  </div>
                  <UpdatePersonalModal
                  optSmModalEdit={optSmModalEdit}
                  setOptSmModalEdit={setOptSmModalEdit}
                  toggleShowEdit={toggleShowEdit}
                  datosPersonal={datosPersonalEdit}
                  />
                  <DetallePersonalModal
                    optSmModalDetalles={optSmModalDetalles}
                    setOptSmModalDetalles={setOptSmModalDetalles}
                    toggleShowDetalles={toggleShowDetalles}
                    item={datosPersonal}
                    getPersonal={getPersonal}
                  />
                  <br></br>
                  <br></br>
                  <nav aria-label="Page navigation">
                    <ul className="pagination pagination-reset justify-content-center">
                      <li className="page-item disabled">
                        <a
                          className="page-link"
                          href="#"
                          tabIndex="-1"
                          aria-disabled="true"
                        >
                          <i className="zmdi zmdi-long-arrow-left"></i>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item d-none d-md-inline-block">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item d-none d-md-inline-block">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          8
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <i className="zmdi zmdi-long-arrow-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="content-backdrop fade"></div>
      </div>
    </LayoutContainer>
  );
}

export default Personal;
