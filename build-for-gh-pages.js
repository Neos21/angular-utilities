/*!
 * Angular の URL と同じ階層に転送用 `index.html` を配置する
 * 
 * GitHub Pages では SPA によるルーティングが動作しないため、既に `404.html` を利用した転送設定を行っている
 * これでも機能的には問題ないのだが、404 だと Google Search Console などでエラー扱いになるので
 * 正常なレスポンスになるよう、対象の階層に `404.html` と同じ内容の `index.html` を用意しておく
 */

const fs = require('fs');

const templateHtml = './src/404.html';
const distDirectoryPath = './dist';
const urls = [
  'index',
  'font-family-tester',
  'multiple-diff',
  'calculator',
  'regexp',
  'epoch-time-converter',
  'encoder-decoder',
  'detect-character',
  'date-time-countdown',
  'draw-triangle-svg',
  'text-converter',
  'text-converter/add-line-number',
  'text-converter/case-converter',
  'text-converter/normalize-to-nfc',
  'text-converter/shuffle-lines',
  'beautifier',
  'beautifier/javascript',
  'beautifier/html',
  'beautifier/css',
  'colour-converter',
  'colour-converter/colour-converter',
  'csv-file-to-table',
  'touch-friendly-dnd',
  'dynamic-generate-form',
  'guitar-scale-generator'
];

console.log('Build For GitHub Pages');
urls.forEach(url => {
  console.log(`  ${url}`);
  fs.mkdirSync(`${distDirectoryPath}/${url}`, { recursive: true });
  fs.copyFileSync(templateHtml, `${distDirectoryPath}/${url}/index.html`);
});
console.log('Finished');
