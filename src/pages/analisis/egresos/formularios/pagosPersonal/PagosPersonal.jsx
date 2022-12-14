import React, { Fragment, useEffect } from "react";
import "../../index2.css";
import { MDBCard } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { formateador } from "../../../../../helpers/formateadorNumero";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useFetch } from "../../../../../hooks/useFetch";
import { URL } from "../../../../../utils/getUrl";

const PagosPersonal = () => {
  const optFecha = [{ label: "2021" }, { label: "2022" }, { label: "2022" }];

  const navigate = useNavigate();

  const [setConfigFetchContabilidadPersonal, fetchDataContabilidadPersonal] =
    useFetch();

  const getContabilidadPersonal = () => {
    setConfigFetchContabilidadPersonal({
      url: `${URL}/contabilidad`,
      headersRequest: {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
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
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(id)
        setConfigFetchEliminarPagoContabilidad({
          url: `${URL}/contabilidad-del/${id}`,
          headersRequest: {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          },
        });

        navigate("/Egresos");

        Swal.fire("Eliminado!", "El archivo fue eliminado.", "success").then(
          (resultClose) => {
            getContabilidadPersonal();
          }
        );
      }
    });
  };

  return (
    <Fragment>
      <div class="wrapper">
      <div>
        <Link to="/formulario-pagos-personal">
          <button
            className="btn btn-success"
          >
            + Pago
          </button>
        </Link>
      </div>
      <hr></hr>
        <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis">
            <div class="cellAnalisis">Observacion</div>
            <div class="cellAnalisis">Tipo</div>
            <div class="cellAnalisis">Precio</div>
            <div class="cellAnalisis">Fecha</div>
            <div class="cellAnalisis">Eliminar</div>
          </div>

          {fetchDataContabilidadPersonal?.length > 0 ? (
          <>
          {
            fetchDataContabilidadPersonal?.map((item) => {
              const fecha = new Date(item?.fecha_contabilidad);

              if(item?.observacion_contabilidad !== "-"){

                const fechaConvertida = fecha.toLocaleDateString();
                return (
                  <div class="rowAnalisis">
                  <div class="cellAnalisis" data-title="Name">
                  {item?.descripcion_contabilidad}
                  </div>
                  <div class="cellAnalisis" data-title="Age">
                  {item?.observacion_contabilidad}
                  </div>
                  <div class="cellAnalisis" data-title="Occupation">
                  <strong style={{color:'red'}}>{formateador(item?.monto_contabilidad)}</strong>
                  </div>
                  <div class="cellAnalisis" data-title="Location">
                  {fechaConvertida}
                  </div>
                  <div class="cellAnalisis" data-title="actions">
                  
                      <a href="#" className="table-link danger" onClick={() => { modalEliminar(item?.id_contabilidad)}}>
                        <span className="fa-stack" style={{color:'red'}}>
                          <i className="fa fa-square fa-stack-2x"></i>
                          <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                  </div>
                </div>
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

          

         
        </div>

        {/* <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis green">
            <div class="cellAnalisis">Product</div>
            <div class="cellAnalisis">Unit Price</div>
            <div class="cellAnalisis">Quantity</div>
            <div class="cellAnalisis">Date Sold</div>
            <div class="cellAnalisis">Status</div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Product">
              Solid oak work table
            </div>
            <div class="cellAnalisis" data-title="Unit Price">
              $800
            </div>
            <div class="cellAnalisis" data-title="Quantity">
              10
            </div>
            <div class="cellAnalisis" data-title="Date Sold">
              03/15/2014
            </div>
            <div class="cellAnalisis" data-title="Status">
              Waiting for Pickup
            </div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Product">
              Leather iPhone wallet
            </div>
            <div class="cellAnalisis" data-title="Unit Price">
              $45
            </div>
            <div class="cellAnalisis" data-title="Quantity">
              120
            </div>
            <div class="cellAnalisis" data-title="Date Sold">
              02/28/2014
            </div>
            <div class="cellAnalisis" data-title="Status">
              In Transit
            </div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Product">
              27" Apple Thunderbolt displays
            </div>
            <div class="cellAnalisis" data-title="Unit Price">
              $1000
            </div>
            <div class="cellAnalisis" data-title="Quantity">
              25
            </div>
            <div class="cellAnalisis" data-title="Date Sold">
              02/10/2014
            </div>
            <div class="cellAnalisis" data-title="Status">
              Delivered
            </div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Product">
              Bose studio headphones
            </div>
            <div class="cellAnalisis" data-title="Unit Price">
              $60
            </div>
            <div class="cellAnalisis" data-title="Quantity">
              90
            </div>
            <div class="cellAnalisis" data-title="Date Sold">
              01/14/2014
            </div>
            <div class="cellAnalisis" data-title="Status">
              Delivered
            </div>
          </div>
        </div>

        <div class="tableAnalisis">
          <div class="rowAnalisis headerAnalisis blue">
            <div class="cellAnalisis">Username</div>
            <div class="cellAnalisis">Email</div>
            <div class="cellAnalisis">Password</div>
            <div class="cellAnalisis">Active</div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Username">
              ninjalug
            </div>
            <div class="cellAnalisis" data-title="Email">
              misterninja@hotmail.com
            </div>
            <div class="cellAnalisis" data-title="Password">
              ************
            </div>
            <div class="cellAnalisis" data-title="Active">
              Yes
            </div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Username">
              jsmith41
            </div>
            <div class="cellAnalisis" data-title="Email">
              joseph.smith@gmail.com
            </div>
            <div class="cellAnalisis" data-title="Password">
              ************
            </div>
            <div class="cellAnalisis" data-title="Active">
              No
            </div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Username">
              1337hax0r15
            </div>
            <div class="cellAnalisis" data-title="Email">
              hackerdude1000@aol.com
            </div>
            <div class="cellAnalisis" data-title="Password">
              ************
            </div>
            <div class="cellAnalisis" data-title="Active">
              Yes
            </div>
          </div>

          <div class="rowAnalisis">
            <div class="cellAnalisis" data-title="Username">
              hairyharry19
            </div>
            <div class="cellAnalisis" data-title="Email">
              harryharry@gmail.com
            </div>
            <div class="cellAnalisis" data-title="Password">
              ************
            </div>
            <div class="cellAnalisis" data-title="Active">
              Yes
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};

export default PagosPersonal;
