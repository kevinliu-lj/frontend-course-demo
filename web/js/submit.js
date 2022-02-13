/**
 * 查询DOM节点
 * @param {string} 查询语法，例如: "#id" ".className"
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector
 * @returns 
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * 实现图片预览
 */
function handlePreview() {
    const uploadEl = $('#upload'); // 图片上传input
    const previewEl = $('#preview'); // 图片预览
    uploadEl.addEventListener('change', function() {
        const reader = new FileReader();
        // 监听load事件
        reader.addEventListener('load', function() {
            console.log('显示图片');
            previewEl.src = reader.result; // 图片base64
            previewEl.classList.add('uploaded'); // 上传完成之后样式有差异
        });
        // 读取文件，读取完成后会触发load事件
        // @see https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
        reader.readAsDataURL(uploadEl.files[0]);
    });
}

//图片上传
async function uploadFile() {
    // 1. 处理输入数据
    const name = $("#name").value.trim();
    const photographer = $("#photographer").value.trim();
    const desc = $("#desc").value.trim();
    const fileObj = $("#upload").files[0]; // js 获取文件对象
    if (!fileObj) {
        alert('请选择图片');
        return;
    }

    if (!name) {
        alert('请输入名称');
        return;
    }

    if (!photographer) {
        alert('请输入拍摄者');
        return;
    }
    if (!desc) {
        alert('请输入描述信息');
        return;
    }

    // 2. 构建FormData
    const form = new FormData(); // FormData 对象
    form.append("file", fileObj); // 文件对象
    form.append("name", name);
    form.append("photographer", photographer);
    form.append("desc", desc);

    // 3. 提交FormData
    console.log('开始上传', { fileObj, name, photographer, desc });
    try {
        const response = await fetch('/pic/upload', {
            method: 'POST',
            body: form
        });
        console.log('状态码', response.status);

        const result = await response.json();
        if (result.success) {
            alert("上传成功！");
            window.location.href = 'index.html'
            return;
        }
    } catch (e) {
        console.error('上传失败', e);
    }
    alert("上传失败！");
}

handlePreview();