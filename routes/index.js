const express = require('express');
const path = require('path');

const router = express.Router({ mergeParams: true });
router.get('/', (req, res) => {
    const data = {};
    data.user = req.user;
    data.NODE_ENV = process.env.NODE_ENV;
    res.render('home', { data });
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;