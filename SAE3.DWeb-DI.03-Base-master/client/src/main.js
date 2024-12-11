import { MoviesData } from "./data/movies.js";
import { MoviesView } from "./ui/movie/index.js";
import { SalesData } from "./data/sales.js";
import { TopView } from "./ui/top/index.js";
import { RentalsData } from "./data/rentals.js";
import { EvoView } from "./ui/evolution/index.js";
import {GenreView} from "./ui/genre/index.js";
import {CountryView} from "./ui/country/index.js";
import { HistoryView } from "./ui/history/index.js";
import { CustomerData } from "./data/customers.js";
import { CustomerView } from "./ui/customer/index.js";

let C = {};

C.init = async function(){
    V.init();
}

let V = {
    // header: document.querySelector("#header"),
    movies: document.querySelector("#movie"),
    top3: document.querySelector("#top"),
    evolution: document.querySelector("#evolution"),
    genre: document.querySelector("#genre"),
    country: document.querySelector("#country"),
    history: document.querySelector("#historySelect"),
    customerName: document.querySelector("#customerName"),
};

V.init = function(){
    // V.renderHeader();
    V.renderMovies();
    V.renderTop();
}

C.loadTop = async function(){
    try {
        let dataTop = await MoviesData.getTop3();
        V.renderTop(dataTop);
    } catch (error) {
        console.error("Error loading top movies:", error);
    }
}

C.loadMovies = async function(){
    try {
        let data = await SalesData.getTotalSales();
        let data2 = await RentalsData.getRentalSales();
        V.renderMovies(data, data2);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}
C.loadEvolution = async function(){
    try {
        let data = await RentalsData.getRentalsEvolution();
        let data2 = await SalesData.getSalesEvolution();
        V.renderEvolution(data, data2);
    } catch (error) {
        console.error("Error loading evolution:", error);
    }

}

C.loadGenre = async function(){
    let selectedOption = document.querySelector("#genreSelect").value;

    if (selectedOption === "sales") {
        let dataSales = await SalesData.salesGenreEvolution();
        V.renderGenre(dataSales, []);
    } else if (selectedOption === "rentals") {
        let dataRent = await RentalsData.rentalGenreEvolution();
        V.renderGenre([], dataRent);
    } else {
        let dataSales = await SalesData.salesGenreEvolution();
        let dataRent = await RentalsData.rentalGenreEvolution();
        V.renderGenre(dataSales, dataRent);
    }
}


C.loadCountry = async function(){
    try {
        let data = await SalesData.SalesByCountry();
        let data2 = await RentalsData.RentalsByCountry();
        V.renderCountry(data, data2);
    } catch (error) {
        console.error("Error loading country:", error);
    }
}

let chart; // Déclarez une variable globale pour stocker l'instance du graphique

C.loadHistory = async function() {
    let movie_title = document.querySelector("#historySelect").value;
    try {
        let data = await MoviesData.historyByTitle(movie_title);
        let data2 = [];
        if (!movie_title) {
            data2 = await MoviesData.fetchAll();
        }
        V.renderHistory(data, data2);
    } catch (error) {
        console.error("Error loading history:", error);
    }
}
C.loadCustomer = async function(){
    let customer = document.querySelector("#customerName").value;
    if (!customer || customer === "0") {
        customer = "1";
    }
    try {
        let data = await MoviesData.movieCustomer(customer);
        let data2 = [];
        let customerName = document.querySelector("#customerName").value;

        if (!customerName) {
            data2 = await CustomerData.fetchAll();
        }
        V.renderCustomer(data, data2);
        
    } catch (error) {
        console.error("Error loading customers:", error);
    }
}
let chart2;
V.renderCustomer = function(data,data2){
    if (!V.customerName.innerHTML) {
        V.customerName.innerHTML = CustomerView.render(data2);
    }
    var options = {
        series: data.map(item => item.count),
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: data.map(item => item.genre),
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
      };
      if (chart2) {
        chart2.destroy();
    }
      chart2 = new ApexCharts(document.querySelector("#customer"), options);
      chart2.render();
}

document.querySelector("#customerName").addEventListener("change", C.loadCustomer);


V.renderHistory = function(data, data2) {
    if (!V.history.innerHTML) {
        V.history.innerHTML = HistoryView.render(data2);
    }
    let movie_title = document.querySelector("#historySelect").value;
    
    let dataRent = data.map(item => item.rentals_count);
    let dataSales = data.map(item => item.sales_count);
    var options = {
        series: [{
            name: "Rentals Evolution",
            data: dataRent
        }, {
            name: "Sales Evolution",
            data: dataSales
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Rentals and Sales Evolution last 6 months for ' + movie_title,
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: data.map(item => item.month),
        }
    };

    if (chart) {
        chart.destroy();
    }

    chart = new ApexCharts(document.querySelector("#history"), options);
    chart.render();
}

document.querySelector("#historySelect").addEventListener("change", C.loadHistory);

V.renderCountry = function(data, data2){
    if (!V.country.innerHTML) {
        V.country.innerHTML = CountryView.render(data, data2);
    }
    let selectedOption = document.querySelector("#country").value;
    let filteredData = data.filter(item => item.country === selectedOption);
    let filteredData2 = data2.filter(item => item.country === selectedOption);
    let totalSales = filteredData.reduce((acc, item) => acc + item.total_sales, 0);
    let totalRentals = filteredData2.reduce((acc, item) => acc + item.total_rentals, 0);
    var options = {
        series: [{
            name: "sales",
            data: [{
                x: " Top vente",
                y: totalSales,
            },
            {
                x:" Top location",
                y: totalRentals,
            }],
        }],
        chart: {
            type: "bar",
            height: 380,
        },
        xaxis: {
            type: "category",
            labels: {
                fontWeight: 700,
            },
            categories: ["Ventes", "Locations"],
        },
        title: {
            text: "Montant total des ventes et le montant total des locations pour le mois en cours",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + " €";
                },
            },
        },
    };

    if (V.chart) {
        V.chart.updateOptions(options);
    } else {
        V.chart = new ApexCharts(document.querySelector("#countryData"), options);
        V.chart.render();
    }
}

