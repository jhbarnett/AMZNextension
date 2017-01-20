// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "page_loaded") {
      getProductTitle()
    }    
  }
)

function getProductTitle(){
  let product = document.querySelector("title").innerHTML.split(' ').join('+')
  chrome.runtime.sendMessage({"message": "fetch_amazon_products", "product": product })   
}

