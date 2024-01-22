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