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

function combineWord(first_half, second_half, element) {
    var boldText = document.createElement("b");
    boldText.text = first_half;
    var normalText = document.createTextNode(second_half);
    element.appendChild(boldText, normalText);
}

function bolden() {
    var text = get_text();
    for (var i = 0; i < text.length; i++) {
        var span = document.createElement("span");
        var word_array = text[i].nodeValue.split(" ");
        for (var w = 0; w < word_array.length; w++) {
            var chars = Array.from(word_array[w]);
            if (w != 0) {
                var space = [" "];
                chars = space.concat(chars);
            }
            if (chars.length == 1) {    
                var boldLetter = document.createElement("b");
                span.appendChild(boldLetter);
                continue;
            }
            if (chars.length % 2 == 0) {
                var middle = (chars.length) / 2;
                let first_half = chars.slice(0, middle).join('');
                let second_half = chars.slice(-middle).join('');
                combineWord(first_half, second_half, span);
            }
            else {
                var middle2 = (chars.length + 1) / 2;
                let first_half2 = chars.slice(0, middle2).join('');
                let second_half2 = chars.slice(-(middle2 - 1)).join('');
                combineWord(first_half2 + second_half2, span);
            }
        }
        span.className = "ADHD-boldened";
        text[i].parentNode.replaceChild(span, text[i]); // replaces the entire text node with a span containing one word. maybe change to appending newtext instead of setting it
    }
    var boldWeight = document.createElement("style");
    boldWeight.innerHTML = "body {font-family: Arial, sans-serif; font-weight: 500} .ADHD-boldened b {font-weight: 600}";
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