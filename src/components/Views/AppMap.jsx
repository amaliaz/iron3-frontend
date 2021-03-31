import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import React, { Component } from "react"
import { useState, useEffect } from "react";
import apiHandler from "./../../api/apiHandler";
// import Pin from "./../../src/pin.png";
import "./../../styles/AppMap.css";
import FormDisplayTrip from "./../Forms/FormDisplayTrip";
import FormAddTrip from "./../Forms/FormAddTrip";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
function AppMap() {
  const [trips, setTrips] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addNewTrip, setAddTrip] = useState(null);
  const [viewport, setViewport] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 14,
  });

  const getAllTrips = async () => {
    const trips = await apiHandler.getItems();
    setTrips(trips);
  };

  useEffect(() => {
    getAllTrips();
  }, []);

  const addMarkerPopUp = (event) => {
    const [longitude, latitude] = event.lngLat;
    console.log("EVEEEEEENT", event);
    // event.srcEvent.stopPropagation();
    setAddTrip({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/amaliaflz/ckmxg2uv00ny717pdnv9ehhci"
      onViewportChange={setViewport}
      onDblClick={addMarkerPopUp}
    >
      <FormDisplayTrip
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        trips={trips}
        viewport={viewport}
        setTrips={setTrips}
      />
      {
        addNewTrip ? (
          <>
          <Marker
            latitude={addNewTrip.latitude}
            longitude={addNewTrip.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addNewTrip.latitude}
            longitude={addNewTrip.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddTrip(null)}
            anchor="top" >
            <div className="popup">
              <FormAddTrip onClose={() => {
                setAddTrip(null);
                getAllTrips();
              }} location={addNewTrip} />
            </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default AppMap;
