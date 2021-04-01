import React,  { useState } from 'react'
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { buildFormData } from "./../../utils";
import apiHandler from "./../../api/apiHandler";

function FormUpdate() {
    const [error, setError] = useState("");
    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm();

    const [stateValues, setStateValues] = useState({})

    function handleChange(event) {
        const { name, value } = event.target
        setStateValues({
            ...stateValues,
            [name]: value
        })
    }

    const onSubmit = async (data) => {
        try {
          const fd = new FormData();
          buildFormData(fd, data);
          await apiHandler.updateItem(fd);
          <Redirect to="/list" />
        } catch (error) {
          console.error(error);
          setError(error.message);
        }
      };



    return (

        <form onSubmit={handleSubmit(onSubmit)}  onChange={handleChange} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" type="text"  value={stateValues.title} required  />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        type="text"
        rows={3}
        ref={register}
      ></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" type="file" />
      <label htmlFor="accomondation">Accomondation</label>
      <input name="accomondation" type="text" required  />
      <label htmlFor="transportation">Transportation</label>
      <input name="transportation" type="text" required  />
      <label htmlFor="startDate">Start Date</label>
      <input name="startDate" type="date" required  />
      <label htmlFor="endDate">End Date</label>
      <input name="endDate" type="date" required  />
      <button>ADD</button>
    </form>
    )
}

export default FormUpdate
