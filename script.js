function get_text() {
    var tree_walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        function(node) {
            if (/^\s*$/.test(node.nodeValue)) {
                return NodeFilter.FILTER_REJECT;
            }
            else if (node.parentElement.tagName === "SCRIPT" || node.parentElement.tagName === "STYLE") {
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

function append_div(first_half, second_half, element) {
    let span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.textContent = first_half;
    let norm = document.createTextNode(second_half);
    element.appendChild(span);
    element.appendChild(norm);
}

function bolden() {
    var text = get_text();
    for (var i = 0; i < text.length; i++) {
        // console.log({text: text[i].nodeValue, parent : text[i].parentElement});
        var div = document.createElement("div");
        var word_array = text[i].nodeValue.split(" ");
        for (var w = 0; w < word_array.length; w++) {
            var chars = Array.from(word_array[w]);
            if (chars.length == 1) {
                append_div(chars, ' ', div);
                continue;
            }
            if (chars.length % 2 == 0) {
                var middle = (chars.length) / 2;
                let first_half = chars.slice(0, middle).join('');
                console.log(first_half);
                let second_half = chars.slice(-middle).join('');
                second_half += " ";
                append_div(first_half, second_half, div);
            }
            else {
                console.log("this is odd");
                var middle2 = (chars.length + 1) / 2;
                let first_half2 = chars.slice(0, middle2).join('');
                console.log(first_half2);
                let second_half2 = chars.slice(-(middle2 - 1)).join('');
                second_half2 += " ";
                append_div(first_half2, second_half2, div);
            }
        }
        div.style.all = "unset";
        div.style.display = text[i].parentElement.style.display;
        text[i].parentNode.replaceChild(div, text[i]);
    }
}

// get_text();
// console.log(document.body.childNodes);
window.onload = function(){
    chrome.storage.local.get(["on"]).then(function(result) {
        console.log(result);
        if (result["on"]) {
            bolden();
        }
        else {
            ;
        }
    });
};