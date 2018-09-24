/* @flow */

import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

export default (
  head: Object,
  assets: Object,
  htmlContent: string,
  initialState: Object,
  styles: string,
  loadableStateTag: string,
) => {
  const envAssets = __DEV__ ? { js: '/assets/main.js' } : assets;
  const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        
        ${styles}

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
      </head>
      <body>
        <div id="root">${htmlContent}</div>
        ${loadableStateTag}
        <script>
          window.__INITIAL_STATE__=${serialize(initialState)};
        </script>
        ${Object.keys(envAssets)
          .map(
            key =>
              key.substr(key.length - 2) === 'js'
                ? `<script src="${envAssets[key]}"></script>`
                : '',
          )
          .join('')}
        ${head.script.toString()}
      </body>
    </html>
  `;
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };

  return __DEV__ ? html : minify(html, minifyConfig);
};
