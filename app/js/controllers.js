'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('HomepageController', [function() {

}]);

controllers.controller('BarChartController', ['$scope', function ($scope) {
  // The controller for barChart.html
  //var input = $scope.input, input_copy = $scope.input_copy || "";

  // Init chart
  renderVerticalBarChart(undefined, undefined, undefined, undefined, []);

  $scope.updateChart = function () {
    var input = $scope.input;
    var inputDataObj = processData(input);
    console.log(inputDataObj);

    renderVerticalBarChart(undefined, undefined, undefined, undefined, inputDataObj);
  };

  function processData (str) {
    var i, j, data_obj = {}, totalCount = 0;
    var inputDataObj = [];

    totalCount = str.length;
    for (i = 0; i < str.length; i += 1) {
      if (!data_obj[str[i]]) {
        data_obj[str[i]] = 1;
        inputDataObj.push({
          name: str[i],
          value: 1/totalCount
        });
      } else {
        data_obj[str[i]] += 1;
        for (j = 0; j < inputDataObj.length; j += 1) {
          if (inputDataObj[j].name == str[i]) {
            inputDataObj[j].value += 1/totalCount;
          }
        }
      }
    }

    return inputDataObj.sort(function (a, b) { return b.value - a.value; });
  }

  //renderHorizontalBarChart();
  


  function renderHorizontalBarChart (_width_, _barHeight_, _dist_, _data_tsv_location_) {
    var width = _width_ || 500,
        barHeight = _barHeight_ || 20,
        dist = _dist_ || 1,
        data_tsv_location = _data_tsv_location_ || "../../app/lib/data.tsv",

        x = d3.scale.linear()
              .range([0, width]),
        chart = d3.select(".chart.horizontal")
                  .attr("width", width);

    d3.tsv(data_tsv_location, type, function (err, data) {
      var bar;
      x.domain([0, d3.max(data, function (d) { return d.value; })]);

      chart.attr("height", barHeight * data.length),

      bar = chart.selectAll("g")
                  .data(data)
                  .enter().append("g")
                  .attr("transform", function (d, i) {
                    return "translate(0, " + i * barHeight + ")";
                  });

      bar.append("rect")
          .attr("width", function (d) { return x(d.value); })
          .attr("height", barHeight - dist)
          .attr("class", "bar");

      bar.append("text")
          .attr("x", function (d) {
            return x(d.value) - 3;
          })
          .attr("y", (barHeight - dist) / 2)
          .attr("dy", ".35em")
          .text(function (d) {
            return d.value;
          });
    });
  }
  
  function renderVerticalBarChart (_width, _height, _dist, _data_tsv_location, _data) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = _width - margin.left - margin.right || 900 - margin.left - margin.right,
        height = _height - margin.top - margin.bottom|| 400 - margin.top - margin.bottom,
        dist = _dist || 1,
        data_tsv_location = _data_tsv_location || "../../app/lib/data.tsv",
        x = d3.scale.ordinal()
              .rangeRoundBands([0, width], 0.1),
        y = d3.scale.linear()
              .range([height, 0]),
        
        xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom"),
        yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .ticks(10, "%");

        d3.select(".chart.vertical").selectAll("g").remove();
        var chart = d3.select(".chart.vertical")
                  .attr("height", height + margin.top + margin.bottom)
                  .attr("width", width + margin.left + margin.right)
                .append("g")
                  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    
    console.log(_data);
    if (document.getElementsByClassName("chart vertical")) {
     // document.getElementsByClassName("chart vertical")[0].parentNode.removeChild(document.getElementsByClassName("chart vertical")[0]);
    }

    // d3.tsv(data_tsv_location, type, function (err, data) {
    //   var bar, barWidth;
    //   x.domain(data.map(function (d) { return d.name; }));
    //   y.domain([0, d3.max(data, function (d) { return d.value; })]);

    //   chart.append("g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate(0, " + height + ")")
    //         .call(xAxis);

    //   chart.append("g")
    //         .attr("class", "y axis")
    //         .call(yAxis)
    //       .append("text")
    //         .attr("transform", "rotate(-90)")
    //         .attr("y", 6)
    //         .attr("dy", "0.71em")
    //         .style("text-anchor", "end")
    //         .text("Frenquency");

    //   chart.selectAll(".bar")
    //         .data(data)
    //         .enter()
    //       .append("rect")
    //         .attr("class", "bar")
    //         .attr("x", function (d) { return x(d.name); })
    //         .attr("y", function (d) { return y(d.value); })
    //         .attr("width", x.rangeBand())
    //         .attr("height", function (d) { return height - y(d.value); });
    // });


    var bar, barWidth, data = _data || [];
    
      x.domain(data.map(function (d) { return d.name; }));
      y.domain([0, d3.max(data, function (d) { return d.value; })]);

      
      chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis);

      chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "translate(70, -20)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Frenquency");

      chart.selectAll(".bar")
            .data(data)
            .enter()
          .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.name); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x.rangeBand())
            .attr("height", function (d) { return height - y(d.value); });

  }

  function type (d) {
    d.value = +d.value; // Trick to convet string number to number
    return d;
  }
        
}]);