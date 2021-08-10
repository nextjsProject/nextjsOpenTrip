
import CityItem from '@/components/CityItem';
import Layout from '@/components/Layout';
const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.API_KEY
import { useState } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import Map from '@/components/Map';

export default function Cities({ city }) {
    const [searchTerm, setSearchTerm] = useState(city.name)
    // const debouncedText = useDebouncedValue(searchTerm, 300);
    // hard coding styles just to see the Map
    const style = {
        minWidth: '600px',
        height: '400px'
    }

    // now the props get placed inside the component and we can render them on the page awesome
    console.log(city)
    return (
        <Layout>
            <div>
                <label htmlFor='search'>
                    Find your City:
                    <div>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                </label>
            <CityItem city={city} />
            </div>
            <section style={style}>
                <Map {...city} />

            </section>
        </Layout >
    );
}

// /* getServerSideProp
//  always runs this code when we go to the home page
//  getStaticProps will get generated at build time, if anything changes it won't get rerendered
//  if you set revalidate: 1 it will, if it dosn't find anything, fetch again (1sec time it will take)
// */
export async function getStaticProps() {
    // console.log(searchTerm)
    //make a request
    const search = 'Berlin'
    const res = await fetch(`${API_URL}/places/geoname?name=${search}&apikey=${API_KEY}`)
    const city = await res.json();
    // this is client side and gets shown inside the Terminal


    // get the Image thrught the id


    // console.log(city);
    return {
        //  pass it from the server to the client side component
        props: { city },
        revalidate: 1,
    };

}
