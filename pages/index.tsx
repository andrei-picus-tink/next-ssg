import React from "react";
import Head from "next/head";
import { Entry } from "contentful";
import { ContentfulPost, fetchEntries } from "../services/contentful";
import { PostList } from "../components/post-list";

type IndexProps = {
  posts: Entry<ContentfulPost>[];
};

export const getStaticProps = async () => {
  const allPosts = await fetchEntries();

  return {
    props: {
      posts: allPosts,
    },
  };
};

const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      <PostList posts={posts} />
    </>
  );
};

export default Index;
