const bg = chrome.extension.getBackgroundPage();
const trackUrl = bg.trackUrl || '';
let block = document.createElement('div');
block.innerHTML = `<div class="input-line">
                        <input type="text" value="${trackUrl}">
                        <button>复制</button>
                   </div>`
document.body.appendChild(block);
setTimeout(() => {
    let btn = document.querySelector('.input-line button');
    btn.onclick = function () {
        const input = document.querySelector('.input-line input');
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            console.log('复制成功');
        }
    }
}, 500)
