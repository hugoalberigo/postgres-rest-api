const express = require('express');
const webRouter = require('./routes/webRouter.js');

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(webRouter);

// Error Handling Middleware
// 404 Handler
app.use(function(req, res, next) {
    res.status(404).json({
        status: 'Fail',
        errors: 'Page not found!'
    })
})

// Server Error Handler
app.use( (err, req, res, next) => {
    console.error(err)
    res.status(500).send('Sorry, something broke!')
})

app.listen(port, () => console.log(`Server berhasil dijalankan di http://localhost:${port}`));