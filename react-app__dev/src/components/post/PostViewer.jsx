import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import axios from "axios";

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ postId }) => {
  const id = postId;
  const [Post, setPost] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const needToIncreaseHit = useRef(true);

  useEffect(() => {
    /*const converted_date = new Date(date);
    console.log(
      "Date: " +
        timeDifference.getDate() +
        "/" +
        (timeDifference.getMonth() + 1) +
        "/" +
        timeDifference.getFullYear() +
        " " +
        timeDifference.getHours() +
        ":" +
        timeDifference.getMinutes() +
        ":" +
        timeDifference.getSeconds()
    );*/
  }, [id]);

  useEffect(() => {
    let form = new FormData();
    const date = Date.now(localStorage.getItem(`post__${id}__lastVisitedDate`));
    const timeDifference =
      date - parseInt(localStorage.getItem(`post__${id}__lastVisitedDate`));
    const getData = async () => {
      try {
        form.append("postId", id);
        form.append("needToIncreaseHit", needToIncreaseHit.current);
        const data = await axios.post("/getPost", form);
        setMetaData(JSON.parse(data.data[0].metaData)[0]);
        setPost(data.data[0]);
      } catch (e) {
        console.log(e);
      }
    };

    if (localStorage.getItem(`post__${id}__lastVisitedDate`) !== null) {
      if (timeDifference < 5000) {
        //재방문 갱신시간 안지남
        needToIncreaseHit.current = false;
        getData();
      } else if (timeDifference > 5000) {
        //재방문 갱신시간 지남
        getData();
        localStorage.setItem(`post__${id}__lastVisitedDate`, date);
      }
    } else if (localStorage.getItem(`post__${id}__lastVisitedDate`) === null) {
      //처음 방문
      getData();

      localStorage.setItem(`post__${id}__lastVisitedDate`, date);
    }
  }, [id, needToIncreaseHit]);

  return (
    <PostViewerBlock>
      <title>FLASK WITH REACT</title>

      <PostHead>
        <h1>{Post.title}</h1>
        <SubInfo publishedDate={Post.regDate} hasMarginTop />
      </PostHead>
      {/*{actionButtons}*/}
      <PostContent dangerouslySetInnerHTML={{ __html: Post.body }} />
      <div>조회수 {Post.hitCount}</div>
      <ul>
        <div>링크 오픈그래프 데이터</div>
        <li>제목: {metaData.ogTitle}</li>
        <li>
          url: <a href={metaData.ogUrl}>{metaData.ogUrl}</a>
        </li>
        <li>요약: {metaData.ogUrl}</li>
        <li>
          이미지: <img src={metaData.ogImage} alt="오픈그래프 이미지" />
        </li>
      </ul>
    </PostViewerBlock>
  );
};

export default PostViewer;
