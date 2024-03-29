import Header from "@/components/Header";
// import { API_KEY, CONTEXT_KEY } from "@/keys";
import Head from "next/head";
import Response from "@/response"
import { useRouter } from "next/router";
import SearchResults from "@/components/SearchResults";

function Search({ results }) {
  const router = useRouter()
  
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
      </Head>

      <Header />
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || '0'
  
  const data = useDummyData ? Response :  await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
  ).then((response) => response.json());

  // After the SERVER has rendered pass the results to the client
  return {
    props: { results: data },
  };
}
