import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";

const Post = () => {
  const [test, setTest] = useState(null);
  const isLoading = useRef(true);
  useEffect(() => {
    const getData = async () => {
      let form = new FormData();
      form.append("test", 1);
      try {
        const data = await axios.get("/showTable", form);
        isLoading.current = false;
        console.log(data.data[0]);
        setTest(JSON.stringify(data.data[0]));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [test, isLoading]);

  return (
    <div>
      {isLoading === true ? (
        "loading.."
      ) : (
        <ul>
          <li>id : {test}</li>
          <li>작성날짜 :{test}</li>
          <li>내용 :{test}</li>
        </ul>
      )}
    </div>
  );
};

export default Post;
