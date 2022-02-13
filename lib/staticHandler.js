'use strict';

const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

module.exports = (pathUrl, res) => {
    // 处理静态文件
    const extName = path.extname(pathUrl);
    const filePath = path.join(__dirname, '..', 'web', pathUrl);

    if (fs.existsSync(filePath)) {
        // 200 success
        res.writeHead(200, { 'Content-Type': `${mime.lookup(extName)}` });
        fs.readFile(filePath, (err, data) => {
            res.end(data);
        });
        return;
    }

    // 404 not found
    res.writeHead(404, { 'Content-Type': `${mime.lookup(extName)}` });
    res.end();
};
