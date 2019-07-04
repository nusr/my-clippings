function activeNewTab() {
    var chrome = window.chrome;
    if (!chrome) {
        return;
    }
    // 点击扩展图标，打开新的 Tag 页面
    chrome.browserAction.onClicked.addListener(function () {
        var url = chrome.extension.getURL('index.html');
        if (window.tabId) {
            chrome.tabs.update(window.tabId, {selected: true});
        } else {
            chrome.tabs.create({url: url}, function (tab) {
                window.tabId = tab.id;
            });
        }
    });
    chrome.tabs.onRemoved.addListener(function (tabId) {
        if (tabId === window.tabId) {
            window.tabId = null;
        }
    });
}

activeNewTab()
