import React from "react";
import { Post } from "../../components/post";
import {
  client,
  ContentfulPost,
  fetchEntries,
} from "../../services/contentful";
import { Entry } from "contentful";
import Link from "next/link";

export async function getStaticPaths() {
  const posts = await fetchEntries();

  const paths = posts.map((post) => `/post/${post.sys.id}`);

  return { paths, fallback: false };
}

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const post = await client.getEntry<ContentfulPost>(params.id);

  return {
    props: {
      post,
    },
  };
};

const PostPage: React.FC<{ post: Entry<ContentfulPost> }> = ({ post }) => (
  <>
    <Link href="/">
      <a>Home</a>
    </Link>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Post {...post.fields} />
  </>
);

export default PostPage;
