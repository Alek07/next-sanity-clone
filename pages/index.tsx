import Head from "next/head";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";

import { sanityClient } from "../sanity";
import { Post } from "../types";

interface HomeProps {
  posts: [Post];
}

const Home = ({ posts }: HomeProps) => {
  console.log(posts);
  return (
    <main className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
