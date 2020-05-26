import { Entry } from "contentful";
import { ContentfulPost } from "../services/contentful";
import React from "react";
import Link from "next/link";

type PostListProps = { posts: Entry<ContentfulPost>[] };

export const PostList: React.FC<PostListProps> = ({ posts }) => (
  <ul>
    {posts.map((p, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={i}>
        <Link href={`/post/${p.sys.id}`}>
          <a>{p.fields.name}</a>
        </Link>
      </li>
    ))}
  </ul>
);
