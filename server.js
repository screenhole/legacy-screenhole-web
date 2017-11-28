const axios = require('axios')
const express = require('express')
const app = express()
const router = express.Router()

app.use(express.static(__dirname + '/dist'))

// get API baseURL from env
axios.defaults.baseURL = process.env.API_BASE ? process.env.API_BASE : 'https://api.screenhole.net';
console.log("axios.defaults.baseURL", axios.defaults.baseURL)

function appendToHead(res, content){
    if (res.headerSent) {
        return;
    }

    var write = res.write;

    res.write = function (chunk) {
        if (~res.getHeader('Content-Type').indexOf('text/html')) {
            chunk instanceof Buffer && (chunk = chunk.toString());
            chunk = chunk.replace(/(<\/head>)/, content + "\n\n$1");
            res.setHeader('Content-Length', chunk.length);
        }

        write.apply(this, arguments);
    };
}

function buildTags(metas) {
    var tags = '';

    for (var i in metas) {
        tags += '<meta name="' + metas[i]['name'] + '" property="' + metas[i]['name'] + '" content="' + metas[i]['content'] + '">\n';
    }

    return tags;
}

/*
router.get('/:username/~:shot_id', function (req, res, next) {
    // have to bail if headers already sent somehow
    if (res.headerSent) {
        return next();
    }

    const url = 'https://' + req.get('host') + req.originalUrl

    axios.get('/shots/' + req.params.shot_id)
    .then(function(response) {
        const image = response.data.shot.image_public_url.replace('s3.amazonaws.com', 'accelerator.net')
        const description = 'Grab by ' + req.params.username + ' in screenhole'

        const tags = buildTags([
            // twitter
            { name: 'twitter:card', content: 'summary_large_card' },
            { name: 'twitter:image', content: image + ';background(dominant)/1200x630,contain.jpeg' },
            { name: 'twitter:description', content: description },

            // facebook open graph
            { name: 'og:description', content: description },
            { name: 'og:image', content: image + ';background(dominant)/1200x630,contain.jpeg' },
            { name: 'og:image:width', content: '1200' },
            { name: 'og:image:height', content: '630' },
            { name: 'og:url', content: url }
        ])

        appendToHead(res, tags)
    }).then(function(){
        next()
    }).catch(function(res){
        console.log('api error', res.response.status, res.response.statusText)
        next()
    });
})
*/

router.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
})

app.use(router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Node app is running on port', PORT)
})
