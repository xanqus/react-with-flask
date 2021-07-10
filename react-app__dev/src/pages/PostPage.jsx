import React from "react";
import Header from "../components/common/Header";
import PostViewer from "../components/post/PostViewer";
import CommentList from "../components/comment/CommentList";
import CommentWriter from "../components/comment/CommentWriter";

const PostPage = ({ match }) => {
  const postId = match.params.postId;

  return (
    <>
      <Header />
      <title>게시글 - FLASK WITH REACT</title>
      <PostViewer postId={postId} />
      <CommentList />
      <CommentWriter />
    </>
  );
};

export default PostPage;
