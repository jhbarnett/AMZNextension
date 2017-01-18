// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      let product = document.querySelector("title").innerHTML.split(' ').join('+')
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": `https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${product}`})
    }
  }
)

