const router = require('express').Router();
const userRoutes = require('./userRoutes');
const createRoutes = require('./createRoutes');
const editRoutes = require('./editRoutes');
const deleteRoutes = require('./deleteRoutes');

router.use('/user', userRoutes);
router.use('/create', createRoutes);
router.use('/edit', editRoutes);
router.use('/delete', deleteRoutes);

module.exports = router;