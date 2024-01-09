import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as monaco from "monaco-editor";
import babelTransform from "@babel/standalone";
const EditroContent = styled.div`
  width: 100%;
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
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();


  const compile = () => {
    return new Promise((resolve, reject) => {
      if (!editorRef.current) return reject("Editor not initialized");
      const code = editorRef.current!.getValue();

      if (code === "") return;
      const _code = window.Babel.transform(code, {
        presets: ["es2015", "react"],
      })?.code;
      console.log(_code);
      resolve(_code);
    });
  };
  const createEditor = () => {
    if (!editorEl.current) return; // 确保DOM元素存在

    if (editorRef.current) {
      editorRef.current.dispose();
    }

    if (editorEl.current) {
      editorRef.current = monaco.editor.create(editorEl.current!, {
        language: "javascript", // Set the language to JavaScript
        minimap: { enabled: false },
        wordWrap: "on",
        theme: "vs-dark",
        fontSize: 16,
        fontFamily: "MonoLisa, monospace",
        contextmenu: false,
        fixedOverflowWidgets: true,
        readOnly: false,
      });
    }
  };

  useEffect(() => {
    createEditor();
    editorRef.current!.onDidChangeModelContent(() => {
      compile().then((res) => {
        console.log(res);
      });
    });

    return () => {
      // 组件卸载时销毁编辑器实例
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);
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
