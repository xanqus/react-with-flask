import React, { useState } from "react";
import Responsive from "../components/common/Responsive";
import WriteActionButtons from "../components/write/WriteActionButtons";
import Editor from "../components/write/Editor";
import Header from "../components/common/Header";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <>
      <Header />
      <Responsive>
        <title>글 작성하기 - FLASK WITH REACT</title>

        <Editor body={body} setTitle={setTitle} setBody={setBody} />
        <WriteActionButtons title={title} body={body} />
      </Responsive>
    </>
  );
};

export default WritePage;
