import { SourceType } from "@/types/source";
import { assembleHtml } from "@/utils/html";

/*
 * @Date: 2024-01-27 12:49:50
 * @Description:
 */
export const useCreateHtml = () => {
  const createHtml = (
    htmlStr: string,
    cssStr: string,
    jsStr: string,
    jsSource: SourceType[]
  ) => {
    const _jsResources = jsSource.map((item) => {
      return `<script src="${item.url}"></script>`;
    });
    const head = `
      <title>预览<\/title>
      <style type="text/css">
          ${cssStr}
      <\/style>    `;
    const jsContent = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script>
        try {
          ${jsStr}
        } catch (err) {
          console.error('js代码运行出错')
          console.error(err)
        }
      <\/script>`;
    const body = `
      ${htmlStr}
      ${_jsResources}
      ${jsContent}
    `;
    return assembleHtml(head, body);
  };
  return {
    createHtml,
  };
};
