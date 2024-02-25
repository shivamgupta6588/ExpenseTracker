import React from 'react';
import Chart from 'react-apexcharts';

const CategoryCharts = ({ transactions }) => {
  // Ensure transactions is not null or undefined
  if (!transactions || transactions.length === 0) {
    return <div className="text-center text-gray-600">No data available for chart</div>;
  }

  // Function to calculate total amount for each category
  const getCategoryTotal = () => {
    const categoryTotal = {};
    transactions.forEach(transaction => {
      if (categoryTotal[transaction.category]) {
        categoryTotal[transaction.category].amount += transaction.amount;
      } else {
        categoryTotal[transaction.category] = { amount: transaction.amount };
      }
    });
    return categoryTotal;
  };

  // Function to format data for pie chart
  const getPieChartData = () => {
    const categoryTotal = getCategoryTotal();
    return Object.keys(categoryTotal).map((category, index) => ({
      label: category,
      y: categoryTotal[category].amount,
      color: colors[index % colors.length], // Assigning color index for each category
    }));
  };

  // Function to format data for bar chart
  const getBarChartData = () => {
    const categoryTotal = getCategoryTotal();
    return Object.keys(categoryTotal).map((category, index) => ({
      x: category, // Using x property instead of label
      y: categoryTotal[category].amount,
      color: colors[index % colors.length], // Assigning color for each category
    }));
  };

  // Colors for the charts
  const colors = ['#5ECC62', '#FF6262', '#FF9F62', '#62B1FF', '#FF62C7', '#FFC562', '#C762FF', '#62FFD9', '#7F62FF'];

  const pieChartOptions = {
    labels: getPieChartData().map(data => data.label),
    colors: getPieChartData().map(data => data.color),
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: getBarChartData().map(data => data.x),
    },
    yaxis: {
      title: {
        text: 'Amount',
      },
    },
    fill: {
      colors: '#9c6936', // Assigning colors to bars
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
    series: [{
      data: getBarChartData().map(data => data.y),
    }],
  };

  return (
    <div className="flex flex-col gap-4 lg:m-4">
      <div className="bg-[#ffebcc] p-2 rounded-md flex-1/2">
          <Chart options={barChartOptions} series={barChartOptions.series} type="bar" />
      </div>
      <div className="bg-[#ffebcc] p-2 rounded-md flex-1/2">
          <Chart options={pieChartOptions} series={getPieChartData().map(data => data.y)} type="pie" />
      </div>
    </div>
  );
};

export default CategoryCharts;
