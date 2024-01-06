import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as monaco from "monaco-editor";
import { transform as babelTransform } from 'babel-standalone';
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
  const [code, setCode] = useState<string>("");

  const compile = () => {
    return new Promise((resolve, reject) => {
        console.log();
        
        const _code = babelTransform.transform(code,{
          presets: ['es2015', 'react']
        
        })?.code
        console.log(_code)
        resolve(_code)
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
      const value = editorRef.current!.getValue();
      setCode(value);
      compile().then((res) => {
        console.log('fdf');
        
      })
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
        <div>{code}</div>
        <div className="editor-content-header">JS</div>
        <div className="editor-content-body" ref={editorEl}></div>
      </EditroContent>
    </>
  );
};
export default JSContent;
