import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data.message);
    throw error.response.data;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service.delete("/logout").catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/current-user")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/trips")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/profile", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfos() {
    return service
      .get("/profile")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeItem(tripId) {
    return service
      .delete(`trips/${tripId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateItem(tripId, data) {
    return service
      .patch(`/trips/${tripId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserItems() {
    return service
      .get("/profile/trips")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addItem(data) {
    return service
      .post("/new-trip", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
export default apiHandler;