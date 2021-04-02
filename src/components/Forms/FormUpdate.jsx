import React,  { useState, useEffect, useParams } from 'react'
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { buildFormData } from "./../../utils";
import apiHandler from "./../../api/apiHandler";
import "./../../styles/AppMap.css";

function FormUpdate() {
  const [trips, setTrips] = useState([]);
    const [error, setError] = useState("");
    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm();

    const [stateValues, setStateValues] = useState({})
    // let userId = props.match.params.id;

    const getAllTrips = async () => {
      const trips = await apiHandler.getItems();
      setTrips(trips);
    };
  
    function handleChange(event) {
        const { name, value } = event.target
        setStateValues({
            ...stateValues,
            [name]: value
        })
    }

    const onSubmit = async (data) => {
      let id = window.location.pathname.replace("/list/edit/","")

        try {
          const fd = new FormData();
          buildFormData(fd, stateValues);

          await apiHandler.updateItem(id, data);
          // <Redirect to="/list" />
        } catch (error) {
          console.error(error);
          setError(error.message);
        }
      };

      useEffect(() => {
       
      }, []);

    return (

        <form onSubmit={handleSubmit(onSubmit)}  onChange={handleChange} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" type="text"  ref={register} value={stateValues.title}   />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        type="text"
        rows={3}
        ref={register}
      ></textarea>
      {/* <label htmlFor="image">Image</label>
      <input name="image"  ref={register} type="file" /> */}
      <label htmlFor="accomondation">Accomondation</label>
      <input name="accomondation"  ref={register} type="text"   />
      <label htmlFor="transportation">Transportation</label>
      <input name="transportation"   ref={register} type="text"   />
      <label htmlFor="startDate">Start Date</label>
      <input name="startDate"  ref={register} type="date"   />
      <label htmlFor="endDate">End Date</label>
      <input name="endDate"  ref={register} type="date"   />
      <button>ADD</button>
    </form>
    )
}

export default FormUpdate
