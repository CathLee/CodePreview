/*
 * @Date: 2024-01-02 21:50:17
 * @Description:
 */
import Header from "@/component/Header";
import JSContent from "@/component/JSContent";
import Console from "@/component/Console";
import { useFetch } from "@/hooks/useFetch";
import { FC } from "react";
import styled from "styled-components";
const EditContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const index = (url: string)=> {
  const { data, error, loading } = useFetch(url)
  return (
    <>
      {/* <EditContainer> */}
        {/* <Header></Header> */}
        <div className="content">
          {/* <JSContent></JSContent> */}
          {/* <Console></Console> */}
        </div>
      {/* </EditContainer> */}
      {data && <div>{data}</div>}
    </>
  );
};
export default index;
