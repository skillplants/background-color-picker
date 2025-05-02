"use strict";

console.log("background script loaded");

let selectedColor = document.getElementById("c").value;

function onError(error) {
  console.error(`Error: ${error}`);
}

function initialColorMessage(message) {
    console.log("original background color:");
    let hexColor = rgbToHex(message.backgroundColor);
    console.log(hexColor);
    while (originalColor.firstChild) {
        originalColor.removeChild(originalColor.firstChild);
    }
    const option = document.createElement('option');
    option.value = hexColor
    originalColor.appendChild(option);
    document.getElementById("option1").value = hexColor;

    const tempValue = colorInput.value;
    colorInput.value = '';
    colorInput.value = tempValue;
}

function openPicker() {
    document.getElementById("c").focus();
    document.getElementById("c").click();
    console.log("opened Picker");
}

function sendMessageToTabs(tabs) {
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { color: selectedColor })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
      })
      .catch(onError);
  }
}

function rgbToHex(rgbString) {
      const rgbValues = rgbString.substring(4, rgbString.length - 1).split(',').map(Number);
      const hexValues = rgbValues.map(value => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      });
      return "#" + hexValues.join('');
}

browser.runtime.onMessage.addListener(initialColorMessage);

browser.browserAction.onClicked.addListener(openPicker);

document.getElementById("c").addEventListener("change", function() {
  selectedColor = document.getElementById("c").value;
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendMessageToTabs)
    .catch(onError);
});
