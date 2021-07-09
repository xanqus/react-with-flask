import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import axios from "axios";

const ArticleViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const ArticleHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const ArticleContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const ArticleViewer = ({ postId }) => {
  const id = postId;

  const [Article, setArticle] = useState([]);
  useEffect(() => {
    let form = new FormData();
    form.append("postId", id);
    const getData = async () => {
      try {
        const data = await axios.post("/getArticle", form);
        console.log(data.data[0]);
        setArticle(data.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [id]);

  return (
    <ArticleViewerBlock>
      <title>FLASK WITH REACT</title>

      <ArticleHead>
        <h1>{Article.title}</h1>
        <SubInfo publishedDate={Article.regDate} hasMarginTop />
      </ArticleHead>
      {/*{actionButtons}*/}
      <ArticleContent dangerouslySetInnerHTML={{ __html: Article.body }} />
      <div>조회수 {Article.hitCount}</div>
    </ArticleViewerBlock>
  );
};

export default ArticleViewer;
