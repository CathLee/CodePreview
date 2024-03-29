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

export const compile = async (
  jsContent: string,
  htmlContent: string,
  cssContent: string
) => {
  const htmlTransform = transform.html(htmlContent);
  // todos:importMap 暂定为空
  const jsTransform = transform.js(jsContent, [], "babel");
  const cssTransform = transform.css(cssContent);
  try {
    const [htmlStr, jsData, cssStr] = await Promise.all([
      htmlTransform,
      jsTransform,
      cssTransform,
    ]);
    return {
      html: htmlStr,
      js: jsData,
      css: cssStr,
    };
  } catch (error) {
    throw error;
  }
};
