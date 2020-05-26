import React from "react";

type PostProps = {
  name: string;
  content: string;
};

export const Post: React.FC<PostProps> = ({ name, content }) => (
  <div>
    <h1>{name}</h1>
    <div>{content}</div>
  </div>
);
