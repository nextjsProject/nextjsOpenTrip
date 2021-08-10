import Layout from '@/components/Layout';



export default function Home() {
// now the props get placed inside the component and we can render them on the page awesome
// console.log(intPlaces)

  return (
    /* Hier die Layout-Komponente einsetzen und ihr den
    Inhalt der Seite als Kindelement übergeben. Dazu den title-Prop.  */
    <Layout title="Start">
<div>huhu this is the start Page</div>;



    </Layout>
  );
}