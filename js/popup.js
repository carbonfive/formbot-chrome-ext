var sendFillMessage = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "fill"}, showResponse);
    });
};
var sendClearMessage = function () {
    var resultElement = document.getElementsByClassName("formbot__result");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "clear"}, showResponse);
    });
};

var showResponse = function(response) {
    if (response !== undefined) {
        var resultElement = document.getElementsByClassName("formbot__result")[0];
        resultElement.textContent =response.result;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var fillButton = document.getElementsByClassName('js-fill')[0];
    var clearButton = document.getElementsByClassName('js-clear')[0];

    fillButton.onclick = sendFillMessage;
    clearButton.onclick = sendClearMessage;
});
