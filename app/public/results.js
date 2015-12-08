angular.module('myApp')
    .controller('ResultsCtrl', function ($rootScope, $scope, $http, dataService, FileUploader) {

        var width = 960,
            height = 500;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

        function createAlbumVoteChart(start) {
            var promise = dataService.albumVotesGet();

            promise.then(function (response) {

                var data = [];

                response.features.forEach(function (v) {
                    data.push(v.properties)
                });

                $(".chart").empty();

                y.domain([0, d3.max(data, function (d) {
                    return d.votes;
                })]);

                var barWidth = width / data.length;

                var bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g");

                if (start == null){
                    bar.attr("transform", function (d, i) {
                        return "translate(" + i * barWidth + ",0)";
                    });
                } else {
                    bar.attr("transform", "translate(" + start * barWidth + ",0)");
                }


                bar.transition()
                    .delay(function (d, i) {
                        return i * 150;
                    })
                    .attr("transform", function (d, i) {
                        return "translate(" + i * barWidth + ",0)";
                    });

                bar.append("rect")
                    .attr("y", function (d) {
                        return y(d.votes);
                    })
                    .attr("height", function (d) {
                        return height - y(d.votes);
                    })
                    .attr("width", barWidth - 1);


                bar.on('click', function (e, i) {

                    var rect = chart.selectAll("g");

                    rect.transition().attr("transform", "translate(" + i * barWidth + ",0)");

                    setTimeout(function () {
                            createSongVoteChart(e.album, i * barWidth)
                        }, 200
                    )
                });

                bar.append("text")
                    .attr("x", barWidth / 2)
                    .attr("y", function (d) {
                        return y(d.votes) + 3;
                    })
                    .attr("dy", "1.75em")
                    .text(function (d) {
                        return d.votes;
                    });

            })
        }

        createAlbumVoteChart(null);

        function createSongVoteChart(album, start) {

            var promise = dataService.songVotesGet();

            promise.then(function (response) {

                var dataArr = [];

                response.features.forEach(function (v) {
                    dataArr.push(v.properties)
                })

                var data = dataArr.filter(function (v) {
                    return v.album == album;
                })

                $(".chart").empty();

                y.domain([0, d3.max(data, function (d) {
                    return d.votes;
                })]);

                var barWidth = width / data.length;

                var bar = chart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", function (d, i) {
                        return "translate(" + start + ",0)";
                    })


                bar.transition()
                    .delay(function (d, i) {
                        return i * 150;
                    })
                    .attr("transform", function (d, i) {
                        return "translate(" + i * barWidth + ",0)";
                    })

                bar.append("rect")
                    .attr("y", function (d) {
                    return y(d.votes);
                    })
                    .attr("height", function (d) {
                        return height - y(d.votes);
                    })
                    .attr("width", barWidth - 1);


                bar.append("text")
                    .attr("x", barWidth / 2)
                    .attr("y", function (d) {
                        return y(d.votes) + 3;
                    })
                    .attr("dy", "1.75em")
                    .text(function (d) {
                        return d.song;
                    });

                bar.on('click',function(d,i){

                    setTimeout(function () {
                        createAlbumVoteChart(i);
                    }, 200)
                })

            })


        }

    });