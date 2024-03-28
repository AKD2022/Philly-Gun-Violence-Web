/* Age */
const age = document.getElementById('myChart2');
  new Chart(age, {
  type: 'pie',
  data: {
    labels: ['Younger than 18', '18-30', '31-45', 'Older than 45', 'Unknown'],
    datasets: [{
      label: '# of Gun Violence cases based on Age',
      data: [161, 746, 534, 202, 23],
      borderWidth: 1
    }]
  }
});

/* Race */
const race = document.getElementById('myChart');

  new Chart(race, {
  type: 'pie',
  data: {
    labels: ['White (Non-Hispanic)', 'Black (Non-Hispanic)', 'Hispanic (Black or White)', 'Asian', 'Other/Unknown'],
    datasets: [{
      label: 'Race/Ethnicity Involved',
      data: [109, 1289, 245, 16, 7],
      borderWidth: 1
    }]
  }
});

/* Fatal and Unfatal */
const fatal = {
  labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Fatal',
      data: [233, 262, 259, 302, 311, 449, 506, 474, 373],
      borderColor: 'rgba(75, 192, 192, 1)', // Line color
      borderWidth: 2, // Line width
      fill: false // Don't fill area under the line
    },
    {
      label: 'Unfatal',
      data: [1061, 1078, 1004, 1147, 1162, 1811, 1831, 1796, 1293],
      borderColor: 'rgba(255, 99, 132, 1)', // Line color
      borderWidth: 2, // Line width
      fill: false // Don't fill area under the line
    }
  ]
};

const fconfig = {
  type: 'line',
  data: fatal,
  options: {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Death Count'
        }
      }
    }
  }
};

const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, fconfig);


/* Race/Ethnicity vs Age */ 
const data = {
  //labels: ['Younger Than 18', '18-30', '31-45', 'Older than 45', 'Unknown'],
  
  datasets: [{
      label: 'Races/Ethnicities Invlolved',
      data: [
        109, 1289, 245, 16, 7
      ],
      backgroundColor: 'rgba(255, 26, 104, 0.2)',
      borderColor: 'rgba(255, 26, 104, 1)',
      tension: 0.4,
      yAxisID: 'y'     
  }, 
  {
      label: 'Ages Involved',
      data: [
        161, 746, 534, 202, 23
      ],
      backgroundColor: 'rgba(0, 26, 104, 0.2)',
      borderColor: 'rgba(0, 26, 104, 1)',
      tension: 0.4,
  }]
};

const config = {
  type: 'line',
  data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        ticks: {
          font: {
            size: calculateFontSize()
          }
        }
      },
      x1: {
        labels: ['White (Non-Hispanic)', 'Black (Non-Hispanic)', 'Hispanic (Black Or White)', 'Asian', 'Unknown'],
        ticks: {
          font: {
            size: calculateFontSize()
          }
        },
      },
      x2: {
        position: 'top',
        labels: ['Younger than 18', '18-30', '31-45', 'Older than 45', 'Unknown'],
        ticks: {
          font: {
            size: calculateFontSize()
          }
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            const datasetIndex = tooltipItems[0].datasetIndex;
            const datasetLabel = config.data.datasets[datasetIndex].label;
            
            return datasetLabel;
          },
          label: function(context) {
            console.log(context);

            const datasetIndex = context.datasetIndex;
            const datasetLabel = config.data.datasets[datasetIndex].label;
            const value = context.parsed.y;
            let xLabel;
        
            if (datasetLabel === 'Races/Ethnicities Invlolved') {
                xLabel = config.options.scales.x1.labels[context.dataIndex];
            } else if (datasetLabel === 'Ages Involved') {
                const dataIndex = context.dataIndex;
                console.log(dataIndex);
                if (dataIndex === 0) {
                  xLabel = 'Younger than 18';
                } else if (dataIndex === 1) {
                  xLabel = '18-30';
                } else if (dataIndex === 2) {
                  xLabel = '31-45';
                } else if (dataIndex === 3) {
                  xLabel = 'Older than 45';
                } else {
                  xLabel = 'Unknown';
                }
            }
            return `${xLabel}: ${value}`;
          },
        }
      }, 
      legend: {
        labels: {
          font: { 
            size: calculateFontSize() 
          } 
        }
      }
    },
  }
};




// render init block
const myChart = new Chart(
  document.getElementById('chart'),
  config
);

myChart.legend.options.onClick = function(event, legendItem) {
  const datasetIndex = legendItem.datasetIndex;
  const meta = myChart.getDatasetMeta(datasetIndex);
  const metaIndex = meta.index;

  if (datasetIndex === 2) { 
    if (myChart.data.datasets[metaIndex].label === 'Ages Involved') {
      myChart.data.datasets[metaIndex].label = 'Race/Ethnicity Involved';
    } else {
      myChart.data.datasets[metaIndex].label = 'Ages Involved';
    }
    myChart.update();
  }
};


// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;


function calculateFontSize() {
  // Adjust the font size based on the width of the device
  const screenWidth = window.innerWidth;
  const baseFontSize = 14; // Base font size
  const scaleFactor = 0.5; // Scale factor to adjust font size
  
  // Calculate the scaled font size
  let fontSize = baseFontSize;
  if (screenWidth > 1200) {
    fontSize = baseFontSize;
  } else if (screenWidth < 1200) {
    fontSize = 12;
  } else if (screenWidth < 768) {
    fontSize = 10;
  } else if (screenWidth < 542) {
    fontSize = 9;
  } else if (screenWidth < 425) {
    fontSize = 7;
  }

  return fontSize;
}
