/*
 * @Date: 2024-01-02 21:50:17
 * @Description:
 */
import Header from "@/component/Header";
import JSContent from "@/component/JSContent";
import CSSContent from "@/component/CSSContent";
import HTMLContent from "@/component/Html";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { assembleHtml, compile } from "@/utils/html";
const EditContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const index: FC = () => {
  const [srcDoc, setSrcDoc] = useState("");
  const [compileData, setCompileData] = useState<unknown>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);


  const handleCompile = () => {
    compiledData = await compile()
  }

  useEffect(() => {
    if (iframeRef.current) {
      const document =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document;
      if (document) {
        document.open();
        document.write(assembleHtml("<title>预览</title>", "<div>hhh</div>"));
        document.close();
      }
    }
  }, []);
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
          <iframe ref={iframeRef} src={srcDoc}></iframe>
        </div>
      </EditContainer>
    </>
  );
};
export default index;
