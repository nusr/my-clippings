function activeNewTab() {
    const chrome = window.chrome;
    if (!chrome) {
        return;
    }
    chrome.browserAction.onClicked.addListener(function () {
        const url = chrome.extension.getURL('index.html');
        if (window.tabId) {
            chrome.tabs.update(window.tabId, {selected: true});
        } else {
            chrome.tabs.create({url}, function (tab) {
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
