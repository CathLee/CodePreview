import transform from "./transform";

/*
 * @Date: 2024-01-22 20:22:53
 * @Description:
 */
export const assembleHtml = (head: string, body: string) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      ${head}
  </head>
  <body>
      ${body}
  </body>
  </html>`;
};

export const compile = (
  jsContent: string,
  htmlContent: string,
  cssContent: string
) => {
    console.log(jsContent, htmlContent, cssContent);
    
  const htmlTransform = transform.html(htmlContent);
  // todos:importMap 暂定为空
  const jsTransform = transform.js(jsContent, {});
  const cssTransform = transform.css(cssContent);
  return new Promise((resolve, reject) => {
    Promise.all([htmlTransform, jsTransform, cssTransform])
      .then(([htmlStr, jsData, cssStr]) => {
        resolve({
          html: htmlStr,
          js: jsData,
          css: cssStr,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
