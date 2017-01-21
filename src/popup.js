const productDiv = document.querySelector('div[name=currentProduct')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "query_returned") {
      alert(request.query)
    }    
  }
)

function writeProduct(product) {
  
}