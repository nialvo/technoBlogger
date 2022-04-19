const router = require('express').Router();
const userRoutes = require('./userRoutes');
const createRoutes = require('./createRoutes');
const editRoutes = require('./createRoutes');

router.use('/user', userRoutes);
router.use('/create', createRoutes);
router.use('/edit', editRoutes);

module.exports = router;