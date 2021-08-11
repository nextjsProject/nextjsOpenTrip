import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import { getCenter } from 'geolib';

// adding a wrapper to help with mapbox data

function Map({ intPlaces }) {
  // console.log(intPlaces);
  //keep track of the selected pin and the object that is related to it to match the popup
  const [selectedPlace, setSelectedPlace] = useState(null);

  //return an Arr with the needed formating of the lan and lon that where inside the point key
  const coordinatesArr = intPlaces.map(({ point: { lat, lon } }) => ({
    latitude: lat,
    longitude: lon,
  }));

  // well guess we don't need the center here because we making a search in a Radius
  // but I will maybe Later use this... we do need it cause of the shuffle

  const centerCoordinate = getCenter(coordinatesArr);
  // console.log(centerCoordinate);

  const [viewport, setviewport] = useState({
    width: '100%',
    height: '100%',
    latitude: centerCoordinate.latitude,
    longitude: centerCoordinate.longitude,
    zoom: 11,
  });
  const markerStyle = {
    fontSize: '1.4rem',
  }

  const popupStyle ={
    color: 'red',
  }
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
      {/* Adding the marker form react wrapper   */}
      {intPlaces.map((place) => (
        <div key={place.xid}>
          <Marker
            longitude={place.point.lon}
            latitude={place.point.lat}
            offsetLeft={-10}
            offsetTop={-40}
          >
            {/* we set the state to match the thing we clicked*/}
            <p
              role="img"
              onClick={() => setSelectedPlace(place)}
              style={markerStyle}
              aria-label="clickable-pin"
            >
              📍
            </p>
          </Marker>
          {/* now we check if selectedPlace is true (pin is clicked), and when the longitude of the selected and the place that got mapped
            show the popup, if we close it reset the state         */}
          {selectedPlace && selectedPlace.point.lon === place.point.lon && (
            <Popup
              onClose={() => setSelectedPlace(null)}
              closeOnClick={true}
              latitude={place.point.lat}
              longitude={place.point.lon}
            >
              <span style={popupStyle}> {place.name}</span>
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
