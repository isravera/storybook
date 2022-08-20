const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

require('./config/passport')(passport)

connectDB()

const app = express()

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars helper
const { formatDate, getStatusBadge, truncate } = require('./helpers/hbs')

// View Engine: what will be responsable to render our pages
app.engine('.hbs', engine({ helpers: {
    formatDate, 
    getStatusBadge,
    truncate
}, 
defaultLayour: 'main', extname: '.hbs' }))

app.set('view engine', '.hbs')
app.set('views', './views')

// Session Middleware
app.use(session({
    secret: 'koltuz',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder: here we can use our system files
app.use(express.static(path.join(__dirname + '/public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))