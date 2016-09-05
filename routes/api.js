var express = require('express');
var router = express.Router();
var pg = require('../pg');
var Q = require('q');
var getmac = require('getmac');

router.post('/songs', function(req,res,next){
    console.log('post to /songs');

    // get mac address
    getmac.getMac(function(err, macAddress){
        if (err)  throw err;
        var sql = "SELECT * FROM ___yeezy_vote_song($1,$2,$3)";

        var preparedStatement = {
            name: "vote",
            text: sql,
            values:[req.body.song, 1, macAddress]
        };

        pg.queryDeferred(preparedStatement)
            .then(function(result){
                res.status(200).json(result[0].vote_song);
            })
            .catch(function(err){
                res.status(400).json({ errCode: 400, status: "ERROR", message: err.message });
            });
    });

});

router.get('/song-votes', function(req, res, next) {
    console.log('get song votes');


    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "song,song_id,album,votes,round";

    var sql = pg.featureCollectionSQL("round_song_votes", nonGeomColumns);
    var preparedStatement = {
        name: "get_all_song_votes",
        text: sql,
        values:[]};

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.status(200).json(result[0].response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/album-votes', function(req, res, next) {
    console.log('get album votes');


    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "album,votes,round";

    var sql = pg.featureCollectionSQL("round_album_votes", nonGeomColumns);
    var preparedStatement = {
        name: "get_all_album_votes",
        text: sql,
        values:[]};

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.status(200).json(result[0].response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/songs', function(req, res, next) {
    console.log('get all songs');


    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "id,song_title,album_title,date_released, artist";

    var sql = pg.featureCollectionSQL("view_songs", nonGeomColumns);
    var preparedStatement = {
        name: "get_all_songs",
        text: sql,
        values:[]};

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.status(200).json(result[0].response);
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/all-albums', function(req, res, next) {
    console.log('get all albums');


    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "id,title, date_released,duration";

    var sql = pg.featureCollectionSQL("album", nonGeomColumns);
    var preparedStatement = {
        name: "get_all_albums",
        text: sql,
        values:[]};

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.status(200).json(result[0].response);
        })
        .catch(function(err){
            next(err);
        });


});

module.exports = router;



