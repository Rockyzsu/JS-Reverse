const { JSDOM } = require('jsdom');

// 初始化虚拟 DOM 环境
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="app"></div>
    </body>
  </html>
`);

// 获取 window 和 document 对象
const window = dom.window;
const document = window.document;

// 操作 DOM
const app = document.getElementById('app');
app.innerHTML = '<h1>Hello from Node.js!</h1>';

// 输出结果
console.log(document.body.innerHTML);