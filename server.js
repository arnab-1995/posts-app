const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static('./dist/posts-app'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/posts-app/' }
    );
});

app.listen(process.env.PORT || 8080);