var ctx = document.getElementById("canvas");
var data = {
  labels: [1980, 2017, 2018, 2019],
  datasets: [
    {
      label: "f(x) = x²",
      function: function(x) {
        return -8140.603359313304*x*x*x*x + 49070006.55706307 * x *x*x -98786264948.18567*x*x + 66811089360554.695*x -787592474341894
      },
      borderColor: "rgba(153, 102, 255, 1)",
      data: [],
      fill: false
    }

  ]
};

Chart.pluginService.register({
  beforeInit: function(chart) {
    var data = chart.config.data;
    for (var i = 0; i < data.datasets.length; i++) {
      for (var j = 0; j < data.labels.length; j++) {
        var fct = data.datasets[i].function,
          x = data.labels[j],
          y = fct(x);
        data.datasets[i].data.push(y);
      }
    }
  }
});

var myBarChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    }
  }
});
