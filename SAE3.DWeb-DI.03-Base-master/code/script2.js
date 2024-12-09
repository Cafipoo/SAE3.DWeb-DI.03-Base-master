// Obtenir la date actuelle et la formater en YYYY-MM
const currentDate = new Date();
const currentMonthYear = currentDate.toISOString().slice(0, 7); // Format YYYY-MM

var options = {
    series: [{
        name: "sales",
        data: [{
            x: currentMonthYear,
            y: 540
        }]
    }],
    chart: {
        type: 'bar',
        height: 380
    },
    xaxis: {
        type: 'category',
        labels: {
            fontWeight: 700
        },
        categories: [
            currentMonthYear
        ]
    },
    title: {
        text: 'Grouped Labels on the X-axis',
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();