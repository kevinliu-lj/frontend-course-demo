'use strict';

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

module.exports = (req, res) => {
    // formidable初始配置
    const form = formidable({
        // 保留上传文件后缀名
        keepExtensions: true,
        // 文件保存路径
        uploadDir: path.join(__dirname, '..', 'web', 'data', 'pic'),
        filename(name, ext) {
            // 文件命名方式
            return `pic-${Date.now()}${ext}`;
        },
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(`上传错误`, err);
            return;
        }

        // 更新图片信息JSON文件
        // 1. 读取数据 web/data/data.json
        const listDataPath = path.join(__dirname, '..', 'web', 'data', 'data.json');
        let listData = [];
        if (fs.existsSync(listDataPath)) {
            listData = JSON.parse(fs.readFileSync(listDataPath, 'utf8'));
        }

        // 2. 构造返回数据，数据结构: {name, photographer, desc, picPath}
        const { file } = files;
        fields.picPath = path.relative(path.join(__dirname, '..', 'web'), file.filepath);
        listData.unshift(fields);

        // 3. 回写 web/data/data.json
        fs.writeFileSync(listDataPath, JSON.stringify(listData, null, 2), 'utf-8');

        // 4. 返回成功
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, fields, files }, null, 2));

        console.log(`上传: ${JSON.stringify(fields)}`);
    });
}
