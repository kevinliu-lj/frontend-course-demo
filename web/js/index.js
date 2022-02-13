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
 * 向页面中追加图片
 * @param {object} item 图片数据
 */
function appendPic(item) {
    const {
        name,
        photographer,
        desc,
        picPath
    } = item || {}

    const html = `
    <li class="gallary-item">
        <img src="./${picPath}" />
        <p class="name">${name}</p>
        <p class="photographer">by ${photographer}</p>
        <p class="desc">${desc}</p>
    </li>`;

    $('#pics').innerHTML += html;
}

/**
 * 查询图片
 * @see: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
async function fetchPics() {
    try {
        const response = await fetch('/pic/list', {
            method: "GET"
        });
        console.log('返回状态', response.status);
        const result = await response.json();

        result.data.forEach(item => {
            appendPic(item); // 图片数据 {name, photographer, desc, picPath}
        })
    } catch (e) {
        console.error('查询图片发生错误', e);
        alert('查询图片发生错误');
    }

}
fetchPics();
