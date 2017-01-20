require('dotenv').config()

const Express = require('express')
const Path = require('path')
const BodyParser = require('body-parser')
const App = Express()

App.use(BodyParser.json())
App.use(BodyParser.urlencoded({extended: true}))

App.use(Express.static(Path.join(__dirname, '../public')));

App.use('/api/AmazonSearch/:keywords', function(req, res) {
  console.log('lets do this', req.params.keywords)
  res.status(200).send(req.params.keywords).end()
})

const port = process.env.PORT || 8080

const server = App.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})