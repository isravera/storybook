const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

require('./config/passport')(passport)

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// View Engine: what will be responsable to render our pages
app.engine('.hbs', engine({ defaultLayour: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// Session Middleware
app.use(session({
    secret: 'koltuz',
    resave: false,
    saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder: here we can use our system files
app.use(express.static(path.join(__dirname + '/public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))