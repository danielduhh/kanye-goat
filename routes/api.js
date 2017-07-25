var express = require('express');
var router = express.Router();
var pg = require('../pg');
var get_ip = require('ipware')().get_ip;
var db = pg.getDatabase();


router.post('/songs', function(req,res,next){
    console.log('post to /songs');

    var clientIp = get_ip(req).clientIp;

    // get mac address
    //getmac.getMac(function(err, macAddress){
    //    if (err)  throw err;
    var sql = "SELECT * FROM ___yeezy_vote_song($1,$2,$3)";

    db.many(sql, [req.body.song, 2, clientIp])
        .then(function(response){
            res.status(200).json({message: "success"});
        })
        .catch(function(err){
            res.status(400).json({ errCode: 400, status: "ERROR", message: err.message });
        });
    //});

});

router.get('/votes', function(req, res, next) {

    var sql = "SELECT * FROM song_votes";

    db.many(sql)
        .then(function(response){
            res.status(200).json(response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/votes/song', function(req, res, next) {

    var sql = "SELECT song,song_id,album,votes,round FROM round_song_votes";


    db.many(sql)
        .then(function(response){
            res.status(200).json(response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/votes/album', function(req, res, next) {

    var sql = "SELECT album,votes,round FROM round_album_votes";

    db.many(sql)
        .then(function(response){
            res.status(200).json(response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/songs', function(req, res, next) {

    var sql = 'SELECT * FROM view_songs';


    db.many(sql)
        .then(function(response){
            res.status(200).json(response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/albums', function(req, res, next) {

    var sql = 'SELECT id,title, date_released,duration FROM album';

    db.many(sql)
        .then(function(response){
            res.status(200).json(response);
        })
        .catch(function(err){
            next(err);
        });


});

module.exports = router;



