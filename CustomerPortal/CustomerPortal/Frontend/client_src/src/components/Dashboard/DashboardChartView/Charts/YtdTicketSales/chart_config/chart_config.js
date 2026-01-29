export const ytdTicketSales = {
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          // Add dollar sign and comma to Y axis label
          ticks: {
            beginAtZero: true,
            userCallback: function(value, index, values) {
              // Convert the number to a string and split the string every 3 charaters from the end
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return '$' + value;
            }
          }
        }
      ]
    },
    tooltips: {
      // Add dollar sign and comma to tooltips for Y axis
      callbacks: {
        label: function(tooltipItems, data) {
          var value = tooltipItems.yLabel.toString();
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);
          value = value.join(',');
          return '$' + value;
        }
      }
    }
  },
  renderChartData: data => {
    let labelsXAxis = [];
    let datasetYaxis = [];

    data.forEach(data => {
      labelsXAxis.push(`$${data.ticketPrice}`);
      datasetYaxis.push(data.ytdSales);
    });

    const chartData = {
      labels: labelsXAxis,
      datasets: [
        {
          label: '',
          backgroundColor: 'rgb(0,88,180)',
          data: datasetYaxis
        }
      ]
    };

    return chartData;
  }
};
