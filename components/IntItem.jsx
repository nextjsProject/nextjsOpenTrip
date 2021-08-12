import Image from 'next/image';
import { shuffle } from '@/library/helpers';
import { useState } from 'react';

export default function IntItem({ intPlace, intNames }) {
  const [anwser, setAnwser] = useState({});

  console.log(anwser);
  const wrap = {
    display: 'flex',
    padding: '20px 5px',
  };

  const imgStyle = {
    width: '190px',
    height: '190px',
    objectFit: 'cover',
  };
  const contentStyle = {
    padding: '0 20px',
  };

  const liStyle = {
    paddingTop: '7px',
  };
  // now get the name of the intPlace and 3 random other ones to get diplayed
  const otherPlaces = intNames.filter((i) => i.xid !== intPlace.xid);

  const shuffledOtherPlaces = shuffle(otherPlaces);

  const threeRandomPlaces = shuffledOtherPlaces.slice(0, 3);

  const addCorrectOne = [...threeRandomPlaces, intPlace];
  console.log(addCorrectOne);

  const questionList = shuffle(addCorrectOne);

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
      <div style={contentStyle}>
        <h3>{intPlace.name}</h3>
        <ol type="a">
          {questionList.map((question) => (
            <li onClick={() => setAnwser(question)}>{question.name}</li>
          ))}
        </ol>
        {/* <span>{`lat: ${intPlace.point.lat} `}</span> */}
        {/* <span>{`lon: ${intPlace.point.lon}`}</span> */}
        {/* TODO: we need to style it better maybe a list we map them over */}
        {/* <div>{intPlace.kinds}</div> */}
      </div>
    </div>
  );
}
