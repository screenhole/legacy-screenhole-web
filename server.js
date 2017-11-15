const express = require('express')
const app = express()
const router = express.Router()

app.use(express.static(__dirname + '/dist'))

// router.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// })

router.get('/:username/~:shot_id', function (req, res, next) {
    console.log(req.params['username'])
    // pass through
    next()
})

router.get('*', (req, res) => {
    res.sendFile('200.html', { root: 'dist' });
})

app.use(router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Node app is running on port', PORT)
})
