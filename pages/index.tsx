import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Post } from "../components/post";
import { createClient, Entry } from "contentful";

type ContentfulPost = {
  name: string;
  content: string;
};

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

const fetchEntries = async () => {
  const entries = await client.getEntries<ContentfulPost>();

  return entries.items;
};

export default () => {
  const [posts, setPosts] = useState<Entry<ContentfulPost>[]>([]);

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setPosts([...allPosts]);
    }

    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      {posts.length > 0
        ? posts.map((p) => (
            <Post name={p.fields.name} content={p.fields.content} />
          ))
        : null}
    </>
  );
};
