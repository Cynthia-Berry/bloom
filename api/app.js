require('dotenv').config();
require('./server/middlewares/config/database');

const express = require('express');
const path = require('path'), cors = require('cors'), morgan = require('morgan');
const createError = require('http-errors');


global.appRoot = path.resolve(__dirname);
global.appName = 'Bloom Application';
global.version = 'v1';
global.patchVersion = 'v1.0.0';

const app = express();
const port = process.env.PORT || 5000;

const indexRouter = require('./server/routes/index.route');
const authRouter = require('./server/routes/auth.route');
const userRouter = require('./server/routes/user.route');


app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');
// setting the logs
app.use(morgan('dev'));
// set the req body (parses the body that comes with post/put requests )
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'server/public')));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// set headers (handling cors error)
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Accept", "application/json");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

/**** ROUTES ****/
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


app.listen(port, () =>
  console.log(`[${appName}]: Node Development Server is listening on localhost:${port}, open your browser on: http://localhost:${port}/`)
);


app.use((req, res, next) => {
  next(createError(404, 'This URL does not exist!'));
});
