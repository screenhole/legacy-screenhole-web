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

function buildTags(metas) {
    var tags = '';

    for (var i in metas) {
        tags += '<meta name="' + metas[i]['name'] + '" property="' + metas[i]['name'] + '" content="' + metas[i]['content'] + '">\n';
    }

    return tags;
}

router.get('/:username/~:shot_id', function (req, res, next) {
    // const tags = '<!--' + req.params.username + '-->'

    const tags = buildTags([
        { name: 'twitter:card', content: 'summary_large_card' },
        { name: 'twitter:image', content: 'https://screenhole.s3.amazonaws.com/qKkt6Y/1510765449.png' },
        { name: 'og:image', content: 'https://screenhole.s3.amazonaws.com/qKkt6Y/1510765449.png' },
    ])

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
