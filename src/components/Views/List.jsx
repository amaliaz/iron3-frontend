import React from "react";
import apiHandler from "./../../api/apiHandler";
import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import "./../../styles/ListTrips.css";





function List() {
  const [trips, setTrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);



  const getAllTrips = async () => {
    const trips = await apiHandler.getItems();
    setTrips(trips);
  };


  useEffect(() => {
    getAllTrips();
  }, []);


//   const handleDelete = (tripId) => {
//     // setSelectedTrips({
//     //     selectedTrips: selectedTrips.filter(
//     //         (c, i) => c.id !== tripId
//     //       ),
//     //     });
//         console.log(tripId);
//   };


//   const handleDelete = async (event) => {
//     try {
//        const id= event.target.id;
//       await apiHandler.removeItem(id);
//     //   onClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const handleDelete = async (itemId ) => {
        const tripToRemove = await apiHandler.removeItem(itemId);
        const userTrips = [...trips].filter((item) => item._id !== itemId);
        setTrips(userTrips)
  }

  return (
    <div>
      {trips.map((trip) => {
        return (
          <div  key={trip._id} className="trip-container">
            <div>
              <img src={trip.image} alt="Trip" />
              <div>
                <h2>{trip.title}</h2>
                <p>
                  <span>{trip.startDate}</span>
                  <span>{trip.endDate}</span>
                </p>
              </div>
              <div className="buttonsList"><Link to="/list/edit">Edit</Link>
              <button onClick={() => handleDelete(trip._id)}>Delete</button></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default List;
