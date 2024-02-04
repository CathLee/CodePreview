interface Babel {
    transform: (code: string, options: { presets: string[] }) => { code: string };
  }
  
  declare global {
    interface Window {
      Babel: Babel;
    }
  }
  
  // 现在 TypeScript 知道 `window.Babel` 的存在和类型，下面的代码不应该报错
  const _code = window.Babel.transform(code, {
    presets: ["env", "react"],
  })?.code;