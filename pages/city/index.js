
import CityItem from '@/components/CityItem';
import Layout from '@/components/Layout';
const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.API_KEY

export default function Cities({ city }) {
    // now the props get placed inside the component and we can render them on the page awesome
    console.log(city)
    return (
        <Layout>
            <CityItem city={city} />
        </Layout >
    );
}

// /* getServerSideProp
//  always runs this code when we go to the home page
//  getStaticProps will get generated at build time, if anything changes it won't get rerendered
//  if you set revalidate: 1 it will, if it dosn't find anything, fetch again (1sec time it will take)
// */
export async function getStaticProps() {
    //make a request
    const search = 'Berlin'
    const res = await fetch(`${API_URL}/places/geoname?name=${search}&apikey=${API_KEY}`)
    const city = await res.json();
    // this is client side and gets shown inside the Terminal


    console.log(city);
    return {
        //  pass it from the server to the client side component
        props: { city },
        revalidate: 1,
    };

}
