import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiHandler from "./../../api/apiHandler";
import { buildFormData } from "./../../utils";

const FormAddTrip = ({ location, onClose }) => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const locationDB = { coordinates: [location.latitude, location.longitude] };
    data.location = locationDB;

    try {
      data.image = data.image[0];
      const fd = new FormData();
      buildFormData(fd, data);

      await apiHandler.addItem(fd);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" type="text" required ref={register} />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        type="text"
        rows={3}
        ref={register}
      ></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" type="file" ref={register} />
      <label htmlFor="accomondation">Accomondation</label>
      <input name="accomondation" type="text" required ref={register} />
      <label htmlFor="transportation">Transportation</label>
      <input name="transportation" type="text" required ref={register} />
      <label htmlFor="startDate">Start Date</label>
      <input name="startDate" type="date" required ref={register} />
      <label htmlFor="endDate">End Date</label>
      <input name="endDate" type="date" required ref={register} />
      <button>ADD</button>
    </form>
  );
};

export default FormAddTrip;