const cors = require('cors')
const  connectDb =require('./config/db.js')
const express = require('express')
const dotenv =require( "dotenv")
const routes =require( './route/routes')

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

connectDb()

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})


routes(app)

module.exports = app



