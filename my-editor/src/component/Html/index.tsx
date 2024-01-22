/*
 * @Date: 2024-01-21 10:13:04
 * @Description:
 */
import { FC, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components";
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

const HTMLContent: FC = () => {
  const editorEl = useRef<HTMLDivElement>(null);
  const { createEditor, disposeEditor } = useCodeEditor(editorEl, "html");

  useEffect(() => {
    createEditor();
    return () => disposeEditor();
  }, [createEditor, disposeEditor]);
  return (
    <>
      <EditorContent>
        <div className="editor-content-header">HTML</div>
        <div className="editor-content-body" ref={editorEl}></div>
      </EditorContent>
    </>
  );
};
export default HTMLContent;
