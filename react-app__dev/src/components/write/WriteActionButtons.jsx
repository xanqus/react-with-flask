import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { withRouter } from "react-router";
import axios from "axios";

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ history, title, body }) => {
  let form = new FormData();
  form.append("title", title);
  form.append("body", body);
  const sendArticleToFlask = () => {
    const sendData = async () => {
      const data = await axios.post("/addArticle", form);
      console.log(data);
      history.push("/");
    };
    sendData();
  };

  const cancelAddArticle = () => {
    history.goBack();
  };

  return (
    <WriteActionButtonsBlock>
      <StyledButton onClick={sendArticleToFlask}>포스트 등록</StyledButton>
      <StyledButton onClick={cancelAddArticle}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default withRouter(WriteActionButtons);
