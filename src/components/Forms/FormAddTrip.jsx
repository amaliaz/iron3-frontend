import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiHandler from "./../../api/apiHandler";
import { buildFormData } from "./../../utils";

const FormAddTrip = ({ location, onClose }) => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const locationDB = { coordinates: [location.latitude, location.longitude] };
    data.location = locationDB;

    // const imageDB = {image: data.image[0].name};
    // data.image = imageDB;
try {
    data.image = data.image[0].name;
      const fd = new FormData();
      buildFormData(fd, data);
console.log('fomdata', fd);

      await apiHandler.addItem(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

//   string fileName = Path.GetFileName(image.FileName);
//   using (FileStream stream = new FileStream(Path.Combine(uploadDir, fileName), FileMode.Create))
//   {

//       image.CopyTo(stream);
//       model.ImagePath = fileName;

//   }


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
// <form
//                 ref={this.formRef}
//                 onSubmit={this.handleSubmit}
//                 className="entry-form"
//               >
//                 <label htmlFor="title">Title</label>
//                 <input
//                   name="title"
//                   value={this.state.title}
//                   onChange={this.handleChange}
//                 />
//                 <label htmlFor="description">Description</label>
//                 <input
//                   name="description"
//                   value={this.state.description}
//                   onChange={this.handleChange}
//                 />
//                 <label htmlFor="image">Image</label>
//                 <input name="image" type="file" />
//                 <label htmlFor="startDate">Start Date</label>
//                 <input
//                   name="startDate"
//                   type="date"
//                   value={this.state.startDate}
//                   onChange={this.handleChange}
//                 ></input>
//                 <label htmlFor="endDate">End Date</label>
//                 <input
//                   name="endDate"
//                   type="date"
//                   value={this.state.endDate}
//                   onChange={this.handleChange}
//                 />
//                 <button>ADD
//                 </button>
//               </form>
