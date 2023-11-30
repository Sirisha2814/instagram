const path = require('path')
const express = require('express')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require('cors');
connectDB()

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postroute'))
app.use('/api/sendrequest', require('./routes/sendrequestroute'))
app.use('/api/getusers', require('./routes/userRoutes'))
app.use('/api/getrequests', require('./routes/viewrequestroute'))
app.use('/api/acceptrequest',require('./routes/acceptroute'))
app.use('/api/deleterequest',require('./routes/deleteroute'))
app.use('/api/comments',require('./routes/commentroute'))
app.use('/api/getcomments',require('./routes/commentroute'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
