document.addEventListener("DOMContentLoaded", ready());

function ready() {
    var button = document.getElementById("toggle-bold");
    chrome.storage.local.get(["on"]).then(function(result) {
        if (result["on"]) {
            button.innerText = "Turn off";
        }
        else {
            button.innerText = "Turn on";
        }
    });
    button.addEventListener("click", send_message);
    // button.addEventListener("click", function() {console.log("button")});

}

function send_message() {
    var button = document.getElementById("toggle-bold");
    if (button.innerText === "Turn on") {
        turn_on();
        button.innerText = "Turn off";
    }
    else if (button.innerText === "Turn off") {
        turn_off();
        button.innerText = "Turn on";
    }

}

function turn_on() {
    chrome.storage.local.set({on : true});
    chrome.tabs.reload();
}

function turn_off() {
    chrome.storage.local.set({on: false});
    chrome.tabs.reload();
}

chrome.runtime.onMessage.addListener( function(message, sender, send_response, bold_function) {
    if (message["message"] === "reload") {
        chrome.tabs.reload(bold_function);
    }
})