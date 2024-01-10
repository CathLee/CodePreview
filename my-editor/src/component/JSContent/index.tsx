import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as monaco from "monaco-editor";
import { NodePath } from "@babel/traverse";
import { ImportDeclaration } from "@babel/types";
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

interface Visited {
  [key: string]: boolean;
}
const JSContent: FC = () => {
  const editorEl = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  /**
   * @description: 遍历AST，判断是否有import语句
   * @param {string} code
   * @return {*}
   */
  const checkHasImport = (code: string): Boolean => {
    let result = false;
    window.Babel.transform(code, {
      plugins: [
        function () {
          return {
            visitor: {
              ImportDeclaration(path: NodePath<ImportDeclaration>) {
                // console.log(path);

                result = true;
                path.stop();
              },
            },
          };
        },
      ],
    });
    return result;
  };

  const handleCDNSource = (source: string, importMap: any) => {
    
  }
  const parseJsImportPlugin = (importMap = {}) => {
    let visited: Visited = {};
    return function (babel: { types: any; }) {
      let visited = {};
      let t = babel.types;
      return {
        visitor: {
          ImportDeclaration(path: NodePath<ImportDeclaration>) {
            let source: string = path.node.source.value;
            if (!(visited as Visited)[source]) {
              source = handleCDNSource(source, importMap);
            }
            visited[source] = true;
            path.replaceWith(
              t.importDeclaration(path.node.specifiers, t.stringLiteral(source))
            );
          },
        },
      };
    };
  };

  const resolveImport = (code: string, importMap: string) => {
    if (!checkHasImport(code)) {
      return {
        useImport: false,
        js: code,
      };
    }
    return {
      useImport: true,
      js: window.Babel.transform(code, {
        plugins: [parseJsImportPlugin(importMap)],
      }).code,
    };
  };
  const compile = () => {
    return new Promise((resolve, reject) => {
      if (!editorRef.current) return reject("Editor not initialized");
      const code = editorRef.current!.getValue();

      // 纯babel编译
      // if (code === "") return;
      // const _code = window.Babel.transform(code, {
      //   presets: ["es2015", "react"],
      // })?.code;

      // 对js环境进行编译
      const _code = resolveImport(code, "importMap");
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
        // console.log(res);
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
