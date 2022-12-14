import { useEffect, useState } from "react";
import Alerta from "../../../components/layouts/Alerta";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";
import ModalAgregarActividad from "./ModalAgregarActividad";
// import ModalAgregarCultivo from "./ModalAgregarCultivo";

const ListadoActividades = ({ parcelaSelected, campania }) => {
  const [
    setParcelasCultivosActividades,
    fetchParcelasCultivosActividades,
    loadingParcelasCultivosActividades,
    errorParcelasCultivosActividades
  ] = useFetch();
  const [
    setEliminarParcelasCultivosActividades,
    dataEliminarParcelasCultivosActividades,
    ,
    errorEliminarParcelasCultivosActividades
  ] = useFetch();

  const [optSmModal, setOptSmModal] = useState(false);
  // const [optSmModalCultivo, setOptSmModalCultivo] = useState(false);
  // const [idParcelaCultivo, setIdParcelaCultivo] = useState("");

  const toggleShow = () => setOptSmModal(!optSmModal);
  // const toggleShowCultivo = (idParcelaCultivo) => {
  //   // console.log(idParcelaCultivo);
  //   setOptSmModalCultivo(!optSmModalCultivo);
  //   setIdParcelaCultivo(idParcelaCultivo);
  // };
console.log(fetchParcelasCultivosActividades)
  const cargarDetalleHistorialParcelaCultivo = () => {
    // console.log(parcelaSelected.id);
    setParcelasCultivosActividades({
      url: `${URL}/historiales-parcelas-cultivos/${parcelaSelected.id}`,
      headersRequest: {
        method: "GET"
      }
    });
  };

  const eliminarParcela = (idHistorialParcelaCultivo) => {
    console.log(idHistorialParcelaCultivo);
    setEliminarParcelasCultivosActividades({
      url: `${URL}/historiales/${idHistorialParcelaCultivo}`,
      headersRequest: {
        method: "DELETE"
      }
    });
  };

  useEffect(() => {
    cargarDetalleHistorialParcelaCultivo();
  }, [parcelaSelected, campania]);

  useEffect(() => {
    if ("message" in dataEliminarParcelasCultivosActividades) {
      cargarDetalleHistorialParcelaCultivo();
    }
  }, [dataEliminarParcelasCultivosActividades]);

  return (
    <>
      {loadingParcelasCultivosActividades && <h4>Cargando Datos</h4>}

      {errorParcelasCultivosActividades?.length > 0 && <h4>Error al cargar los datos</h4>}
      {fetchParcelasCultivosActividades?.length > 0
        ? (
        <>
          <h4>Actividades</h4>

          {fetchParcelasCultivosActividades && (
            <button className="btn btn-success" onClick={toggleShow}>
              Agregar Actividad
            </button>
          )}
          {fetchParcelasCultivosActividades?.map((historial) => (
            <div className="card mt-2" key={historial.id_historial_parcelas_cultivos}>
              <div className="card-body">
                <h5 className="card-title">
                  Responsable: {historial.usuario.nombre_persona} {historial.usuario.apellido_persona}
                  <br />
                  Actividad: {historial.actividade.descripcion_actividad}
                </h5>
                <p className="card-text">
                  <b>Fecha:</b> {historial.fecha_historial}
                  <br />
                  <b>Cantidad uso:</b> {historial.cantidad_uso_producto}
                  <br />
                  <b>Maquina:</b> {historial.maquina.descripcion_maquina}
                  <br />
                  <b>Producto:</b>{" "}
                  {historial.producto.descripcion_producto}
                </p>
                {historial.activo === 1 && (
                  <>
                    {/* <p className="card-text">
                      <button className="btn btn-success" onClick={() => toggleShowCultivo(historial.id_historial_parcelas_cultivos)}>Finalizar</button>
                    </p> */}

                    <p className="card-text">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          eliminarParcela(historial.id_historial_parcelas_cultivos)
                        }
                      >
                        Eliminar
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
          )
        : (
        <>
          <button className="btn btn-success mb-2" onClick={toggleShow}>
            Agregar Actividad
          </button>
          <h3>No hay ninguna actividad cargada</h3>
        </>
          )}
          {
            ("message" in dataEliminarParcelasCultivosActividades) && <h3 className="text-danger">Actividad borrado exitosamente!</h3>
          }
      {errorEliminarParcelasCultivosActividades?.errors &&
        errorEliminarParcelasCultivosActividades?.errors.map((msgError, i) => (
          <Alerta claseAlerta="danger" key={i} mensajeAlerta={msgError?.msg} />
        ))}

      <ModalAgregarActividad
        toggleShow={toggleShow}
        setOptSmModal={setOptSmModal}
        optSmModal={optSmModal}
        idParcela={parcelaSelected.id}
        // idCampania={campania}
        cargarDetalleHistorialParcelaCultivo={cargarDetalleHistorialParcelaCultivo}
      />
      {/* <ModalFinalizarCultivo
        toggleShow={toggleShowCultivo}
        setOptSmModal={setOptSmModalCultivo}
        optSmModal={optSmModalCultivo}
        // idParcela={parcelaSelected.id}
        // idCampania={campania}
        idParcelaCultivo={idParcelaCultivo}
        cargarDetalleHistorialParcelaCultivo={cargarDetalleHistorialParcelaCultivo}
      /> */}
    </>
  );
};

export default ListadoActividades;
