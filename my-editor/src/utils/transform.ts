import { resolveImport } from "./babelHelper";

const html = (code: string) => {
  return new Promise((resolve, reject) => {
    console.log(code);
    resolve(code);
  });
};

const css = (code: string) => {
  return new Promise((resolve, reject) => {
    console.log(code);
    
    resolve(code);
  });
};

const js = (code: string) => {
  return new Promise((resolve, reject) => {
    // todos:importMap 暂定为空
    console.log(code);
    resolve(resolveImport(code, {}));
  });
};

export default{
    html,
    css,
    js
}