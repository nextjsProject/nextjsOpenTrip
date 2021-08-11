// import Link from 'next/link';

export default function IntItem({ intPlace }) {
  return (
    <div>
      <div>
        <h3>{intPlace.name}</h3>
        <span>{`lat: ${intPlace.point.lat} `}</span>
        <span>{`lon: ${intPlace.point.lon}`}</span>
        {/* TODO: we need to style it better maybe a list we map them over */}
        <div>{intPlace.kinds}</div>
      </div>
    </div>
  );
}
