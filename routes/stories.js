const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// Display public stories
router.get('/', ensureAuth, async(req, res) => {

    try {

        const stories = await Story.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean()

        res.render('stories/index', { stories })
        
    } catch (err) {
        
        console.log(err)
        res.render('error/500')

    }
})

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