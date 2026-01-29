export const ytdPercentSales = {
  options: {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + ' (' + percentage + '%)';
        },
        title: function(tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    }
  },
  renderChartData: data => {
    let labelsXAxis = [];
    let datasetYaxis = [];

    data.forEach(data => {
      let percent = data.percentSalesYTD;
      if (data.percentSalesYTD) {
        let formatted = percent.replace(/\d+% ?/g, '');
        percent = parseInt(formatted);
      } else {
        percent = 0;
      }

      labelsXAxis.push(`$${data.ticketPrice}`);
      datasetYaxis.push(percent);
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
};
