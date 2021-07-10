import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";

const CommentListBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const CommentList = () => {
  return (
    <CommentListBlock>
      <div>댓글</div>
      <div>댓글</div>
    </CommentListBlock>
  );
};

export default CommentList;
