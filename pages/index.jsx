import Layout from '@/components/Layout';
import { useRouter } from 'next/router';



export default function Home() {
// now the props get placed inside the component and we can render them on the page awesome
// console.log(intPlaces)
 const router = useRouter()

  return (
    /* Hier die Layout-Komponente einsetzen und ihr den
    Inhalt der Seite als Kindelement übergeben. Dazu den title-Prop.  */
    <Layout title="Berlin Quiz Homepage">
<div>Nothing to See here go to the Quiz</div>
<button onClick={()=>router.push('/Quiz')}>Quiz me already</button>


    </Layout>
  )
}