var express = require('express');
var router = express.Router();
var pg = require('../pg');

router.get('/song-votes', function(req, res, next) {
    console.log('Holla');


    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "song_title,album_title,date_released, artist,votes";

    var sql = pg.featureCollectionSQL("view_song_votes", nonGeomColumns);
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

router.get('/all-songs', function(req, res, next) {
    console.log('Holla');


    // All columns in table with the exception of the geometry column
    var nonGeomColumns = "song_title,album_title,date_released, artist";

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
    var nonGeomColumns = "title, date_released,duration";

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



