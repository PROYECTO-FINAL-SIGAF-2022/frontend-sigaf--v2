import React, { Fragment, useEffect } from "react";
import "../../Index.css";
import { MDBCard } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";



const PagosPersonal = () => {
  const optFecha = [
    { label: "2021" },
    { label: "2022" },
    { label: "2022" }
  ];

  const navigate = useNavigate();

  const [setConfigFetchContabilidadPersonal, fetchDataContabilidadPersonal] = useFetch();

  const getContabilidadPersonal = () => {
    setConfigFetchContabilidadPersonal({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    });
  };

  const [setConfigFetchEliminarPagoContabilidad] = useFetch();
  /*  const getContabilidadPersonal = () => {
    setConfigFetchTipoProductos({
      url: `${URL}/tipo-productos`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    })
  } */

  useEffect(() => {
    getContabilidadPersonal();
  }, []);

  const MySwal = withReactContent(Swal);
  const modalEliminar = (id) => {
    return MySwal.fire({
      title: "Seguro que lo quiere eliminar?",
      text: "Se eliminara permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(id)
        setConfigFetchEliminarPagoContabilidad({
          url: `${URL}/contabilidad-del/${id}`,
          headersRequest: {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }
        });

        navigate("/Egresos")
        
        Swal.fire(
          "Eliminado!",
          "El archivo fue eliminado.",
          "success"
        ).then((resultClose) => {
          getContabilidadPersonal()
        });
      }
    });
  };

  return (
    <Fragment>
      <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
      <div style={{ textAlign: "center" }}>
        <Link to="/formulario-pagos-personal">
          <button
            className="btn btn-success"
            style={{ position: "relative", left: "-47%" }}
          >
            + Pago
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
                    <span>Observacion</span>
                    </th>
                    <th className="text-center">
                    <span>Tipo</span>
                    </th>
                    <th className="text-center">
                    <span>Precio</span>
                    </th>
                    <th className="text-center">
                    <span>Fecha</span>
                    </th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
        <tbody>
          {fetchDataContabilidadPersonal.length > 0 ? (
          <>
          {
            fetchDataContabilidadPersonal?.map((item) => {
              const fecha = new Date(item.fecha_contabilidad);

              if(item?.observacion_contabilidad !== "-"){

                const fechaConvertida = fecha.toLocaleDateString();
                return (
                  <tr>
                    <td className="text-center">
                      <a className="text-center">
                        {item?.descripcion_contabilidad}
                      </a>
                    </td>
                    <td className="text-center" >
                      <a>
                        {item?.observacion_contabilidad}
                      </a>
                    </td>
                    <td className="text-center" >
                      <a>
                        {item?.monto_contabilidad}
                      </a>
                    </td>
                    <td className="text-center" >
                      <a>
                      {fechaConvertida}
                      </a>
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
                      <a href="#" className="table-link danger" onClick={() => { modalEliminar(item?.id_contabilidad)}}>
                        <span className="fa-stack">
                          <i className="fa fa-square fa-stack-2x"></i>
                          <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              }
            })
          }
          </>
          ) : 
          (
            <h3 className="text-danger text-center">No hay pagos cargados...</h3>
          )
          
          }
          
        </tbody>
        </table>
        </>
      </MDBCard>
    </Fragment>
  );
};

export default PagosPersonal;
