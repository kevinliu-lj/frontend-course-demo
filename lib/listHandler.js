'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  let listData = [];
  try {
    // 构造文件路径: web/data/data.json
    const listDataPath = path.join(__dirname, '..', 'web', 'data', 'data.json');
    
    // 1. 读取文件: web/data/data.json
    if (fs.existsSync(listDataPath)) {
      listData = JSON.parse(fs.readFileSync(listDataPath, 'utf8'));
    }

    // 2. 返回数据，数据结构: { success: true, data: [] }
    const result = JSON.stringify({ success: true, data: listData });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result);

    console.log(`图片列表数据: ${result}`);
  } catch (e) {
    // 读取操作发生错误
    res.end(JSON.stringify({ success: false, error: e.message }));
  }
}
