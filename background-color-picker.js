"use strict";

console.log("content script loaded");

function sendBackground() {
    console.log("sending original background color");
    browser.runtime.sendMessage({ backgroundColor: getComputedStyle(document.body).backgroundColor});
}

window.addEventListener("pageshow", sendBackground)

browser.runtime.onMessage.addListener((request) => {
     document.body.style.background = "white";
    document.body.style.background = request.color;
    console.log("Message from the background script:");
    console.log(request.color);
    return Promise.resolve({ response: "Recieved Color" });
});
