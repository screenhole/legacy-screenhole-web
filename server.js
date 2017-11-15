const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 8080))

app.use(express.static(__dirname + '/dist'))

app.get('*', (req, res) => {
    res.sendFile('200.html', { root: 'dist' });
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})
