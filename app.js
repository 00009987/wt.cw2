const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// setting template engine
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
