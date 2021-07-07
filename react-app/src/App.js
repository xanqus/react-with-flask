import React from "react";
import Post from "../src/Components/Post";

function App() {
  return (
    <div>
      <h3>게시판</h3>

      <Post></Post>
      <p>내 토큰 = {window.token}</p>
    </div>
  );
}

export default App;
