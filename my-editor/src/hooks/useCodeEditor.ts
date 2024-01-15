/*
 * @Date: 2024-01-11 21:07:06
 * @Description:
 */

import { MutableRefObject, useCallback, useRef } from "react";
import * as monaco from "monaco-editor";
import { resolveImport } from "@/utils/babelHelper";
import * as Babel from "@babel/core";

export const useCodeEditor = (editorEl: MutableRefObject<HTMLDivElement|null>) => {
    let editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
    const createEditor = useCallback(() => {
        if (!editorEl.current) return;

        editorRef.current = monaco.editor.create(editorEl.current, {
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

        editorRef.current.onDidChangeModelContent(() => {
            compile().then((res) => {
             console.log(res);
            });
        });
    }, [editorEl]);

    const disposeEditor = useCallback(() => {
        if (editorRef.current) {
            editorRef.current.dispose();
        }
    }, []);

    const compile = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!editorRef.current) return reject("Editor not initialized");
            const code = editorRef.current!.getValue();

            // babel解析react jsx
            if (code === "") return;
            const _code = window.Babel.transform(code, {
              presets: ["env", "react"],
            })?.code;

            // 对js环境进行编译
            // 无论是js还是ts或者是其他框架语言都需要先编译成js
            // const _code = resolveImport(code, "importMap");


            resolve(_code);
        });
    }, []);

    return {
        createEditor,
        disposeEditor,
    };
};
