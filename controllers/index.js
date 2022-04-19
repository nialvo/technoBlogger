const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//send urls with "api" to api routes folder, everything else to homeRoutes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