document.querySelector("#country").addEventListener("change", C.loadCountry);

V.renderGenre = function(dataSales, dataRent){
    V.genre.innerHTML = GenreView.render();
    let data = dataSales.concat(dataRent);  
    var genres = ['Animation', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Action', 'Romance', 'Horror'];
    var months = [...new Set(data.map(item => item.month).reverse().filter((_, index) => index % 8 === 0))];
    
    var series = genres.map((genre, index) => {
        return {
            name: genre,
            data: months.map(month => {
                var item = data.find(d => d.genre == genre && d.month == month);
                return item ? (item.total_sales || item.total_rentals) : 0;
            }),
            color: generateColor(index)
        };
    });
    
    function generateColor(index) {
        var colorPalette = ['#008FFB', '#00E396', '#775DD0', '#FEB019', '#FF4560', '#A2A2A4', '#8D6E63', '#E9EB58'];
        return colorPalette[index % colorPalette.length];
    }
    var options = {
        series: series,
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: 'Genre Sales Evolution'
        },
        xaxis: {
            categories: months,
            labels: {
                formatter: function (val) {
                    return val;
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };

      var chart = new ApexCharts(document.querySelector("#chartGenre"), options);
      chart.render();
}

document.querySelector("#genreSelect").addEventListener("change", C.loadGenre);

V.renderEvolution = function(data, data2){
    V.evolution.innerHTML = EvoView.render(data, data2);
    var options = {
        series: [{
            name: "Rentals Evolution",
            data: data.map(item => item.total_rentals).reverse()
        }, {
            name: "Sales Evolution",
            data: data2.map(item => item.total_sales).reverse()
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Rentals and Sales Evolution last 6 months',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: data.map(item => item.month).reverse(),
        }
    };

        var chart = new ApexCharts(document.querySelector("#chartEvo"), options);
        chart.render();
}

V.renderTop= function(dataTop){
    V.top3.innerHTML = TopView.render(dataTop);
}

V.renderMovies = function(data, data2){
    V.movies.innerHTML = MoviesView.render(data, data2);
    const currentDate = new Date();
    const currentMonthYear = currentDate.toISOString().slice(0, 7);

    var options = {
        series: [{
            name: "sales",
            data: [{
                x: " Top vente du " + currentMonthYear ,
                y: data,
            },
            {
                x:" Top location du " + currentMonthYear,
                y: data2,
            }],
        }],
        chart: {
            type: "bar",
            height: 380,
        },
        xaxis: {
            type: "category",
            labels: {
                fontWeight: 700,
            },
            categories: ["Ventes", "Locations"],
        },
        title: {
            text: "Montant total des ventes et le montant total des locations pour le mois en cours",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + " €";
                },
            },
        },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

C.loadTop();
C.loadMovies();
C.loadEvolution();
C.loadGenre();
C.loadCountry();
C.loadHistory();
C.loadCustomer();
C.init();
