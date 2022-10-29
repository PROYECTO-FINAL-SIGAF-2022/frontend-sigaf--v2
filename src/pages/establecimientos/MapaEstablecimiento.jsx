import React, { useEffect, useState } from "react";

import { FeatureGroup, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const MapaEstablecimiento = ({ center, setCenter, setMapDraw, setErrorMap }) => {
  const map = useMap();

  const [mapLayers, setMapLayers] = useState([]);

  function createAreaTooltip (layer) {
    if (layer.areaTooltip) {
      return;
    }

    layer.areaTooltip = L.tooltip({
      permanent: true,
      direction: "center",
      className: "area-tooltip"
    });

    layer.on("remove", function (event) {
      layer.areaTooltip.remove();
    });

    layer.on("add", function (event) {
      updateAreaTooltip(layer);
      layer.areaTooltip.addTo(map);
    });

    if (map.hasLayer(layer)) {
      updateAreaTooltip(layer);
      layer.areaTooltip.addTo(map);
    }
  }

  function updateAreaTooltip (layer) {
    const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    const readableArea = L.GeometryUtil.readableArea(area, true);
    const latlng = layer.getCenter();

    layer.areaTooltip
      .setContent(readableArea)
      .setLatLng(latlng);
  }

  map.on(L.Draw.Event.CREATED, function (event) {
    const layer = event.layer;

    if (layer instanceof L.Polygon) {
      createAreaTooltip(layer);
    }
  });

  map.on(L.Draw.Event.EDITED, function (event) {
    event.layers.getLayers().forEach(function (layer) {
      if (layer instanceof L.Polygon) {
        updateAreaTooltip(layer);
      }
    });
  });

  map.on(L.Draw.Event.EDITRESIZE, function (event) {
    const layer = event.layer;

    if (layer instanceof L.Polygon) {
      updateAreaTooltip(layer);
    }
  });

  const _onCreate = (e) => {
    const { layerType, layer } = e;

    if (layerType === "rectangle") {
      const { _leaflet_id } = layer;

      const resultArea = (L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 10000).toFixed(2);
      const arrayOfCoordinates = layer.getLatLngs()[0];
      const result = arrayOfCoordinates.map(({ lat, lng }) => (
        [lat, lng]
      ));

      setMapLayers((layers) =>
        [
          ...layers,
          { id: _leaflet_id, latlngs: result, area: resultArea }
        ]
      );
    }
  };

  const _onEdited = (e) => {
    const { layers } = e;
    const resultArea = (L.GeometryUtil.geodesicArea(e.layers.getLayers()[0].getLatLngs()[0]) / 10000).toFixed(2);
    const changedPolys = Object.values(layers._layers).map((layer) => {
      const latlngs = layer._latlngs[0].map((latlng) => {
        return [latlng.lat, latlng.lng];
      });
      return { id: layer._leaflet_id, latlngs, area: resultArea };
    });
    setMapLayers((layers) => layers.map(layer => layer.id !== changedPolys[0].id ? layer : changedPolys[0]));
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setCenter(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    //   setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  useEffect(() => {
    if (mapLayers.length > 1) {
      setErrorMap("Solo puede dibujar 1 poligono");
      return;
    }
    setErrorMap("");
    setMapDraw(mapLayers);
  }, [mapLayers]);

  return (
        <>
            <FeatureGroup>
            <EditControl
                position="topleft"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                draw={{
                  rectangle: {
                    shapeOptions: { showArea: true },
                    allowIntersection: false
                  },
                  polyline: false,
                  polygon: false,
                  circle: false,
                  circlemarker: false,
                  marker: false
                }}
                // onMounted={handleChange}
            />
          {/* <MapaPopup toggleShow={toggleShow}/> */}
            </FeatureGroup>
            <Marker position={center}>
                <Popup>Usted esta aqui</Popup>
            </Marker>
            {/* <MapaLayers/> */}
            {/* <MapaToolbar/> */}
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </>
  );
};

export default MapaEstablecimiento;
