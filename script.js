function get_text() {
    var tree_walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        function(node) {
            if (/^\s*$/.test(node.nodeValue)) {
                return NodeFilter.FILTER_REJECT;
            }
            else if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 'INPUT', 'TEXTAREA'].includes(node.parentElement.tagName)) {
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
    let b = document.createElement("b");
    b.textContent = first_half;
    let norm = document.createTextNode(second_half);
    element.appendChild(b);
    element.appendChild(norm);
}

function bolden() {
    var text = get_text();
    for (var i = 0; i < text.length; i++) {
        // console.log({text: text[i].nodeValue, parent : text[i].parentElement});
        var span = document.createElement("span");
        var word_array = text[i].nodeValue.split(" ");
        for (var w = 0; w < word_array.length; w++) {
            var chars = word_array[w];
            if (chars.length == 1) {
                append_div(chars, ' ', span);
                continue;
            }
            if (chars.length % 2 == 0) {
                var middle = (chars.length) / 2;
                let first_half = chars.slice(0, middle);
                let second_half = chars.slice(-middle);
                second_half += " ";
                append_div(first_half, second_half, span);
            }
            else {
                var middle2 = (chars.length + 1) / 2;
                let first_half2 = chars.slice(0, middle2);
                let second_half2 = chars.slice(-(middle2 - 1));
                second_half2 += " ";
                append_div(first_half2, second_half2, span);
            }
        }
        span.style.display = text[i].parentElement.style.display;
        text[i].parentNode.replaceChild(span, text[i]);
    }
}
// see if i can put the <b> tags directly in the text node without needing a new span for every word

// get_text();
// console.log(document.body.childNodes);
window.onload = function(){
    chrome.storage.local.get(["on"]).then(function(result) {
        if (result["on"] == true) {
            // Add a global style rule that applies to everything
            var style = document.createElement('style');
            style.textContent = `
                * {
                    font-weight: 400 !important;
                }
                
                span > b {
                    font-weight: 600 !important;
                }
            `;
            document.head.appendChild(style);
            bolden();
        }
    });
};