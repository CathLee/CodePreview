/*
 * @Date: 2024-01-02 21:50:17
 * @Description:
 */
import Header from "@/component/Header";
import JSContent from "@/component/JSContent";
import CSSContent from "@/component/CSSContent";
import HTMLContent from "@/component/Html";
import { useFetch } from "@/hooks/useFetch";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Query from "@/component/Query/index ";
const EditContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    display:flex;
    flex-direction:row;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const index: FC = () => {
  const [srcDoc, setSrcDoc] = useState("");
  const iframeRef = useRef(null);
  const assembleHtml = (head:string, body:string) => {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      ${head}
  </head>
  <body>
      ${body}
  </body>
  </html>`
  }
  useEffect(()=>{
    const iframe = iframeRef.current;
    const document = iframe.contentDocument || iframe.contentWindow.document;
    
    document.open();
    document.write(assembleHtml('<title>预览<\/title>','<div>hhh</div>'));
    document.close();
  },[])
  return (
    <>
      <EditContainer>
      <Header></Header>
      <div className="content">
        <JSContent></JSContent>
        <CSSContent></CSSContent>
        <HTMLContent></HTMLContent>
      </div>
      <div>
        <iframe ref={iframeRef} src={srcDoc} ></iframe>
      </div>
      </EditContainer>
    </>
  );
};
export default index;
