//packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const xphb = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv');

//initialize express and handlebars
const app = express();
const PORT = process.env.PORT || 3001;
const hb = xphb.create({});

//models
require('./models/User.js');
require('./models/Post.js');
require('./models/Comment.js');


const sess = {
    secret: 'Secret',
    cookie: {
        maxAge: 5*60*60*1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//set express to use session login, handlebars, json parser, url parser, and public files as static
app.use(session(sess));
app.engine('handlebars', hb.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//set express to use /controllers/
app.use(routes);

//sync model to database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
