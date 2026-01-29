export const themesYTD = {
  renderChartData: data => {
    let labelsXAxis = [];
    let datasetYaxis = [];

    data.forEach(data => {
      let popIndex = data.averageIndex;
      if (data.averageIndex) {
        popIndex = data.averageIndex;
      } else {
        popIndex = 0;
      }

      labelsXAxis.push(`${data.group}`);
      datasetYaxis.push(popIndex);
    });

    const chartData = {
      labels: labelsXAxis,
      datasets: [
        {
          label: 'Prices in USD',
          backgroundColor: [
            'rgba(12, 81, 161,0.8)',
            'rgba(254, 221, 0,0.8)',
            'rgba(141, 200, 232,0.8)',
            'rgba(255, 163, 0,0.8)',
            'rgba(250, 220, 92,0.8)',
            'rgba(102, 102, 102,0.8)',
            'rgba(27, 157, 219,0.8)',
            'rgba(0, 76, 151,0.8)'
          ],
          hoverBackgroundColor: [
            'rgba(12, 81, 161,1)',
            'rgba(254, 221, 0,1)',
            'rgba(141, 200, 232,1)',
            'rgba(255, 163, 0,1)',
            'rgba(250, 220, 92,1)',
            'rgba(102, 102, 102,1)',
            'rgba(27, 157, 219,1)',
            'rgba(0, 76, 151,1)'
          ],
          data: datasetYaxis
        }
      ]
    };

    return chartData;
  }
  //   options: {
  //     scales: {
  //       xAxes: [
  //         {
  //           gridLines: {
  //             display: false
  //           }
  //         }
  //       ],
  //       yAxes: [
  //         {
  //           gridLines: {
  //             display: false
  //           },
  //           // Add dollar sign and comma to Y axis label
  //           ticks: {
  //             beginAtZero: true,
  //             userCallback: function(value, index, values) {
  //               // Convert the number to a string and split the string every 3 charaters from the end
  //               value = value.toString();
  //               value = value.split(/(?=(?:...)*$)/);
  //               value = value.join(',');
  //               return '$' + value;
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     tooltips: {
  //       // Add dollar sign and comma to tooltips for Y axis
  //       callbacks: {
  //         label: function(tooltipItems, data) {
  //           var value = tooltipItems.yLabel.toString();
  //           value = value.toString();
  //           value = value.split(/(?=(?:...)*$)/);
  //           value = value.join(',');
  //           return '$' + value;
  //         }
  //       }
  //     }
  //   }
};
