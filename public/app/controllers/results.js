angular.module('myApp')
    .controller('ResultsCtrl', function ($rootScope, $scope, $http, dataService, $window) {

        //var width = $window.outerWidth * .9;
        //var height =$window.outerHeight * .6;
        //
        //var selectedAlbum = '';
        //var songStartXAxis;
        //
        //var isSong = false;
        //
        //var x = d3.scale.ordinal()
        //    .rangeRoundBands([0, width], .1);
        //
        //var y = d3.scale.linear()
        //    .range([height, 0]);
        //
        //var chart = d3.select(".chart")
        //    .attr("width", width)
        //    .attr("height", height);
        //
        //angular.element($window).bind('resize', function () {
        //    width = $window.outerWidth * .9;
        //    height = $window.outerHeight * .6;
        //
        //    if(!isSong){
        //        resizeAlbumVoteChart(albumVoteData);
        //    } else {
        //        resizeSongVoteChart(songStartXAxis,selectedAlbum,songData);
        //    }
        //
        //    //createAlbumVoteChart(null);
        //});
        //
        //var albumVoteData = [];
        //var songData = [];
        //
        //function resizeAlbumVoteChart(data) {
        //
        //    isSong = false;
        //
        //    $(".chart").empty();
        //
        //    var chart = d3.select(".chart")
        //        .attr("width", width)
        //        .attr("height", height);
        //
        //    y.domain([0, d3.max(data, function (d) {
        //        return d.votes;
        //    })]);
        //
        //    var barWidth = width / data.length;
        //
        //    var bar = chart.selectAll("g")
        //        .data(data)
        //        .enter().append("g");
        //
        //        bar.attr("transform", function (d, i) {
        //            return "translate(" + i * barWidth + ",0)";
        //        });
        //
        //    bar.transition()
        //        .delay(function (d, i) {
        //            return i * 150;
        //        })
        //        .attr("transform", function (d, i) {
        //            return "translate(" + i * barWidth + ",0)";
        //        });
        //
        //    bar.append("rect")
        //        .attr("y", function (d) {
        //            return y(d.votes);
        //        })
        //        .attr("height", function (d) {
        //            return height - y(d.votes);
        //        })
        //        .attr("width", barWidth - 1);
        //
        //
        //    bar.on('click', function (e, i) {
        //
        //        selectedAlbum = e.album;
        //
        //        var rect = chart.selectAll("g");
        //
        //        rect.transition().attr("transform", "translate(" + i * barWidth + ",0)");
        //
        //        setTimeout(function () {
        //                createSongVoteChart(e.album, i * barWidth, false)
        //            }, 200
        //        )
        //    });
        //
        //    bar.append("text")
        //        .attr("x", barWidth / 2)
        //        .attr("y", function (d) {
        //            return y(d.votes) + 3;
        //        })
        //        .attr("dy", "1.75em")
        //        .text(function (d) {
        //            return d.votes;
        //        });
        //}
        //
        //function resizeSongVoteChart (start,album,dataArr) {
        //
        //    isSong = true;
        //
        //    $(".chart").empty();
        //
        //    var chart = d3.select(".chart")
        //        .attr("width", width)
        //        .attr("height", height);
        //
        //    var data = dataArr.filter(function (v) {
        //        return v.album == album;
        //    });
        //
        //    y.domain([0, d3.max(data, function (d) {
        //        return d.votes;
        //    })]);
        //
        //    var barWidth = width / data.length;
        //
        //    var bar = chart.selectAll("g")
        //        .data(data)
        //        .enter().append("g")
        //        .attr("transform", function (d, i) {
        //            return "translate(" + i * barWidth + ",0)";
        //        });
        //
        //        bar.transition()
        //            .delay(function (d, i) {
        //                return i * 150;
        //            })
        //            .attr("transform", function (d, i) {
        //                return "translate(" + i * barWidth + ",0)";
        //            });
        //
        //    bar.append("rect")
        //        .attr("y", function (d) {
        //            return y(d.votes);
        //        })
        //        .attr("height", function (d) {
        //            return height - y(d.votes);
        //        })
        //        .attr("width", barWidth - 1);
        //
        //
        //    bar.append("text")
        //        .attr("x", barWidth / 2)
        //        .attr("y", function (d) {
        //            return y(d.votes) + 3;
        //        })
        //        .attr("dy", "1.75em")
        //        .text(function (d) {
        //            return d.song;
        //        });
        //
        //    //bar.on('click',function(d,i){
        //    //    //vote using the id of the song and the first round
        //    //    var promise = dataService.vote(d.song_id, 1);
        //    //
        //    //    promise.then(function(response) {
        //    //
        //    //        console.log(response);
        //    //
        //    //        createSongVoteChart(album, start, true);
        //    //
        //    //    });
        //    //
        //    //})
        //
        //}
        //
        //function createAlbumVoteChart(start) {
        //
        //    isSong = false;
        //
        //    var promise = dataService.albumVotesGet();
        //
        //    promise.then(function (response) {
        //
        //        var data = [];
        //
        //        response.features.forEach(function (v) {
        //            data.push(v.properties);
        //            albumVoteData.push(v.properties);
        //        });
        //
        //        $(".chart").empty();
        //
        //        y.domain([0, d3.max(data, function (d) {
        //            return d.votes;
        //        })]);
        //
        //        var barWidth = width / data.length;
        //
        //        var bar = chart.selectAll("g")
        //            .data(data)
        //            .enter().append("g");
        //
        //        if (start == null){
        //            bar.attr("transform", function (d, i) {
        //                return "translate(" + i * barWidth + ",0)";
        //            });
        //        } else {
        //            bar.attr("transform", "translate(" + start * barWidth + ",0)");
        //        }
        //
        //
        //        bar.transition()
        //            .delay(function (d, i) {
        //                return i * 150;
        //            })
        //            .attr("transform", function (d, i) {
        //                return "translate(" + i * barWidth + ",0)";
        //            });
        //
        //        bar.append("rect")
        //            .attr("y", function (d) {
        //                return y(d.votes);
        //            })
        //            .attr("height", function (d) {
        //                return height - y(d.votes);
        //            })
        //            .attr("width", barWidth - 1);
        //
        //
        //        bar.on('click', function (e, i) {
        //
        //            selectedAlbum = e.album;
        //
        //            songStartXAxis = i * barWidth;
        //
        //            var rect = chart.selectAll("g");
        //
        //            rect.transition().attr("transform", "translate(" + i * barWidth + ",0)");
        //
        //            setTimeout(function () {
        //                    createSongVoteChart(e.album, i * barWidth, false)
        //                }, 200
        //            )
        //        });
        //
        //        bar.append("text")
        //            .attr("x", barWidth / 2)
        //            .attr("y", function (d) {
        //                return y(d.votes) + 3;
        //            })
        //            .attr("dy", "1.75em")
        //            .text(function (d) {
        //                return d.album;
        //            });
        //
        //    })
        //}
        //
        //createAlbumVoteChart(null);
        //
        //function createSongVoteChart(album, start, redraw) {
        //
        //    isSong = true;
        //
        //    var promise = dataService.songVotesGet();
        //
        //    promise.then(function (response) {
        //
        //        var dataArr = [];
        //
        //        response.features.forEach(function (v) {
        //            dataArr.push(v.properties);
        //            songData.push(v.properties);
        //        });
        //
        //        var data = dataArr.filter(function (v) {
        //            return v.album == album;
        //        });
        //
        //        $(".chart").empty();
        //
        //        y.domain([0, d3.max(data, function (d) {
        //            return d.votes;
        //        })]);
        //
        //        var barWidth = width / data.length;
        //
        //        var bar = chart.selectAll("g")
        //            .data(data)
        //            .enter().append("g")
        //            .attr("transform", function (d, i) {
        //                return "translate(" + start + ",0)";
        //            });
        //
        //        //if drawing chart for the first time
        //        if (!redraw) {
        //
        //            bar.transition()
        //                .delay(function (d, i) {
        //                    return i * 150;
        //                })
        //                .attr("transform", function (d, i) {
        //                return "translate(" + i * barWidth + ",0)";
        //            });
        //        }
        //        else {
        //            bar.attr("transform", function (d, i) {
        //                return "translate(" + i * barWidth + ",0)";
        //            });
        //        }
        //
        //
        //        bar.append("rect")
        //            .attr("y", function (d) {
        //                return y(d.votes);
        //            })
        //            .attr("height", function (d) {
        //                return height - y(d.votes);
        //            })
        //            .attr("width", barWidth - 1);
        //
        //        bar.append("text")
        //            .attr("text-anchor", "middle")
        //            .attr("x", barWidth / 2)
        //            .attr("y", function (d) {
        //                return y(d.votes) + 3;
        //            })
        //            .attr("dy", "1.75em")
        //            .text(function (d) {
        //                return d.song;
        //            });
        //
        //        bar.on('click',function(d,i){
        //            //vote using the id of the song and the first round
        //            //var promise = dataService.vote(d.song_id, 1);
        //            //
        //            //promise.then(function(response) {
        //            //    console.log(response);
        //            //
        //            //    createSongVoteChart(album, start, true);
        //            //
        //            //});
        //
        //            //setTimeout(function () {
        //            //    createAlbumVoteChart(i);
        //            //}, 200)
        //        })
        //
        //    })
        //
        //
        //}

    });