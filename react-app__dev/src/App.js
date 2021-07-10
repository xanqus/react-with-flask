import React from "react";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";

/*페이지는 총 3개로 구성하였고 각각 게시물 리스트가있는 PostListPage, 게시물 디테일 페이지가있는 PostPage,
게시물 작성 페이지가있는 WritePage로 구성하였습니다. 각각의 페이지를 나눠 개발한 이유는 추후에 관리도 편하고
개발하면서 복잡한 부분들을 줄일 수 있다고 생각했기 때문입니다. 또한 같은 이유로 각 상황에 따른 Component들도
directory별로 정리해두었습니다.*/

function App() {
  return (
    <>
      <Route component={PostListPage} path={["/"]} exact />
      <Route component={PostPage} path={["/detail/:postId"]} />
      <Route component={WritePage} path={["/write"]} />
    </>
  );
}

export default App;
