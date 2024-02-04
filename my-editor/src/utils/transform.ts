/*
 * @Date: 2024-01-22 21:53:10
 * @Description:
 */
import { resolveImport, load, resolveJSX, ImportMap } from "./babelHelper";

const html = (code: string):Promise<string>  => {
  return new Promise((resolve, reject) => {
    resolve(code);
  });
};

const css = (code: string):Promise<string> => {
  return new Promise((resolve, reject) => {
    resolve(code);
  });
};

const js = (code: string, importMap:ImportMap, preprocessor: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      await load(["html", "babel", "css"]);
      // todos:importMap 暂定为空
      // 加载babel解析器

      if (preprocessor === "js") {
        result = await resolveImport(code, []);
      }
      if (preprocessor === "babel") {
        result = await resolveJSX(code);
      }

      resolve(result);
    } catch (error) {
      console.log("fuck off the transformed error is:", error);
    }
  });
};

export default {
  html,
  css,
  js,
};
