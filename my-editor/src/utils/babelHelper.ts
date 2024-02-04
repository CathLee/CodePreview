/*
 * @Date: 2024-01-11 21:25:29
 * @Description:
 */
import { NodePath } from "@babel/core";
import { ImportDeclaration } from "@babel/types";
import loadjs from "loadjs";
import * as BabelType from "@babel/types";
export const base = "http://localhost:5173/";
/**
 * 使用 Record 类型来代替简单的键值对接口
 */
export type Visited = Record<string, boolean>;
export type PreprocessorLoaded = Record<string, boolean>;
export type ImportMapEntry = Record<string, string>;
export type ImportMap = ImportMapEntry[];
export interface ImportResolutionResult {
  useImport: boolean;
  js: string;
}
/**
 * @description: 遍历AST，判断是否有import语句
 * @param {string} code
 * @return {*}
 */
const checkHasImport = (code: string): boolean => {
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
 * @param {ImportMap} importMap
 * @return {*}
 */
const parseJsImportPlugin = (importMap: ImportMap) => {
  let visited: Visited = {};
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
const preprocessorLoaded: PreprocessorLoaded = {
  html: true,
  javascript: true,
  css: true,
};

/**
 * @description: 加载babel资源
 * @param {string[]} preprocessorList
 * @return {*}
 */
export const load = (preprocessorList: string[]): Promise<void> | void => {
  let notLoaded: string[] = preprocessorList.filter(
    (item) => !preprocessorLoaded[item]
  );
  if (notLoaded.length <= 0) {
    return;
  }
  return new Promise<void>((resolve, reject) => {
    let jsList: string[] = [];
    notLoaded.forEach((item) => {
      let _resources: string[] = [item].map((r) => {
        return /^https?/.test(item) ? item : `${base}parses/${r}.js`;
      });
      jsList.push(..._resources);
    });

    loadjs(jsList, { returnPromise: true })
      .then(() => {
        notLoaded.forEach((item) => {
          preprocessorLoaded[item] = true;
        });
        resolve();
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};
/**
 * @description: 解析import语句 暂时仅针对js情况
 * @param {string} code
 * @param {ImportMap} importMap 依赖包的cdn地址
 * @return {*}
 */
export const resolveImport = async (
  code: string,
  importMap: ImportMap
): Promise<ImportResolutionResult> => {
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
    js: code,
  };
};
/**
 * @description: 解析React模板
 * @param {string} code
 * @return {*}
 */
export const resolveJSX = (code: string):Promise<ImportResolutionResult> => {
  return new Promise((resolve, rejects) => {
    try {
      const _code = window.Babel!.transform(code, {
        presets: ["env", "react"],
      })?.code;
      resolve({
        useImport: false,
        js: _code,
      });
    } catch (error) {
      console.log("jsx error is:", error);
      rejects(error);
    }
  });
};
