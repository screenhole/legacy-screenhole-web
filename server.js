const express = require('express')
const app = express()
const router = express.Router()

app.use(express.static(__dirname + '/dist'))

function appendToHead(req, res, next, content){
    var write = res.write;

    res.write = function (chunk) {
      if (~res.getHeader('Content-Type').indexOf('text/html')) {
        chunk instanceof Buffer && (chunk = chunk.toString());
        chunk = chunk.replace(/(<\/head>)/, content + "\n\n$1");
        res.setHeader('Content-Length', chunk.length);
      }
      write.apply(this, arguments);
    };

    next();
}

router.get('/:username/~:shot_id', function (req, res, next) {
    const tags = '<!--' + req.params.username + '-->'

    appendToHead(req, res, next, tags)
})

router.get('*', (req, res) => {
    res.sendFile('200.html', { root: 'dist' });
})

app.use(router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Node app is running on port', PORT)
})
