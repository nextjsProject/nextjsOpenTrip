import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { getCenter } from 'geolib';
import { useState } from 'react';


// adding a wrapper to help with mapbox data

function Map(props) {
  // console.log(intPlaces);
//keep track of the selected pin and the object that is related to it to match the popup



  //return an Arr with the needed formating of the lan and lon that where inside the point key
  const coordinatesArr = props.intPlaces.map(({ point: { lat, lon } }) => ({
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
    zoom: 12,
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
      {props.intPlaces.map((place) => (
        <div key={place.xid}>
          <Marker
            longitude={place.point.lon}
            latitude={place.point.lat}
            offsetLeft={-11}
            offsetTop={-44}
          >
            {/* we set the state to match the thing we clicked*/}
            <p
              role="img"
              onClick={() => props.changeSelected(place)}
              style={markerStyle}
              aria-label="clickable-pin"
            >
              📍
            </p>
          </Marker>
          {/* now we check if selectedPlace is true (pin is clicked), and when the longitude of the selected and the place that got mapped
            show the popup, if we close it reset the state         */}
          {props.selectedPlace && props.selectedPlace.point.lon === place.point.lon && (
            <Popup
              onClose={() => props.changeSelected(null)}
              closeOnClick={true}
              latitude={place.point.lat}
              longitude={place.point.lon}
            >
              <img className="map-image" src={place.preview.source} alt={place.name} height={place.preview.height} width={place.preview.width} />
              {/* <span style={popupStyle}> {place.name}</span> */}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
