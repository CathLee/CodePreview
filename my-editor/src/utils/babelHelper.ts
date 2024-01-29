/*
 * @Date: 2024-01-11 21:25:29
 * @Description:
 */
import { NodePath } from "@babel/core";
import { ImportDeclaration } from "@babel/types";
import * as BabelType from "@babel/types";

interface Visited {
  [key: string]: boolean;
}

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

/**
 * @description: 判断当前import语句是否为裸模块，即无https://开头的模块
 * @description：当source为相对路径或模块名时返回true
 * @param {string} source
 * @return {*}
 */
const isBareImport = (source: string) => {
  return !(/^https?:\/\//.test(source) || /^(\/|\.\/|\.\.\/)/.test(source));
};

/**
 * @description: 遍历并加载importMap裸导入的模块，并将对应的裸导入模块替换为cdn地址
 * @param {*} importMap
 * @return {*}
 */
const parseJsImportPlugin = (importMap = {}) => {
  let visited: Visited;
  return function (babel: { types: typeof BabelType }) {
    let t = babel.types;
    return {
      visitor: {
        ImportDeclaration(path: NodePath<ImportDeclaration>) {
          let source: keyof Visited = path.node.source.value;
          if (isBareImport(source) && !visited[source]) {
            source = handleEsModuleCdnUrl(source);
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

const esModuleCdnUrl = "https://unpkg.com/";
const handleEsModuleCdnUrl = (moudle: string, useModule: Boolean = true) => {
  return `${esModuleCdnUrl}${module}${useModule ? "?module" : ""}`;
};

// 记录加载状态
const preprocessorLoaded = {
  html: true,
  javascript: true,
  css: true,
};

// /**
//  * @description: 加载babel资源
//  * @param {string} preprocessorList
//  * @return {*}
//  */
// const load = (preprocessorList: string[]) => {
//   let notLoaded = preprocessorList.filter(item => {
//     return !preprocessorLoaded[item]
//   })
// }
/**
 * @description: 解析import语句
 * @param {string} code
 * @param {string} importMap 依赖包的cdn地址
 * @return {*}
 */
export const resolveImport = async (code: string, importMap: string) => {
  console.log(code);
  // 加载babel解析器
  if (!checkHasImport(code)) {
    return {
      useImport: false,
      js: code,
    };
  }
  return {
    useImport: true,
    // js: window.Babel.transform(code, {
    //   plugins: [parseJsImportPlugin(importMap)],
    // }).code,
    js:code,
  };
};
