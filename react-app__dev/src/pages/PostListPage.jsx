import React from "react";
import Header from "../components/common/Header";
import PostList from "../components/posts/PostList";

const PostListPage = () => {
  return (
    <>
      <title>글 목록 - FLASK WITH REACT</title>
      <Header />
      <PostList />
    </>
  );
};

export default PostListPage;
