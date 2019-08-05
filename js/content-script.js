(function() {
    const getJSON = function(url) {
        return new Promise(function (resolve, reject) {
            const handler = function () {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            const client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();
        });
    };
    const routerArr = window.location.pathname.split('/');
    const id = routerArr.pop();
    const url = 'https://m.lizhi.fm/vodapi/voice/info/' + id;
    getJSON(url).then(function(json) {
        const trackUrl  = json.data.userVoice.voicePlayProperty.trackUrl;
        let audio = document.createElement('audio');
        audio.src = trackUrl;
        let block = document.createElement('div');
        block.innerHTML = `<div style="position:fixed;left: 50%;bottom:0;transform:translateX(-50%);z-index:10001;width: 100vw;height: 20vh;display: flex;justify-content: center;align-items: center;opacity: 0.8;">
								<audio src="${trackUrl}" controls></audio>
							</div>`
        document.body.appendChild(block);
        chrome.runtime.sendMessage({trackUrl});
    });
})();
