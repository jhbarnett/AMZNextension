// background.js
chrome.webNavigation.onCompleted.addListener(function(e){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    if (activeTab) chrome.tabs.sendMessage(activeTab.id, {"message": "page_loaded"});
  });
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url})
    }
    else if( request.message === "fetch_amazon_products" ) {
      alert(request.product)
    }
  }
);