import React from "react";
import Header from "../components/common/Header";
import ArticleViewer from "../components/article/ArticleViewer";

const PostPage = ({ match }) => {
  const postId = match.params.postId;

  return (
    <>
      <Header />
      <ArticleViewer postId={postId} />
    </>
  );
};

export default PostPage;
