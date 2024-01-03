/*
 * @Date: 2024-01-02 21:50:17
 * @Description:
 */
import Header from "@/component/Header";
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
const index: FC = () => {
  return (
    <>
      <EditContainer>
        <Header></Header>
        <div className="content">fdsaf</div>
      </EditContainer>
    </>
  );
};
export default index;
