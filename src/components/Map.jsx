import ReactMapboxGl from "react-mapbox-gl";
require("dotenv").config();

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export default Map;
