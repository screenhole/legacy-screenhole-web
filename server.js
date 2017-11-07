const express = require('express')
const app = express()

app.use(express.static('dist'))

app.use(require('prerender-node').set('prerenderToken', 'LUlYzknNOOMlXiS2sLFD'));

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/200.html'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
