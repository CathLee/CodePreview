import { resolveImport } from "./babelHelper";

const html = (code: string) => {
  return new Promise((resolve, reject) => {
    resolve(code);
  });
};

const css = (code: string) => {
  return new Promise((resolve, reject) => {
    resolve(code);
  });
};

const js = (code: string) => {
  return new Promise((resolve, reject) => {
    // todos:importMap 暂定为空
    resolve(resolveImport(code, {}));
  });
};

export default{
    html,
    css,
    js
}