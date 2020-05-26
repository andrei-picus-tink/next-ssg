import React from "react";
import Head from "next/head";
import { Post } from "../components/post";
import { createClient, Entry } from "contentful";

type ContentfulPost = {
  name: string;
  content: string;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const fetchEntries = async () => {
  const entries = await client.getEntries<ContentfulPost>();

  return entries.items;
};

export const getStaticProps = async () => {
  const allPosts = await fetchEntries();

  return {
    props: {
      posts: allPosts,
    },
  };
};

type IndexProps = {
  posts: Entry<ContentfulPost>[];
};

const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      {posts.length > 0
        ? posts.map((p, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Post name={p.fields.name} content={p.fields.content} key={i} />
          ))
        : null}
    </>
  );
};

export default Index;
