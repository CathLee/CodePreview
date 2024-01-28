/*
 * @Date: 2024-01-02 21:50:17
 * @Description:
 */
import Header from "@/component/Header";
import JSContent from "@/component/JSContent";
import CSSContent from "@/component/CSSContent";
import HTMLContent from "@/component/Html";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { compile } from "@/utils/html";
import { useCreateHtml } from "@/hooks/useCreateHtml";
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
  const [srcDoc, setSrcDoc] = useState<string>("");
  const [compileData, setCompileData] = useState<string>("");

  const [jsContent, setJsContent] = useState<string>();
  const [htmlContent, setHtmlContent] = useState<string>();
  const [cssContent, setCssContent] = useState<string>();

  const iframeRef = useRef<HTMLIFrameElement>(null);


  const { createHtml } = useCreateHtml()
  // usecallback依赖为空，确保在整个生命周期中只会创建一个函数实例
  const handleJSContentChange = useCallback((data: string) => {
    setJsContent(data);
  }, []);
  
  const handleHTMLContentChange = useCallback((data: string) => {
    setHtmlContent(data);
  }, []);
  
  const handleCSSContentChange = useCallback((data: string) => {
    setCssContent(data);
  }, []);

  const handleCompile = useCallback(async () => {
    const data = await compile(jsContent || '', htmlContent || '', cssContent || '');
    console.log(data)
    const src = createHtml(data.html, data.css, data.js.js)
    if (iframeRef.current) {
      const document =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document;
      if (document) {
        document.open();
        document.write(src);
        document.close();
      }
    }
    // setSrcDoc(src as string);
  }, [jsContent, htmlContent, cssContent]);

  useEffect(() => {
    
    handleCompile();
    // const timeoutId = setTimeout(() => {
      
    //   if(jsContent!==''&&htmlContent!==''&&cssContent!==''){
       
    //   }
    //   console.log(srcDoc)
    // }, 1000);
    // return () => clearTimeout(timeoutId);
  }, [jsContent, htmlContent, cssContent, handleCompile]);
  return (
    <>
      <EditContainer>
        <Header></Header>
        <div className="content">
          <JSContent onChange={handleJSContentChange}></JSContent>
          <CSSContent onChange={handleCSSContentChange}></CSSContent>
          <HTMLContent onChange={handleHTMLContentChange}></HTMLContent>
        </div>
        <div>
          <iframe ref={iframeRef} src={srcDoc}></iframe>
        </div>
      </EditContainer>
    </>
  );
};
export default index;
