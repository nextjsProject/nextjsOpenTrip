import IntItem from '@/components/IntItem';
import Layout from '@/components/Layout';

import Map from '@/components/Map';
import { shuffle } from '@/library/helpers';


export default function displayintPlaces({ intPlaces }) {
  // hard coding styles just to see the Map
  const style = {
    minWidth: '600px',
    height: '400px',
  };

  // now the props get placed inside the component and we can render them on the page awesome
  return (
    <Layout title="25 Berlin Intersting Places">
      <section style={style}>
        <Map intPlaces={intPlaces}/>
      </section>
      
      <div>
{
  intPlaces.length > 0 &&
    intPlaces.map((intPlace) => (
      <IntItem key={intPlace.xid} intPlace={intPlace} />
    ))
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
  // we search in a radius from 10km
const searchRadius = '10000000';

  /*
   * Optional Paramters
   */
  // max requested data that comes back
const limitMax = 250;

  // minimum rating it should have 1 min and 3 max popular, 7 is cultural heritage
  const rating = 3;
  const res = await fetch(
    `${API_URL}/places/radius?radius=${searchRadius}&lon=${lon}&lat=${lat}&src_geom=wikidata&src_attr=wikidata&rate=${rating}&format=json&limit=${limitMax}&apikey=${API_KEY}`
  );
  const intPlaces = await res.json();
// console.log(intPlaces.slice(0, 2));
/*
  it seems like he only gives back the results that are nearest to the radius center
  I wanted to get a random 25 places from Berlin and not the closest to the radius,
  I think I could have used other parameters for the search but I will make it work with
  this endpoint, I just shuffle the 250 results and I will slice 25 from them and than
  I will get a better spread
  */
const shuffledIntPlaces = shuffle(intPlaces);

  return {
    //  pass it from the server to the client side component
    props: { intPlaces: shuffledIntPlaces.slice(0,25) },
    revalidate: 1,
  };
}
