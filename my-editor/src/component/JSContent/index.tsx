/*
 * @Date: 2024-01-09 21:33:06
 * @Description:
 */
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as monaco from "monaco-editor";
import { NodePath } from "@babel/traverse";
import { useCodeEditor } from "@/hooks/useCodeEditor";
const EditroContent = styled.div`
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

const JSContent: FC = () => {
  const editorEl = useRef<HTMLDivElement>(null);
  const { createEditor,disposeEditor } = useCodeEditor(editorEl);
  console.log(createEditor);
  
  useEffect(() => {
    createEditor();
    return () => disposeEditor();
  }, [createEditor,disposeEditor]);
  return (
    <>
      <EditroContent>
        <div className="editor-content-header">JS</div>
        <div className="editor-content-body" ref={editorEl}></div>
      </EditroContent>
    </>
  );
};
export default JSContent;
