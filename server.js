const express = require('express');

const app = express();

app.use(express.static('./dist/posts-app'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/posts-app/' }
    );
});

app.listen(process.env.PORT || 8080);