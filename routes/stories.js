const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// Show add page
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// Proccessing add stories form
router.post('/', ensureAuth, async (req, res) => {

    try {
        
        req.body.user = req.user.id

        await Story.create(req.body)

        res.redirect('/dashboard')

    } catch (err) {
        
        console.err(err)
        res.render('error/500')
    }
})

module.exports = router