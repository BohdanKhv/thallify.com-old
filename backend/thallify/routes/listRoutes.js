const express = require('express');
const router = express.Router();
const {
    createList,
    getUserLists,
} = require('../controllers/listControllers');


router
    .get('/spotify/:id', getUserLists)
    .post('/', createList);


module.exports = router;