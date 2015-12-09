var express = require('express');
var router = express.Router();
var pg = require('../pg');

router.post('/vote', function(req,res,next){

    var sql = 'SELECT * FROM vote_song($,$)';

    var preparedStatement = {
        name: "vote",
        text: sql,
        values:[req.body.song, req.body.round]
    };

    pg.queryDeferred(preparedStatement)
        .then(function(result){
            res.send(JSON.stringify(result[0].response));
        })
        .catch(function(err){
            next(err);
        });

})

router.get('/song-votes', function(req, res, next) {

    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "song,album,votes,round";

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
    console.log('Holla');


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
    console.log('Holla');


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
    console.log('Holla');


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



