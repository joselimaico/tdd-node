const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const {posts} = require('./endpoints');
const {authenticate} = require('./middlewares');
const app = express();
const port = 3000;

app.use(parser.urlencoded({extended:true}));

app.use(parser.json());

const postsHandlers = posts({axios})
// app.get('/', postsHandlers.get);

app.post('/',authenticate,postsHandlers.post);

// app.put('/:id',postsHandlers.put);

// app.delete('/:id',postsHandlers.delete);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

module.exports = app;