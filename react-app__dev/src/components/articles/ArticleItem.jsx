import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubInfo from "../common/SubInfo";
import palette from "./../../lib/styles/palette";

const ArticleItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;

  &:first-child {
    padding-top: 0;
  }

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

const ArticleItem = ({ article }) => {
  const { id, regDate, title, body, hitCount } = article;

  return (
    <ArticleItemBlock>
      <h2>
        <Link to={`/detail/${id}`}>{title}</Link>
      </h2>
      <div>조회수 {hitCount}</div>
      <SubInfo publishedDate={regDate} />
      <p>{body}</p>
    </ArticleItemBlock>
  );
};

export default ArticleItem;
