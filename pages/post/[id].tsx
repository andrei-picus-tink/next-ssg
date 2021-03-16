import React from "react";
import { Post } from "../../components/post";
import { client, ContentfulPost, fetchPosts } from "../../services/contentful";
import { Entry } from "contentful";
import Link from "next/link";
import { useRouter } from "next/router";

// Statically generate all posts that exist at build time.
// New posts will be fetched and statically generated at runtime.
export async function getStaticPaths() {
  const posts = await fetchPosts();

  const paths = posts.map((post) => ({
    params: { id: `/post/${post.sys.id}` },
  }));

  return { paths, fallback: true };
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

const PostPage: React.FC<{ post: Entry<ContentfulPost> }> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Post {...post.fields} />
    </>
  );
};

export default PostPage;
