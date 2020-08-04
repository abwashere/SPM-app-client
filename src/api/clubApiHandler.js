import axios from "axios";

const service = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL + "/api/club",
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

	getClubs(query) {
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

	getOneClub(id) {
		return service
			.get(`/${id}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getTeamsOfClub(clubID) {
		return service
			.get(`/teams-of/${clubID}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getEventsOfClub(clubID) {
		return service
			.get(`/events-of/${clubID}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	updateClub(id, clubInfo) {
		return service
			.patch(`/${id}`, clubInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	deleteClub(id) {
		return service
			.delete(`/${id}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},
};
