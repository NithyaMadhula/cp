export const weeklySales = {
  renderChartData: data => {
    let labelsXAxis = [];
    let datasetYaxis = [];

    data.forEach(data => {
      let weekSales;
      if (data.currWeekSales) {
        weekSales = data.currWeekSales;
      } else {
        weekSales = 0;
      }

      labelsXAxis.push(`$${data.ticketPrice}`);
      datasetYaxis.push(weekSales);
    });

    const chartData = {
      labels: labelsXAxis,
      datasets: [
        {
          label: 'Prices in USD',
          borderColor: ['rgba(27, 157, 219,0.8)'],
          backgroundColor: ['rgba(27, 157, 219,0.1)'],
          hoverBackgroundColor: ['rgba(27, 157, 219,1)'],
          pointBackgroundColor: [
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)',
            'rgba(27, 157, 219,1)'
          ],
          data: datasetYaxis
        }
      ]
    };

    return chartData;
  },
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
  }
};
