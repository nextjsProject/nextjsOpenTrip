import ReactMapGL from 'react-map-gl';
import { useState } from 'react';

// adding a wrapper to help with mapbox data

function Map({ }) {
//   console.log(lon + ' ' + lat);

  const [viewport, setviewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 40,
    longitude: 13,
    zoom: 10,
  });
  // I need to change the given props to match the keys latitude and longitude

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/manograhl/cks65fk9x26wz18oyg6ujl8pf"
      mapboxApiAccessToken={process.env.mapbox_key}
      //   mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      //    if the user wants to scroll and zoom it will update the viewport values,
      onViewportChange={(nextViewport) => setviewport(nextViewport)}
    ></ReactMapGL>
  );
}

export default Map;
