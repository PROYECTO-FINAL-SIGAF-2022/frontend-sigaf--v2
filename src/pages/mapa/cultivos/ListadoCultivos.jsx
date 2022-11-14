import { useEffect, useState } from "react";
import Alerta from "../../../components/layouts/Alerta";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";
import ModalAgregarCultivo from "./ModalAgregarCultivo";
import ModalFinalizarCultivo from "./ModalFinalizarCultivo";

const ListadoCultivos = ({ parcelaSelected, campania }) => {
  const [
    setParcelasCultivos,
    fetchParcelasCultivos,
    loadingParcelasCultivos,
    errorParcelasCultivos
  ] = useFetch();
  const [
    setEliminarParcelasCultivos,
    dataEliminarParcelasCultivos,
    ,
    errorEliminarParcelasCultivos
  ] = useFetch();

  const [optSmModal, setOptSmModal] = useState(false);
  const [optSmModalCultivo, setOptSmModalCultivo] = useState(false);
  const [idParcelaCultivo, setIdParcelaCultivo] = useState("");

  const toggleShow = () => setOptSmModal(!optSmModal);
  const toggleShowCultivo = (idParcelaCultivo) => {
    // console.log(idParcelaCultivo);
    setOptSmModalCultivo(!optSmModalCultivo);
    setIdParcelaCultivo(idParcelaCultivo);
  };

  const cargarDetalleParcelaCultivo = () => {
    setParcelasCultivos({
      url: `${URL}/parcelas-cultivos-by-parcela/${campania}/${parcelaSelected.id}`,
      headersRequest: {
        method: "GET"
      }
    });
  };

  const eliminarParcela = (idParcelaCultivo) => {
    console.log(idParcelaCultivo);
    setEliminarParcelasCultivos({
      url: `${URL}/parcelas-cultivos/${idParcelaCultivo}`,
      headersRequest: {
        method: "DELETE"
      }
    });
  };

  useEffect(() => {
    cargarDetalleParcelaCultivo();
  }, [parcelaSelected, campania]);

  useEffect(() => {
    if ("message" in dataEliminarParcelasCultivos) {
      cargarDetalleParcelaCultivo();
    }
  }, [dataEliminarParcelasCultivos]);

  return (
    <>
      {loadingParcelasCultivos && <h4>Cargando Datos</h4>}

      {errorParcelasCultivos?.length > 0 && <h4>Error al cargar los datos</h4>}
      {fetchParcelasCultivos?.datosParcCultivo?.length > 0
        ? (
        <>
          <h4>Historial</h4>

          {fetchParcelasCultivos?.cultivosActivos === 0 && (
            <button className="btn btn-success" onClick={toggleShow}>
              Agregar Cultivo
            </button>
          )}
          {fetchParcelasCultivos.datosParcCultivo?.map((parcelaCultivo) => (
            <div className="card mt-2" key={parcelaCultivo.id_parcela_cultivo}>
              <div className="card-body">
                <h5 className="card-title">
                  Cultivo: {parcelaCultivo.cultivo.descripcion_cultivo}
                </h5>
                <p className="card-text">
                  <b>Fecha Inicio:</b> {parcelaCultivo.fecha_inicio}
                  <br />
                  <b>Fecha Final:</b> {parcelaCultivo.fecha_final}
                  <br />
                  <b>Cantidad Sembrada:</b> {parcelaCultivo.cantidad_sembrada}{" "}
                  {
                    parcelaCultivo.unidadMedidaTotalSembrada
                      .descripcion_unidad_medida
                  }
                  <br />
                  <b>Cantidad Cosechada:</b>{" "}
                  {parcelaCultivo.cantidad_total_cosechada}{" "}
                  {
                    parcelaCultivo.unidadMedidaTotalCosechada
                      .descripcion_unidad_medida
                  }
                  <br />
                  {parcelaCultivo.activo === 1
                    ? (
                    <span className="badge bg-success">Activo</span>
                      )
                    : (
                    <span className="badge bg-danger">Inactivo</span>
                      )}
                </p>
                {parcelaCultivo.activo === 1 && (
                  <>
                    <p className="card-text">
                      <button className="btn btn-success" onClick={() => toggleShowCultivo(parcelaCultivo.id_parcela_cultivo)}>Finalizar</button>
                    </p>

                    <p className="card-text">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          eliminarParcela(parcelaCultivo.id_parcela_cultivo)
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
            Agregar Cultivo
          </button>
          <h3>No ahy datos relacionado a esta parcela</h3>
        </>
          )}
          {
            ("message" in dataEliminarParcelasCultivos) && <h3 className="text-danger">Cultivo borrado exitosamente!</h3>
          }
      {errorEliminarParcelasCultivos?.errors &&
        errorEliminarParcelasCultivos?.errors.map((msgError, i) => (
          <Alerta claseAlerta="danger" key={i} mensajeAlerta={msgError?.msg} />
        ))}

      <ModalAgregarCultivo
        toggleShow={toggleShow}
        setOptSmModal={setOptSmModal}
        optSmModal={optSmModal}
        idParcela={parcelaSelected.id}
        idCampania={campania}
        cargarDetalleParcelaCultivo={cargarDetalleParcelaCultivo}
      />
      <ModalFinalizarCultivo
        toggleShow={toggleShowCultivo}
        setOptSmModal={setOptSmModalCultivo}
        optSmModal={optSmModalCultivo}
        // idParcela={parcelaSelected.id}
        // idCampania={campania}
        idParcelaCultivo={idParcelaCultivo}
        cargarDetalleParcelaCultivo={cargarDetalleParcelaCultivo}
      />
    </>
  );
};

export default ListadoCultivos;
