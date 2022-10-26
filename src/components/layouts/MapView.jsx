import React, { useState, useRef } from "react";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody
} from "mdb-react-ui-kit";

import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Popup
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MapView = () => {
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  const [center, setCenter] = useState({
    lat: "-26.18064675300086",
    lng: "-58.188628961794805"
  });
  const [mapLayers, setMapLayers] = useState([]);
  const mapRef = useRef();

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id /* , latlngs: layer.getLatLngs()[0]  */ }
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map(
          (l) => l.id === _leaflet_id
          /* ? { ...l, latlngs: { ...editing.latlngs[0] } }
                : l */
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <div className="row">
      <div className="col text-center">
        <div>
          <MapContainer center={center} zoom={13} ref={mapRef}>
            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                draw={{
                  rectangle: false,
                  polyline: false,
                  circle: false,
                  circlemarker: false,
                  marker: false
                }}
              />
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

              <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
                <MDBModalDialog size="xl">
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>
                        <button
                          className="btn btn-success"
                          style={{ marginLeft: "10px" }}
                        >
                          + CULTIVO
                        </button>
                      </MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">NRO</th>
                            <th scope="col">Cultivo</th>
                            <th scope="col">Fecha De Plantacion</th>
                            <th scope="col">Accion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Algodón</td>
                            <td>13/10/2022</td>
                            <td style={{ width: "20%" }}>
                              <a href="#" className="table-link">
                                <span className="fa-stack">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                              <a href="#" className="table-link danger">
                                <span className="fa-stack">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Soja</td>
                            <td>13/10/2022</td>
                            <td style={{ width: "20%" }}>
                              <a href="#" className="table-link">
                                <span className="fa-stack">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                              <a href="#" className="table-link danger">
                                <span className="fa-stack">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Arroz</td>
                            <td>13/10/2022</td>
                            <td style={{ width: "20%" }}>
                              <a href="#" className="table-link">
                                <span className="fa-stack">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                              <a href="#" className="table-link danger">
                                <span className="fa-stack">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </MDBModalBody>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </FeatureGroup>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapView;
