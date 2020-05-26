import { createClient } from "contentful";

export type ContentfulPost = {
  name: string;
  content: string;
};

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const fetchPosts = async () => {
  const entries = await client.getEntries<ContentfulPost>();

  return entries.items;
};
