import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as monaco from "monaco-editor";
const EditorContentBody = styled.div`
  width: 100%;
  height: 100%;
`;

const JSContent: FC = () => {
  const editorEl = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const createEditor = async () => {
    if (!editor) {
      if (editorEl.current) {
        const tempEditor = await monaco.editor.create(editorEl.current, {
          model: null,
          minimap: {
            enabled: false, // 关闭小地图
          },
          wordWrap: "on", // 代码超出换行
          theme: "vs-dark", // 主题
          fontSize: 16,
          fontFamily: "MonoLisa, monospace",
          contextmenu: false, // 不显示右键菜单
          fixedOverflowWidgets: true, // 让语法提示层能溢出容器
          readOnly: false,
        });
        setEditor(tempEditor as monaco.editor.IStandaloneCodeEditor);
      }
    }
    return createEditor;
  };
  useEffect(() => {
    createEditor();
  }, []);
  return (
    <>
      <EditorContentBody ref={editorEl}></EditorContentBody>
    </>
  );
};
export default JSContent;
