const express = require('express');
const router = express.Router();
const pvpCtrl = require('../../controllers/pvp');


const returnRouter = function(io) {
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });
    router.post('/message', function (req, res) {
        console.log('Post request hit.')
        io.sockets.emit('display text', req);
    })
    return router;
}


/*---------- Public Routes ----------*/
router.put('/initiate', pvpCtrl.initiate);

/*---------- Protected Routes ----------*/

module.exports = returnRouter;