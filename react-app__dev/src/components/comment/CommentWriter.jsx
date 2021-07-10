import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";

const CommentWriterBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const CommentWriter = () => {
  return <CommentWriterBlock>작성 창</CommentWriterBlock>;
};

export default CommentWriter;
