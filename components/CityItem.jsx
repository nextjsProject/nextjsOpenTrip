// import Link from 'next/link';


export default function CityItem({ city }) {
  return (
    <div>
      <div>'no img yet'</div>
      <div>
        <h3>{city.name}</h3>
        <div>{city.country}</div>
        <span>{`lat: ${city.lat} `}</span>
        <span>{`lon: ${city.lon}`}</span>
        <div>{`Population: ${city.population}`}</div>
      </div>
    </div>
  );
}
