import Layout from "@/components/Layout"

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.API_KEY;

export default function cityPage({ city }) {
    console.log(city)
    return (
        <Layout>
            <h1>{city.name}</h1>
        </Layout>
    )
}


/* 
in the object that gets passed in we have in the query: {slug} the slug to the address if we 
visit the page /places/[slug] we get the slug address, I destructure the query and the slug to
get the slug
with getServerSideProps we always fetch when you go to the side, if we want to serve
some data static, so request happens on build time we can use getStaticPath and getStaticProps
getStaticProps will have to get path to our places with getStaticPath to get the path created on build.
the problem is that if we get a new Item, where we have to have a new route next dosn't know the path.
It has to fetch that data first to create the route
*/
export async function getStaticPaths() {
    // if you use NEXT_PUBLIC the values get exposed to the browser
    // the default values will be only available in the node.js env / the server


    // get the whole dataset, we fetch from an api and generate the pathes, the data we get we
    // generate a static path
    const res = await fetch(`${API_URL}/places/geoname?name=Berlin&apikey=${API_KEY}`)
    const cities = await res.json()

    // generating an object with the pathes inside
    // const paths = cities.map(city => ({
    //     params: { slug: city.name }
    // }))
    //
    const paths = [{
        params: { slug: cities.name }
    }]
    /*
     we return an array with the paths objects
     the fetch method get
    */
    console.log(paths)
    return {
        paths,
        fallback: true,
    }
}

// now we have access to the object with the params key inside the paths array
export async function getStaticProps({ params: { slug } }) {
    /*
     request to the respond route, get the data we need to than pass it
     to the client
     */
    const search = 'Berlin'
    const res = await fetch(`${API_URL}/places/geoname?name=${search}&apikey=${API_KEY}`)
    //care the res is an array with one item
    const cities = await res.json()
    console.log(cities)
    // with index 0 we get the first entry, its an object with the details to the place 
    // with props we can pass that data to the client side component
    console.log(cities[0]);
    return {
        props: {
            city: cities
        },
        revalidate: 1
    }
}






// export async function getServerSideProps({ query: { slug } }) {
//     // console.log(slug)
//     /*
//      request to the respond route, get the data we need to than pass it
//      to the client
//      */

//     const res = await fetch(`${API_URL}/api/places/${slug}`)
//     //care the res is an array with one item
//     const places = await res.json()

//     // with index 0 we get the first entry, its an object with the details to the place 
//     // with props we can pass that data to the client side component
//     console.log(places[0]);
//     return {
//         props: {
//             place: places[0]
//         },
//     }
// }
