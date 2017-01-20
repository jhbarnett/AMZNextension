chrome.webNavigation.onCompleted.addListener(function(e){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0]
    if (activeTab) chrome.tabs.sendMessage(activeTab.id, {"message": "page_loaded"})
  })
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url})
    }
    else if( request.message === "retrieved_product" ) {
      let keywords = filterKeywords(request.product)
      lookupProducts(keywords)
    }
  }
)

function filterKeywords(product) {
  const keywords = product.filter( word => word.length <= 2 ? false : true )
  keywords.sort( (a, b) => a.length < b.length )
  return keywords.slice(0, 5)
}

function lookupProducts(keywords) {
  //GET from Amazon Product Advertising API - ItemSearch

}


