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
var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
app.use(cors());

const db = require('./modules/db.js');

db.connect();

const authMiddleware = (req, res, next) => {
    var token = req.get('authorization');
	if (!token) {
		res.status(401).send('A token is mandatory');
		return;
	}
	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			res.status(401).send('Unable to parse token');
			return;
		}
		if (decoded.exp <= Date.now()) {
			res.status(401).send('Token has expired');
			return;
		}
        req.token = decoded;
        next();
    });
}

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
// app.use('/', indexRouter);
app.use('/api/login', loginRouter);
app.use(authMiddleware)
app.use('/api/users', usersRouter);
app.use('/api/plannings', planningsRouter);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'));
  });
// error handler

module.exports = app;
