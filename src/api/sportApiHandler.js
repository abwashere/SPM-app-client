import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/sport",
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

  getSports() {
    return service
      .get("/")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default api