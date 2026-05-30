require('dotenv').config()
const app = require('./app.js')
const connectToDB = require('./config/database.js')

connectToDB();

app.listen(3000,() =>{
    console.log('server is running on port 3000')
})