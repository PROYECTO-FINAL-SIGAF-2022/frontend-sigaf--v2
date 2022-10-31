import { Popup } from "react-leaflet";

const MapaPopup = ({ toggleShow }) => {
  return (
    <Popup>
        <div>
            <h3 style={{ textAlign: "center" }}>NOMBRE PARCELA</h3>
            <h4 style={{ textAlign: "center" }}>
            Superficie: <b>1000h</b>
            </h4>
            <button className="btn btn-success mx-5" onClick={toggleShow}>
            CULTIVOS
            </button>
        </div>
    </Popup>
  );
};

export default MapaPopup;
