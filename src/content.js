// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "page_loaded") {
      getProductTitle()
    }    
  }
)

function getProductTitle(){
  let product = document.querySelector("title").innerHTML.split(' ')
  chrome.runtime.sendMessage({"message": "retrieved_product", "product": product })   
}

