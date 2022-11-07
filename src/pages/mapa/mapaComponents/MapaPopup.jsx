import { Popup } from "react-leaflet";

const MapaPopup = ({ toggleShow, parcela, handleToggleParcela }) => {
  return (
    <Popup>
        <div>
            <h3 style={{ textAlign: "center" }}>Parcela: {parcela.descripcion_parcela}</h3>
            <h4 style={{ textAlign: "center" }}>
            Superficie: <b>{parcela.superficie} h</b>
            </h4>
            <button className="btn btn-success mx-5" onClick={() => handleToggleParcela(parcela)}>
            OPCIONES
            </button>
        </div>
    </Popup>
  );
};

export default MapaPopup;
