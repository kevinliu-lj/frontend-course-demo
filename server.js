'use strict';

const http = require('http');
const address = require('address');

const listHandler = require('./lib/listHandler');
const uploadHandler = require('./lib/uploadHandler');
const staticHandler = require('./lib/staticHandler');

// IP地址
const hostname = address.ip();
// 端口号
const port = 3000;
const server = http.createServer((req, res) => {
  let pathUrl = req.url;

  console.log(`请求: [${req.method}]${pathUrl}`);

  // 默认路径
  if (!pathUrl || pathUrl === '/') pathUrl = 'index.html';

  // 文件上传处理 /pic/upload
  if (pathUrl.endsWith('upload')) {
    return uploadHandler(req, res);
  }

  // 数据查询接口 /pic/list
  if (pathUrl.endsWith('list')) {
    return listHandler(req, res);
  }

  // 处理静态文件
  return staticHandler(pathUrl, res);
});

server.timeout = 3000; // 超时时间3s(便于项目调试，实际项目中无需指定)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
