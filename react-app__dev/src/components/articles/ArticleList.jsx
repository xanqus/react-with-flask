import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ArticleItem from "./ArticleItem";
import Button from "../common/Button";

const WriteArticleButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const ArticleListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 3rem;
  @media screen and (max-width: 768px) {
    width: 100;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const loading = useRef(null);
  useEffect(() => {
    const getData = async () => {
      loading.current = true;
      //let form = new FormData();

      try {
        const data = await axios.post("/getArticles");

        console.log(data.data);
        setArticles(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.current = false;
    };
    getData();
  }, []);

  if (!loading.current) {
    return <ArticleListBlock>loading...</ArticleListBlock>;
  }

  if (!articles) {
    return null;
  }
  return (
    <ArticleListBlock>
      <WriteArticleButtonWrapper>
        <Button cyan to="/write">
          새 글 작성하기
        </Button>
      </WriteArticleButtonWrapper>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ArticleListBlock>
  );
};

export default ArticleList;
