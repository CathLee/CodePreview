/*
 * @Date: 2024-01-09 21:33:06
 * @Description:
 */
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import * as monaco from "monaco-editor";
import { useCodeEditor } from "@/hooks/useCodeEditor";
const EditorContent = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .editor-content-header {
  }
  .editor-content-body {
    width: 100%;
    height: 100%;
    background-color: lightblue;
  }
`;

const CSSContent: FC<{onChange:(data:string)=>void}> = ({onChange}) => {
  const editorEl = useRef<HTMLDivElement>(null);
  const { createEditor, disposeEditor } = useCodeEditor(editorEl, "css");


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // 调用父组件传递的回调函数
  };
  useEffect(() => {
    createEditor();
    return () => disposeEditor();
  }, [createEditor, disposeEditor]);
  return (
    <>
      <EditorContent>
        <div className="editor-content-header">CSS</div>
        <div className="editor-content-body" onInput={handleInputChange} ref={editorEl}></div>
      </EditorContent>
    </>
  );
};
export default CSSContent;
