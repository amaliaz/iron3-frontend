import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import apiHandler from "./../api/apiHandler";
import Pin from "./../../src/pin.png";
function AppMap() {
  const [trips, setTrips] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addNewTrip, setAddTrip] = useState(null);
  const [viewport, setViewport] = React.useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 14,
  });

  useEffect(() => {
    (async () => {
      const trips = await apiHandler.getItems();
      setTrips(trips);
      console.log(trips);
    })();
  }, []);

const addMarkerPopUp = (event) => {
const [longitude,latitude] = event.lngLat;
  // event.srcEvent.stopPropagation();
  setAddTrip({
    longitude,
    latitude,
  })
}

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      onDblClick={addMarkerPopUp}
    >
      {trips.map((trip) => {
        return (
          <div>
            <Marker
              key={trip._id}
              latitude={trip.location.coordinates[0]}
              longitude={trip.location.coordinates[1]}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div onClick = {()=> setShowPopup({
                showPopup, [trip._id]: true,
              })}
              >
              <img
                style={{
                  width: `calc(1vmin * ${viewport.zoom})`,
                  transform: "translate(-50%,-100%)",
                }}
                src={Pin}
                alt={Pin}
              />
              {/* <div>{trip.title}</div> */}
              </div>
            </Marker>
            {showPopup[trip._id] ? (
              <Popup
              latitude={trip.location.coordinates[0]}
              longitude={trip.location.coordinates[1]}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setAddTrip({
                  showPopup, [trip._id]: false,
                })}
                anchor="top"
              >
                {/* ADD HERE A THE POPUP FORM */}
                <div>{trip.title}</div>
              </Popup>
            ) : null}
          </div>
        );
      })}

      {addNewTrip ? (
<div>
<Marker
              latitude={addNewTrip.latitude}
              longitude={addNewTrip.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>
              <img
                style={{
                  width: `calc(1vmin * ${viewport.zoom})`,
                  transform: "translate(-50%,-100%)",
                }}
                src={Pin}
                alt={Pin}
              />
              {/* <div>{trip.title}</div> */}
              </div>
            </Marker>
<Popup
              latitude={addNewTrip.latitude}
              longitude={addNewTrip.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => addMarkerPopUp(null)}
                anchor="top"
              >
                {/* ADD HERE A THE POPUP FORM */}
                <div>Add New Trip</div>
              </Popup>
</div>
      ): null }
    </ReactMapGL>
  );
}

export default AppMap;
