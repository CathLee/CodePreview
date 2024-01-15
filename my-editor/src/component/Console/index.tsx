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

const Console: FC = () => {
  const editorEl = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const createEditor = () => {
    if (!editorEl.current) return;
    
    editorRef.current = monaco.editor.create(editorEl.current, {
      language: "css", // Set the language to JavaScript
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
      const code = `
      .head{
        width:15px;
      }
      `

      const res = resolveCSS(code)
    });
  };
  const transformCssImport = (cssStr) => {
    console.log(cssStr);
    
    return cssStr.replace(
      /(@import\s+)('|")([^'"]+)('|")/g,
      (str, ...matches) => {
        let source = matches[2]
        console.log(str);
        
        return `${matches[0]}${matches[1]}${source}${matches[1]}`
      }
    )
  }

  const resolveCSS = (code: string) => {
    console.log(code);
    
    const ast = transformCssImport(code);
    // console.log(ast);
  }

  const disposeEditor = () => {
    editorRef.current?.dispose();
  };

  useEffect(() => {
    createEditor();
    return () => disposeEditor();
  }, [createEditor, disposeEditor]);
  return (
    <>
      <EditroContent>
        <div className="editor-content-body" ref={editorEl}></div>
      </EditroContent>
    </>
  );
};
export default Console;
