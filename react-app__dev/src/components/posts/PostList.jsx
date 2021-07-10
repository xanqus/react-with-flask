import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import PostItem from "./PostItem";
import Button from "../common/Button";

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostListBlock = styled.div`
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

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const loading = useRef(false);
  useEffect(() => {
    const getData = async () => {
      loading.current = true;
      //let form = new FormData();

      try {
        const data = await axios.post("/getPosts");

        //console.log(data.data);
        setPosts(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    loading.current = false;
  }, []);

  if (loading.current) {
    return <PostListBlock>loading...</PostListBlock>;
  }

  if (!posts) {
    return null;
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button cyan to="/write">
          새 글 작성하기
        </Button>
      </WritePostButtonWrapper>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </PostListBlock>
  );
};

export default PostList;
