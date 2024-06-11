
chrome.action.onClicked.addListener(function() {
    chrome.action.setBadgeBackgroundColor({"color" : "white"});
    chrome.action.setBadgeTextColor({"color" : "black"})
    chrome.storage.local.get(["on"]).then(function(result) {
        if (result["on"] == true) {
            chrome.storage.local.set({"on" : false});
            chrome.action.setBadgeText({"text" : "Off"});
            chrome.tabs.reload();
        }
        else {
            chrome.storage.local.set({"on" : true});
            chrome.action.setBadgeText({"text" : "On"});
            chrome.tabs.reload();
        }
    })
});