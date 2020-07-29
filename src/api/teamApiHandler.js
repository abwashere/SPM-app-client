import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/team",
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  getTeams(query) {
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

  getOneTeam(id) {
    return service
      .get(`/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createTeam(teamInfo) {
    return service
      .post("/", teamInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateTeam(id, teamInfo) {
    return service
      .patch(`/${id}`, teamInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteTeam(id) {
    return service
      .delete(`/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
