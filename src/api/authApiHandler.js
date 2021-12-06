import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api/auth",
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    throw error.response.data;
  }
  throw error;
}

const api = {
  service,

  signupPlayer(playerInfo) {
    return service
      .post("/signup/player", playerInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signupClub(clubInfo) {
    return service
      .post("/signup/club", clubInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(person) {
    return service
      .post("/signin", person)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default api