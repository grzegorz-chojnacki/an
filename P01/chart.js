// let ctx = document.getElementById("canvas");
// let data = {
//   labels: gui.getPoints().map(point => point.x),
//   datasets: [
//     {
//       label: "",
//       function: function(x) {
//         return -8140.603359313304*x*x*x*x + 49070006.55706307 * x *x*x -98786264948.18567*x*x + 66811089360554.695*x -787592474341894
//       },
//       borderColor: "#9966ff",
//       data: [],
//       fill: false
//     }

//   ]
// };

// Chart.pluginService.register({
//   beforeInit: function(chart) {
//     let data = chart.config.data;
//     for (let i = 0; i < data.datasets.length; i++) {
//       for (let j = 0; j < data.labels.length; j++) {
//         let fct = data.datasets[i].function,
//           x = data.labels[j],
//           y = fct(x);
//         data.datasets[i].data.push(y);
//       }
//     }
//   }
// });

// let myBarChart = new Chart(ctx, {
//   type: 'line',
//   data: data,
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: false
//         }
//       }]
//     }
//   }
// });
