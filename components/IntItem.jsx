import Image from 'next/image';

export default function IntItem({ intPlace }) {
  const wrap = {
    display: 'flex',
    padding: '20px 5px',
  };

  const imgStyle = {
    width: '190px',
    height: '190px',
    objectFit: 'cover',
  };

  return (
    <div style={wrap}>
      {/* I use img because we don't know where all the images come from, and somehow I only get the first Image to show with Image  */}
      <img
        style={imgStyle}
        src={intPlace.preview.source}
        width={intPlace.preview.width}
        height={intPlace.preview.height}
        alt={intPlace.name}
      />
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
