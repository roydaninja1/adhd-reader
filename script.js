function get_text() {
    var tree_walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        function(node) {
            if (/^\s*$/.test(node.nodeValue) ||node.parentElement.tagName === "SCRIPT" || node.parentElement.tagName === "STYLE") {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    )

    var node;
    var text_nodes = [];
    while (node = tree_walker.nextNode()) {
        text_nodes.push(node);
    }

    return text_nodes;
}

function bolden() {
    var text = get_text();
    for (var i = 0; i < text.length; i++) {
        var word_array = text[i].nodeValue.split(" ");
        var new_text = '';
        for (var w = 0; w < word_array.length; w++) {
            if (w != 0) {
                new_text += " ";
            }
            var chars = Array.from(word_array[w]);
            if (chars.length == 1) {    
                new_text += chars;
                continue;
            }
            if (chars.length % 2 == 0) {
                var middle = (chars.length) / 2;
                let first_half = chars.slice(0, middle).join('');
                let second_half = chars.slice(-middle).join('');
                new_text += "<b>" + first_half + "</b>" + second_half;
            }
            else {
                var middle2 = (chars.length + 1) / 2;
                let first_half2 = chars.slice(0, middle2).join('');
                let second_half2 = chars.slice(-(middle2 - 1)).join('');
                new_text += "<b>" + first_half2 + "</b>" + second_half2;
            }
        }
        var span = document.createElement("span");
        span.className = "ADHD-boldened";
        span.innerHTML = new_text;
        text[i].parentNode.replaceChild(span, text[i]); // replaces the entire text node with a span containing one word. maybe change to appending newtext instead of setting it
    }
    var openSans = document.createElement("link");
    openSans.href = "https://fonts.googleapis.com/css?family=Open Sans";
    openSans.rel = "stylesheet";
    document.head.appendChild(openSans);
    var boldWeight = document.createElement("style");
    boldWeight.innerHTML = "body {font-family: 'Open Sans'; font-weight: 500} .ADHD-boldened b {font-weight: 600}";
    document.head.appendChild(boldWeight);

}

window.onload = function() {
    chrome.storage.local.get(["on"]).then(function(result) {
        if (result["on"] == true) {
            bolden();
        }
        else {
            ;
        }
    });
};

chrome.storage.onChanged.addListener(function(object, areaName){
    if (object.on.newValue == true) {
        bolden();
    }
})