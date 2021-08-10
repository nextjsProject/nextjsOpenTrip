
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import PlaceItem from '@/components/placeItem';


export default function Places({ intPlaces }) {
    // now the props get placed inside the component and we can render them on the page awesome
    console.log(intPlaces)
    return (
        /* Hier die Layout-Komponente einsetzen und ihr den
        Inhalt der Seite als Kindelement übergeben. Dazu den title-Prop.  */
        <Layout title="Start">
            <h1>Places found</h1>;
            {
                intPlaces.length === 0 && <h3>no places foung</h3>
            }
            {
                intPlaces.map((place) => <PlaceItem key={place.xid} place={place} />)
            }


        </Layout>
    );
}

/* getServerSideProp
 always runs this code when we go to the home page
 getStaticProps will get generated at build time, if anything changes it won't get rerendered
 if you set revalidate: 1 it will, if it dosn't find anything, fetch again (1sec time it will take)
*/
export async function getStaticProps() {
    //make a request
    const res = await fetch(`${API_URL}/api/places`);
    const intPlaces = await res.json();
    // this is client side and gets shown inside the Terminal


    console.log(intPlaces);
    return {
        //  pass it from the server to the client side component
        props: { intPlaces },
        revalidate: 1,
    };

}
