function bolden() {
    var all = document.getElementsByTagName('p');
    // var all_li = document.getElementsByTagName("li");
    // var all = Array.from(all_p).concat(Array.from(all_li));
    
    for (var i = 1; i < all.length; i++) {
        var text = all[i].innerHTML;
        var textarray = Array.from(text);
        for (var j = 0; j < textarray.length; j++) {
            if (textarray[j].toLowerCase() != textarray[j].toUpperCase()) {
                var rand = Math.round(Math.random() - 0.15);
                if (rand == 0) {
                    textarray[j] = "<b>" + textarray[j] + "</b>";
                }
            }
            else if (textarray[j] === "<") {
                var num = 2;
                while (!(textarray[j + num] === ">")) {
                    num += 1;
                }
                j += num;
            }
            else if (textarray[j] === "&") {
                j += 5;
            }
        }
        // console.log(textarray);
        // break;
        all[i].innerHTML = textarray.join('');
    
    }
}

bolden();


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message["message"] === "turn on") {
//         console.log("hello");
//         chrome.runtime.sendMessage("", {message : "reload"}, bolden);
//         // chrome.tabs.reload(message["id"], {}, bolden);
//     }
//     else if (message["message"] === "turn off") {
//         // chrome.tabs.reload(message["id"]);
//     }
//     else {
//         console.log("message not on or off");
//         console.log(message["message"]);
//     }
//     return Promise.resolve("done");
// })
