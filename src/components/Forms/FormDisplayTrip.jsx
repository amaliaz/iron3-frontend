import { Marker, Popup } from "react-map-gl";
import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/AppMap.css";


const FormDisplayTrip = ({showPopup, trips, setTrips, setShowPopup, viewport}) => {

        return (
            <div>
            {trips.map(trip => (
                  <React.Fragment key={trip._id}>
                    <Marker
                      latitude={trip.location.coordinates[0]}
                      longitude={trip.location.coordinates[1]}
                    >
                      <div
                        onClick={() => setShowPopup({
                          ...showPopup,
                          [trip._id]: true,
                        })}
                      >
                        <svg
                          className="marker yellow"
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
                    {
                      showPopup[trip._id] ? (
                        <Popup
                        latitude={trip.location.coordinates[0]}
                        longitude={trip.location.coordinates[1]}
                          closeButton={true}
                          closeOnClick={false}
                          dynamicPosition={true}
                          onClose={() => setShowPopup({
                            ...showPopup,
                            [trip._id]: false,
                          })}
                          anchor="top" >
                          <div className="popup">
                            {/* READ ON FORM PLUS EDIT DELETE BUTTONS */}
                            <img src={trip.image} alt="Trip"/>
                            <h2>{trip.title}</h2>
                            <p>Description: {trip.description}</p>
                            <small>Start: {new Date(trip.startDate).toLocaleDateString()}</small> <br></br> 
                            <small>End: {new Date(trip.endDate).toLocaleDateString()}</small>
                            <h3>City: {trip.city}</h3>
                            <p>Transportation: {trip.transportation}</p>
                            <p>Accomondation: {trip.accomondation}</p>
                            <Link to={`/list/edit/${trip._id}`}>Edit</Link>
                          </div>
                        </Popup>
                      ) : null
                    }
                  </React.Fragment>
                ))
              }
              </div>
        )
}

export default FormDisplayTrip
