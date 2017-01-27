require('dotenv').config()

const Express = require('express')
const Path = require('path')
const BodyParser = require('body-parser')
const App = Express()
const OperationHelper = require('apac').OperationHelper

App.use(BodyParser.json())
App.use(BodyParser.urlencoded({extended: true}))

App.use(Express.static(Path.join(__dirname, '../public')));

const opHelper = new OperationHelper({
  awsId:     process.env.awsId,
  awsSecret: process.env.awsSecret,
  assocId:   process.env.assocId
})

function queryAmazonProducts(keywords) {
  return opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': keywords,
    'ResponseGroup': 'ItemAttributes,Images'
  }).then(response => {
    return response.result.ItemSearchResponse.Items 
  })
}

App.use('/api/AmazonSearch/:keywords', function(req, res) {
  console.log(req.params.keywords.slice(1))
  queryAmazonProducts(req.params.keywords)
  .then(product => {
    if (product.Item) {
      return {
        productURL: product.Item.DetailPageURL,
        // productIMG: product.Item.MediumImage.URL,
        // productTitle: product.Item.ItemAttributes.Title,
        // productPrice: product.Item.ItemAttributes.ListPrice.FormattedPrice,   
        // relatedURL: product.MoreSearchResultsUrl
      }
    }
  })
  .then( query => res.status(200).send( query ).end() )
  .catch(err => {
    console.error(err)
  })
})

const port = process.env.PORT || 8080

const server = App.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})