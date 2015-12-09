var express = require('express');
var router = express.Router();
var pg = require('../pg');

router.post('/all-songs', function(req,res,next){
    console.log('post to all-songs');

    var sql = "SELECT * FROM vote_song($1,$2)";

    var preparedStatement = {
        name: "vote",
        text: sql,
        values:[req.body.song, req.body.round]
    };


    pg.queryDeferred(preparedStatement)
        .then(function(result){

            res.send(JSON.stringify(result[0].vote_song));
        })
        .catch(function(err){
            next(err);
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
            res.send(JSON.stringify(result[0].response));
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
            res.send(JSON.stringify(result[0].response));
        })
        .catch(function(err){
            next(err);
        });


});

router.get('/all-songs', function(req, res, next) {
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
            res.send(JSON.stringify(result[0].response));
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
            res.send(JSON.stringify(result[0].response));
        })
        .catch(function(err){
            next(err);
        });


});

module.exports = router;



