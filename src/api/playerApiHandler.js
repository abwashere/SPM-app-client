import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/player",
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

  getPlayers(query) {
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

  getOnePlayer(id) {
    return service
      .get(`/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updatePlayer(id, playerInfo) {
    return service
      .patch(`/${id}`, playerInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deletePlayer(id) {
    return service
      .delete(`/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default api