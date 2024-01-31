/*
 * @Date: 2024-01-22 21:53:10
 * @Description:
 */
import { resolveImport, load } from "./babelHelper";

const html = (code: string) => {
  return new Promise((resolve, reject) => {
    // console.log(code);
    resolve(code);
  });
};

const css = (code: string) => {
  return new Promise((resolve, reject) => {
    // console.log(code);

    resolve(code);
  });
};

const js = (code: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      await load(["html", "babel", "css"]);
      // todos:importMap 暂定为空
      console.log(code);
      // 加载babel解析器

      const result = await resolveImport(code, {});
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  html,
  css,
  js,
};
