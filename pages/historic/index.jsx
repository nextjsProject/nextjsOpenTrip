import IntItem from '@/components/IntItem';
import Layout from '@/components/Layout';

import { useState } from 'react';

import Map from '@/components/Map';
import { shuffle } from '@/library/helpers';
// import testData from '@/library/testData';

export default function displayintPlaces({ intPlaces, intNames }) {


// with function I pass the needed props changes from the child to the parent
const [selectedPlace, setSelectedPlace] = useState(null);


let notSelected = true;
//first view List, than changes if you click a pin
if (selectedPlace) {
  notSelected = false;
} else {
  notSelected = true;
}


  const style = {
    minWidth: '600px',
    height: '400px',
  };

  // now the props get placed inside the component and we can render them on the page awesome
  return (
    <Layout title="Quiz: Berlin Historic Places">
    <p>Click a Pin and Guess the Place</p>
      <section style={style}>
<Map
  intPlaces={intPlaces}
  selectedPlace={selectedPlace}
  changeSelected={(selectedPlace) => setSelectedPlace(selectedPlace)}
/>;

      </section>

      <div>
        {/* {notSelected &&
          intPlaces.length > 0 &&
          intPlaces.map((intPlace) => (
            <IntItem key={intPlace.xid} intPlace={intPlace} />
          ))} */}
{
!notSelected && <IntItem intPlace={selectedPlace} intNames={intNames} />

}

      </div>
    </Layout>
  );
}

// /* getServerSideProp
//  always runs this code when we go to the home page
//  getStaticProps will get generated at build time, if anything changes it won't get rerendered
//  if you set revalidate: 1 it will, if it dosn't find anything, fetch again (1sec time it will take)
// */
export async function getStaticProps() {
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

/*
 * required Paramters
 */
const lon = '13.41053';
const lat = '52.52437';
// we search in a radius is Large but the api will only display the 500 nearest To the radius Places
const searchRadius = '9500';


/*
 * Optional Paramters
 */
// max 500 data that comes back or we have to tell the api alimit for now its 50 cause i don't wont to reach the limit
const limit = 50;
const kind = 'historic';
// minimum rating it should have 1 min and 3 max popular, 7 is cultural heritage
const rating = 3;

const res = await fetch(
  `${API_URL}/places/radius?radius=${searchRadius}&lon=${lon}&lat=${lat}&limit=${limit}&src_geom=wikidata&src_attr=wikidata&kinds=${kind}&rate=${rating}&format=json&apikey=${API_KEY}`
);
const intPlaces = await res.json();

// filter out this .... Stolperstein
const searchTerm = 'Stolperstein';
const filteredData = intPlaces.filter(
  ({ name }) => !name.startsWith(searchTerm)
);
// shuffle the data (cause he gives back nearest places first)
const shuffledIntPlaces = shuffle(filteredData);


// I need the Ids to do a seperate search for the Img, transform the object inside the array
const placesIds = shuffledIntPlaces.map((result) => ({ xid: result.xid }));
// console.log(placesIds);

const detailsPromises = placesIds.map(({xid})=> fetch(`${API_URL}/places/xid/${xid}?apikey=${API_KEY} `).then(res=>res.json()))

const placeDetails = await Promise.all(detailsPromises)
  
// I stackedoverflowed this one, I needed to marge two arrays with different properties and the same id
// so the second Data overwrites the id in the first set, awesome
// const a3 = a1.map(t1 => ({...t1, ...a2.find(t2 => t2.id === t1.id)}))

const placesAndDetails = shuffledIntPlaces.map(item1=> ({...item1, ...placeDetails.find(item2=> item2.xid === item1.xid)}))

// some have no img filter them out, thats why I fetched 50, cause I don't know if the second fetch object has even images
// found out there are places with no img with ? we dont get arrow message source not defined
const resultWithImg = placesAndDetails.filter(item=> item.preview?.source?item:'' ).slice(0,25)


// console.log(placesAndDetails)

const namesAndIDs = resultWithImg.map((item) => ({
  name: item.name,
  xid: item.xid,
}));
console.log(namesAndIDs);

  return {
    //  pass it from the server to the client side component
    props: { intPlaces: resultWithImg, intNames: namesAndIDs},
    revalidate: 360,
  };
}



  /*
  it seems like he only gives back the results that are nearest to the radius center
  I wanted to get a random 25 places from Berlin and not the closest to the radius,
  I think I could have used other parameters for the search but I will make it work with
  this endpoint, I just shuffle the 250 results and I will slice 25 from them and than
  I will get a better spread
  */


// const filteredTestData = testData.filter(
//   ({ name }) => !name.startsWith(searchTerm)
// );

// console.log(filteredTestData);
// const shuffledIntPlaces = shuffle(filteredTestData);