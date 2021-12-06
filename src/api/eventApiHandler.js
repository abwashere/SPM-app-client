import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/event",
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const api = {
  service,

  getEvents(query) {
    if (!query) {
      return service
        .get("/")
        .then((res) => res.data)
        .catch(errorHandler);
    } else {
      return service
        .get(`/${query}`)
        .then((res) => res.data)
        .catch(errorHandler);
    }
  },

  getOneEvent(id) {
    return service
      .get(`/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createEvent(eventInfo) {
    return service
      .post("/", eventInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateEvent(id, eventInfo) {
    return service
      .patch(`/${id}`, eventInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteEvent(id) {
    return service
      .delete(`/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default api