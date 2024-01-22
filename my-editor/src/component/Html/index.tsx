/*
 * @Date: 2024-01-21 10:13:04
 * @Description:
 */
import { FC, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components";

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
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const createEditor = () => {
    if (!editorEl.current) return;

    editorRef.current = monaco.editor.create(editorEl.current, {
      language: "html", // Set the language to JavaScript
      minimap: { enabled: false },
      wordWrap: "on",
      theme: "vs-dark",
      fontSize: 16,
      fontFamily: "MonoLisa, monospace",
      contextmenu: false,
      fixedOverflowWidgets: true,
      readOnly: false,
    });

    editorRef.current.onDidChangeModelContent(() => {
      const code = `<div>hhh</div>`;

    //   const res = resolveCSS(code);
    //   console.log(res);
    });
  };

  const disposeEditor = () => {
    editorRef.current?.dispose();
  };
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
