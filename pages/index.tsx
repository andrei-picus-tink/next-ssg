import React from "react";
import Head from "next/head";
import { Entry } from "contentful";
import { ContentfulPost, fetchPosts } from "../services/contentful";
import { PostList } from "../components/post-list";

type IndexProps = {
  posts: Entry<ContentfulPost>[];
};

// Fetch posts on every request so that the list is always up to date.
export const getServerSideProps = async () => {
  const allPosts = await fetchPosts();

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
