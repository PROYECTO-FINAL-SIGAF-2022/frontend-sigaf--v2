/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Rectangle
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapaPopup from "./MapaPopup";
// import MapaModal from "./MapaModal";
// import MapaLayers from "./mapaComponents/MapaLayers";
import MapaToolbar from "./MapaToolbar";
import ModalDatosParcela from "../mapaLayouts/ModalDatosParcela";
import { useFetch } from "../../../hooks/useFetch";
import { URL } from "../../../utils/getUrl";
import { useSession } from "../../../context/SessionProvider";
import pointInPolygon from "point-in-polygon";

import {AlertaModal} from "../../../components/layouts/AlertaModal";

const IndexMap = () => {
  const [setConfigFetchEstablecimiento, fetchDataEstablecimiento, loadingEstablecimiento] = useFetch();

  const [setConfigFetchParcelas, fetchDataParcelas] = useFetch([]);
  const [setFetchCampanias, fetchDataCampanias] = useFetch([]);
  const [optSmModal, setOptSmModal] = useState(false);
  const [establecimiento, setEstablecimiento] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [editandoParcelas, setEditandoParcelas] = useState(false);
  const [parcelaSelected, setParcelaSelected] = useState({});
  const [campania, setCampania] = useState("");
  const [errorMapa, setErrorMapa] = useState("");

  const mapRef = useRef();
  const parcelasRef = useRef([]);
  const mapaEstablecimientoGeoreferenciaRef = useRef();

  const session = useSession();

  const toggleShow = () => setOptSmModal(!optSmModal);

  const _onCreate = async (e) => {
    setErrorMapa("");
    const { layerType, layer } = e;

    if (layerType === "rectangle") {
      // console.log(layer);
      const { _leaflet_id } = layer;

      const arrayOfCoordinates = layer.getLatLngs()[0];
      const resultGeoreferencia = arrayOfCoordinates.map(({ lat, lng }) => (
        [lat, lng]
      ));

      const superficieResult = (L.GeometryUtil.geodesicArea(arrayOfCoordinates) / 10000).toFixed(2);
      // console.log(result);

      const resultValidacion = validarPoligonoInEstablecimiento(resultGeoreferencia, "crear");
      if (resultValidacion) {
        // console.log();
        setErrorMapa("No puede crear una parcela fuera del establecimiento o dentro de otra ya creada");
        mapRef.current.removeLayer(e.layer);
        return;
      }
      setEditandoParcelas(true);

      // console.log(resultGeoreferencia);

      // console.log();
      const response = await fetch(`${URL}/parcelas`, {
        method: "POST",
        body: JSON.stringify({
          georeferencia: JSON.stringify(resultGeoreferencia),
          superficie: superficieResult
        }),
        headers: {
          Authorization: session,
          "Content-type": "application/json; charset=UTF-8"
        }
      });

      const resultFetch = await response.json();

      if (!response.ok) {
        alert("Error al crear la parcela");
      }
      loadParcelas();
      setEditandoParcelas(false);
      mapRef.current.removeLayer(e.layer);
      handleToggleParcela({ georeferencia: resultGeoreferencia, superficie: superficieResult });
    }
  };

  const _onEdited = (e) => {
    setErrorMapa("");

    const {
      layers: { _layers }
    } = e;

    const parcelasEditadas = Object.values(_layers);

    // validar geolocalizaciones de edicion de parcelas
    for (let i = 0; i < parcelasEditadas.length; i++) {
      const { _leaflet_id, _latlngs } = parcelasEditadas[i];
      const arrayOfCoordinates = _latlngs[0];

      // convertir array de coordenadas
      const resultGeoreferencia = arrayOfCoordinates.map(({ lat, lng }) => (
        [lat, lng]
      ));
      const parcelaEditada = parcelasRef.current.filter(parcela => parcela._leaflet_id === _leaflet_id)[0];
      // obtener parcelas no editadas
      const parcelasNoEditadas = parcelasRef.current.filter(parcela => parcela.id !== parcelaEditada.id);

      const resultValidacion = validarPoligonoInEstablecimiento(resultGeoreferencia, "editar", parcelasNoEditadas);

      // console.log(resultValidacion);
      if (resultValidacion) {
        // parcelasRef.current = parcelas;
        // setParcelas(parcelasRef.current);
        setErrorMapa("No puede editar una parcela por fuera del establecimiento o por encima de otra");
        // valido = false;
        // mapRef.current.removeLayer(e.layer);
        loadParcelas();
        return;
      }
    }

    const parcelasEditadasParaGuardar = [];

    Object.values(_layers).forEach(({ _leaflet_id, _latlngs }) => {
      // calcular area
      setEditandoParcelas(true);
      const arrayOfCoordinates = _latlngs[0];
      const resultArea = (L.GeometryUtil.geodesicArea(arrayOfCoordinates) / 10000).toFixed(2);

      // convertir array de coordenadas
      const resultGeoreferencia = arrayOfCoordinates.map(({ lat, lng }) => (
        [lat, lng]
      ));
      // console.log(resultGeoreferencia);
      // obtener parcela editada
      const parcelaEditada = parcelasRef.current.filter(parcela => parcela._leaflet_id === _leaflet_id)[0];

      // obtener parcelas no editadas
      const parcelasNoEditadas = parcelasRef.current.filter(parcela => parcela.id !== parcelaEditada.id);

      // editar parcela
      parcelaEditada.superficie = resultArea;
      parcelaEditada.georeferencia = resultGeoreferencia;

      // console.log(parcelaEditada);
      parcelasNoEditadas.push(parcelaEditada);
      parcelasRef.current = parcelasNoEditadas;
      setParcelas(parcelasNoEditadas);

      const promisesParcela = fetch(`${URL}/parcelas/${parcelaEditada.id}`, {
        method: "PUT",
        body: JSON.stringify({
          georeferencia: JSON.stringify(parcelaEditada.georeferencia),
          superficie: parcelaEditada.superficie,
          descripcion_parcela: parcelaEditada.descripcion_parcela
        }),
        headers: {
          Authorization: session,
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      parcelasEditadasParaGuardar.push(promisesParcela);
    });
    // console.log(parcelasEditadasParaGuardar);
    Promise.allSettled(parcelasEditadasParaGuardar)
      .then(function handleData (data) {
        setEditandoParcelas(false);
        loadParcelas();
      })
      .catch(function handleError (error) {
        console.log("Error" + error);
        alert("error al guardar las modificaciones de las parcelas");
      });
  };

  const _onDeleted = (e) => {
    const {
      layers: { _layers }
    } = e;

    const parcelasEliminadasParaGuardar = [];

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      const parcelaEliminada = parcelasRef.current.filter(parcela => parcela._leaflet_id === _leaflet_id)[0];

      if (!parcelaEliminada) return;
      const updateParcelaRef = parcelasRef.current.filter(parcela => parcela.id !== parcelaEliminada?.id);

      parcelasRef.current = updateParcelaRef;
      const promisesParcela = fetch(`${URL}/parcelas/${parcelaEliminada?.id}`, {
        method: "DELETE",
        headers: {
          Authorization: session,
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      parcelasEliminadasParaGuardar.push(promisesParcela);
    });

    Promise.allSettled(parcelasEliminadasParaGuardar)
      .then(function handleData (data) {
        setEditandoParcelas(false);
        loadParcelas();
      })
      .catch(function handleError (error) {
        console.log("Error" + error);
        alert("error al guardar las modificaciones de las parcelas");
      });
  };

  // const onClick = (e) => {
  //   console.log(e);
  // };

  const validarPoligonoInEstablecimiento = (georeferencia, opcion, parcelasNoEditadas = []) => {
    // validar que este en el establecimiento
    for (let i = 0; i < georeferencia.length; i++) {
      const puntoPoligono = georeferencia[i];
      if (!pointInPolygon(puntoPoligono, mapaEstablecimientoGeoreferenciaRef.current)) {
        return "Por favor cree la parcela dentro del establecimiento";
      }
    }

    if (opcion === "crear") {
      for (let z = 0; z < georeferencia.length; z++) {
        const puntoPoligono = georeferencia[z];

        for (let j = 0; j < parcelasRef.current.length; j++) {
          const parcela = parcelasRef.current[j];
          if (pointInPolygon(puntoPoligono, parcela.georeferencia)) {
            return "No puede crear una parcela encima de otra, por favor intente nuevamente";
          }
        }
      }
    } else {
      // console.log(georeferencia);
      // console.log(`230 ${georeferencia}`);
      for (let z = 0; z < georeferencia.length; z++) {
        const puntoPoligono = georeferencia[z];
        // console.log(`233 ${puntoPoligono}`);

        for (let j = 0; j < parcelasNoEditadas.length; j++) {
          const parcela = parcelasNoEditadas[j];

          if (pointInPolygon(puntoPoligono, parcela.georeferencia)) {
            return "No puede crear una parcela encima de otra, por favor intente nuevamente";
          }
        }
      }
    }

    // validar que no este por encima de otros poligonos
  };
  // ** cargar establacimientos y parcelas al estado
  const addEstablecimientoToMap = () => {
    if (!mapRef.current) return;
    // georeferenciaRef.current?.remove();
    const map = mapRef.current;
    const georeferencia = JSON.parse(fetchDataEstablecimiento.georeferencia);
    map.panTo(L.latLngBounds(georeferencia).getCenter());
    addParcelasToMap();
  };

  const addParcelasToMap = () => {
    // parcelasRef.current = [];

    if (!mapRef.current) return;
    if (fetchDataParcelas.length === 0) return;
    // console.log(fetchDataParcelas);
    const parcelas = fetchDataParcelas?.map((parcela) => {
      const georeferencia = JSON.parse(parcela.georeferencia);

      return { id: parcela.id_parcela, georeferencia, superficie: parcela.superficie, descripcion_parcela: parcela.descripcion_parcela };
    });
    // console.log(parcelas);
    setParcelas(parcelas);
  };

  const addParcelaToRef = (parcela, e) => {
    // console.log(e.target._leaflet_id);
    const parcelasMapa = parcelasRef.current;
    // console.log(parcela);

    if (parcelasMapa.includes(parcela)) return;
    parcela._leaflet_id = e.target._leaflet_id;

    const parcelaAdds = [...parcelasMapa, parcela];

    parcelasRef.current = parcelaAdds;
  };

  const loadParcelas = () => {
    setConfigFetchParcelas({
      url: `${URL}/parcelas`,
      headersRequest: {
        method: "GET"
      }
    });
  };
  //console.log(fetchDataParcelas)
  const handleToggleParcela = (parcelaSelected) => {
    // console.log(parcelaSelected);
    setParcelaSelected(parcelaSelected);
    setOptSmModal(true);
  };

  const updateRef = (parcelas) => {
    parcelasRef.current = parcelas;
  };

  // mapRef.current?.on(L.Draw.Event.DRAWSTOP, function (e) {
  //   const layer = e.layer;
  //   console.log("first");
  // });
  // mapRef.current?.on("dragend", function (e) {
  //   console.log("dragend");
  // });

  // mapRef.current?.on("mousemove", function (e) {
  // console.log("mousemove");
  // console.log(e.latlng.lat);
  // console.log(e.latlng.lng);
  // });

  // mapRef.current?.on("mouseup", function (e) {
  //   console.log("mouseup");
  // });

  // mapRef.current?.on("mouseover", function (e) {
  //   console.log("mouseover");
  // });

  // mapRef.current?.on("mouseout", function (e) {
  //   const layer = e.layer;
  //   console.log(e);
  //   console.log("mouseout");
  // });
  // console.log(parcelas);
  useEffect(() => {
    setFetchCampanias({
      url: `${URL}/campanias`,
      headersRequest: {
        method: "GET"
      }
    });

    return () => {
      setConfigFetchEstablecimiento(null);
      setConfigFetchParcelas(null);
      setEstablecimiento([]);
      setParcelas([]);
    };
  }, []);

  useEffect(() => {
    setConfigFetchEstablecimiento({
      url: `${URL}/establecimiento-usuario`,
      headersRequest: {
        method: "GET"
      }
    });

    const campaniaActiva = fetchDataCampanias.filter(campania => campania.activo === 1)[0];
    // console.log(campaniaActiva);
    if (campaniaActiva) {
      setCampania(campaniaActiva.id_campania);
    }
    loadParcelas();
  }, [fetchDataCampanias]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!fetchDataEstablecimiento) return;

    addEstablecimientoToMap();
    setEstablecimiento(fetchDataEstablecimiento);
    mapRef.current?.getCenter();
    // console.log(fetchDataEstablecimiento);
    if ("georeferencia" in establecimiento) {
      mapaEstablecimientoGeoreferenciaRef.current = JSON.parse(fetchDataEstablecimiento.georeferencia);
    }
  }, [fetchDataEstablecimiento]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!fetchDataParcelas) return;
    addParcelasToMap();
  }, [fetchDataParcelas]);

  return (
    <>
    {
      editandoParcelas && <h5 className="text-center text-warning">Actualizando Georeferencias de Parcelas</h5>
    }
    {
      loadingEstablecimiento && AlertaModal(
        {
          tituloModal: 'Cargando Georefencias',
          tipoModal: 'info',
          colorModal: '#3fc3ee'
        }
      )
    }
      <MapContainer style={{ zIndex: 1, width: "100%" }} center={{
        lat: "-26.18064675300086",
        lng: "-58.188628961794805"
      }} zoom={14} ref={mapRef}>
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
          />

          <MapaToolbar campania={campania} fetchDataCampanias={fetchDataCampanias} setCampania={setCampania}/>

          {
            parcelas.length > 0 && parcelas.map(parcela => (
              <Rectangle key={parcela.id} color="#1f6764" weight={"1"} bounds={parcela.georeferencia} interactive={true} eventHandlers={{
                // click: () => onClick(parcela.id),
                add: (e) => addParcelaToRef(parcela, e)
                // baselayerchange: () => onClick("baselayerchange"),
                // autopanstart: () => onClick("autopanstart"),
                // down: () => onClick("down"),
                // contextmenu: () => onClick("contextmenu"),
                // drag: () => onClick("drag"),
                // dragend: () => onClick("dragend"),
                // dragstart: () => onClick("dragstart"),
                // keydown: () => onClick("keydown"),
                // keypress: () => onClick("keypress"),
                // keyup: () => onClick("keyup"),
                // mousedown: () => onClick("mousedown"),
                // mousemove: () => onClick("mousemove")
                // mouseout: () => onClick("mouseout"),
                // mouseover: () => onClick("mouseover"),
                // mouseup: () => onClick("mouseup"),
                // move: () => onClick("move"),
                // moveend: () => onClick("moveend"),
                // movestart: () => onClick("movestart"),
                // preclick: () => onClick("preclick"),
                // predrag: () => onClick("predrag"),
                // resize: () => onClick("resize"),
                // update: () => onClick("update"),
                // unload: () => onClick(1)

              }}>
                <MapaPopup toggleShow={toggleShow} parcela={parcela} handleToggleParcela={handleToggleParcela}/>
                
              </Rectangle>
            ))
          }
        </FeatureGroup>
        {
          ("georeferencia" in establecimiento) && (
          <Polygon color="#00b34c" fillOpacity={"0.2"} weight={"1"}  positions={JSON.parse(establecimiento.georeferencia)} interactive={false} />
          )
       }

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {/* <MapaLayers/> */}
      </MapContainer>

      {
        ("id" in parcelaSelected) && <ModalDatosParcela
          optSmModal ={optSmModal}
          setOptSmModal ={setOptSmModal}
          toggleShow ={toggleShow}
          parcelaSelected={parcelaSelected}
          loadParcelas = {loadParcelas}
          updateRef = {updateRef}
          parcelasRef = {parcelasRef.current}
          campania={campania}
      />
      }

      </>
  );
};

export default IndexMap;
