var p = document.createElement('p');
p.innerText = '这是bg';
document.body.appendChild(p);
console.log('这是bg')
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request);
    window.trackUrl = request.trackUrl;
});
