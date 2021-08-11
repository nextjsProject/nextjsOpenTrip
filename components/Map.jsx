import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import { getCenter } from 'geolib';



// adding a wrapper to help with mapbox data

function Map({intPlaces }) {
//   console.log(lon + ' ' + lat);
// console.log(intPlaces);
//return an Arr with the needed formating of the lan and lon that where inside the point key
const coordinatesArr = intPlaces.map(({ point: { lat, lon } }) => ({
  latitude: lat,
  longitude: lon,
}));
// console.log(coordinatesArr);
// well guess we don't need the center here because we making a search in a Radius
// but I will maybe Later use this
const centerCoordinate = getCenter(coordinatesArr);
// console.log(centerCoordinate);


  const [viewport, setviewport] = useState({
    width: '100%',
    height: '100%',
    latitude: centerCoordinate.latitude,
    longitude: centerCoordinate.longitude,
    zoom: 15,
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
    >
{
  /* Adding the marker form react wrapper   */
}
{
  intPlaces.map((place) => (
    <Marker
      key={place.xid}
      longitude={place.point.lon}
      latitude={place.point.lat}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <p>📍</p>
    </Marker>
  ))
}

    </ReactMapGL>
  );
}

export default Map;
