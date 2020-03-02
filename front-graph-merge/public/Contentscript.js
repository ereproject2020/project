function getDataFromDOM(selector) {
    var domNode = document.querySelector(selector);
    if (domNode) {
      var content = document.querySelector(selector).textContent;
      if (content) {
        return content.trim();
      }
    }
    return undefined;
  }

  
  chrome.runtime.sendMessage({"popupOpen": true});
  
