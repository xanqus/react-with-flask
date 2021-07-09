import React from "react";
import { Route } from "react-router-dom";
import ArticleListPage from "./pages/ArticleListPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <Route component={ArticleListPage} path={["/"]} exact />
      <Route component={PostPage} path={["/detail/:postId"]} />
      <Route component={WritePage} path={["/write"]} />
    </>
  );
}

export default App;
