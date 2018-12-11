const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const planningsRouter = require('./routes/plannings');
const cors = require('cors')
const app = express();
app.use(cors());

const db = require('./modules/db.js');

db.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(
//     sassMiddleware({
//       src: path.join(serverRoot, 'public'),
//       dest: path.join(serverRoot, 'public'),
//       indentedSyntax: true, // true = .sass and false = .scss
//       sourceMap: true
//     })
// );
app.use(express.static(path.join(__dirname, '../dist/client')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/plannings', planningsRouter);
app.use('/api/login', loginRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  });
// error handler
/*app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/

module.exports = app;
