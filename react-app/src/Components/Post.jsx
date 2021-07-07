import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Post = () => {
  const [test, setTest] = useState(null);
  const isLoading = useRef(true);
  useEffect(() => {
    const getData = async () => {
      let form = new FormData();
      form.append("test", 1);
      try {
        const data = await axios.post("/post", form);
        isLoading.current = false;
        setTest(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [test, isLoading]);

  return <div>{isLoading === true ? "loading.." : test}</div>;
};

export default Post;
