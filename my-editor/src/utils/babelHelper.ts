/*
 * @Date: 2024-01-11 21:25:29
 * @Description:
 */
import { NodePath } from "@babel/core";
import { ImportDeclaration } from "@babel/types";

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

const parseJsImportPlugin = (importMap = {}) => {
  let visited: Visited;
  return function (babel: { types: any }) {
    let t = babel.types;
    return {
      visitor: {
        ImportDeclaration(path: NodePath<ImportDeclaration>) {
          let source: keyof Visited = path.node.source.value;
          if (!visited[source]) {
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

export const resolveImport = (code: string, importMap: string) => {
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
