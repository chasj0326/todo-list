import Layout from "../components/Layout";
import TodoList from "../components/TodoList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/9f0abc9400.js" crossOrigin="anonymous"></script>
      </Head>
      <Layout>
        <TodoList/>
      </Layout>
    </>
  )
}
