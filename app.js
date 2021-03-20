const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// setting template engine
app.set('view engine', 'pug');

// routes
app.use('/', require('./routes/index'));
app.use('/compose', require('./routes/compose'));
app.use('/posts', require('./routes/posts'));
app.use('/about', require('./routes/about'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
