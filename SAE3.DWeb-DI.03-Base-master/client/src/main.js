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
import { monthView } from "./ui/month/index.js";

let C = {};

C.init = async function(){
    V.init();
}

let V = {
    // header: document.querySelector("#header"),
    movies: document.querySelector("#movie"),
    top3: document.querySelector("#top"),
    topRentals: document.querySelector("#topRentals"),
    evolution: document.querySelector("#evolution"),
    genre: document.querySelector("#genre"),
    country: document.querySelector("#country"),
    history: document.querySelector("#historySelect"),
    customerName: document.querySelector("#customerName"),
    month: document.querySelector("#month"),
    monthData: document.querySelector("#monthData"),
};

V.init = async function(){
    C.loadTop();
    C.loadMovies();
    C.loadEvolution();
    C.loadGenre();
    C.loadCountry();
    C.loadHistory();
    C.loadCustomer();
    await C.loadMonth();
    C.loadConsommation();
    
}

/* Itération 3 affichage du montant total des sales et rentals */
C.loadMovies = async function(){
    try {
        let data = await SalesData.getTotalSales();
        let data2 = await RentalsData.getRentalSales();
        V.renderMovies(data, data2);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

V.renderMovies = function(data, data2){
    V.movies.innerHTML = MoviesView.render(data, data2);
    const currentDate = new Date();
    const currentMonthYear = currentDate.toISOString().slice(0, 7);

    var options = {
        series: [{
            name: "sales",
            data: [{
                x: "Top vente du " + currentMonthYear,
                y: data,
                fillColor: '#008FFB'
            },
            {
                x: "Top location du " + currentMonthYear,
                y: data2,
                fillColor: '#00E396'
            }],
        }],
        chart: {
            type: "bar",
            height: 403.75,
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
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

/*Itération 4 top 3 des ventes et rentals*/
C.loadTop = async function(){
    try {
        let dataTop = await MoviesData.getTop3();
        let dataSales = dataTop.slice(0, 3);
        let dataRentals = dataTop.slice(3);
        V.renderTop(dataSales, dataRentals);

    } catch (error) {
        console.error("Error loading top movies:", error);
    }
}

V.renderTop= function(dataTop, dataTop2){
    V.top3.innerHTML = TopView.render(dataTop);
    V.topRentals.innerHTML = TopView.render(dataTop2);
    
}

/*Itération 5 evolution du nombre de vente et location lors des 6 derniers mois */
C.loadEvolution = async function(){
    try {
        let data = await RentalsData.getRentalsEvolution();
        let data2 = await SalesData.getSalesEvolution();
        V.renderEvolution(data, data2);
    } catch (error) {
        console.error("Error loading evolution:", error);
    }

}

V.renderEvolution = function(data, data2){
    V.evolution.innerHTML = EvoView.render(data, data2);
    var options = {
        series: [{
            name: "Evolution des locations",
            data: data.map(item => item.total_rentals).reverse()
        }, {
            name: "Evolution des ventes",
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
            text: 'Ventes et location lors des 6 derniers mois',
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

/*Itération 6 évolution des ventes et locations par genre lors des 6 derniers mois */

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

V.renderGenre = function(dataSales, dataRent){
    V.genre.innerHTML = GenreView.render();
    let data = dataSales.concat(dataRent);  
    var genres = ['Animation', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Action', 'Romance', 'Horror'];
    var months = [...new Set(data.map(item => item.month))].sort();
    console.log(data);
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
            text: 'Ventes et locations par genre lors des 6 derniers mois',
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

/*Itération 7 affichage des ventes et locations par pays */
C.loadCountry = async function(){
    try {
        let data = await SalesData.SalesByCountry();
        let data2 = await RentalsData.RentalsByCountry();
        V.renderCountry(data, data2);
    } catch (error) {
        console.error("Error loading country:", error);
    }
}

V.renderCountry = function(data, data2){
    var options = {
        series: [
        {
          name: 'Sales',
          data: data.map(item => ({
              x: item.country,
              y: item.total_sales
          }))
        },
        {
          name: 'Rentals',
          data: data2.map(item => ({
              x: item.country,
              y: item.total_rentals
          }))
        }
      ],
        legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Vente et location par pays',
      }
      };

    if (V.chart) {
        V.chart.updateOptions(options);
    } else {
        V.chart = new ApexCharts(document.querySelector("#countryData"), options);
        V.chart.render();
    }
}
let chart; 

/*Itération 8 pour un film selectionner afficher l'évolution de ses ventes et locations */
C.loadHistory = async function() {
    let movie_title = document.querySelector("#historySelect").value;
    console.log(movie_title);
    if (!movie_title || movie_title === "0") {
        movie_title = "Love Is All There Is";
    }
    try {
        let data = await MoviesData.historyByTitle(movie_title);
        let data2 = [];
        if (!movie_title || movie_title === "Love Is All There Is") {
            data2 = await MoviesData.fetchAll();
        }
        V.renderHistory(data, data2);
    } catch (error) {
        console.error("Error loading history:", error);
    }
}

V.renderHistory = function(data, data2) {
    if (!V.history.innerHTML) {
        V.history.innerHTML = HistoryView.render(data2);
    }
    let movie_title = document.querySelector("#historySelect").value;
    
    let dataRent = data.map(item => item.rentals_count);
    let dataSales = data.map(item => item.sales_count);
    var options = {
        series: [{
            name: "Evolution des locations",
            data: dataRent
        }, {
            name: "Evolution des ventes",
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
            text: 'Ventes et locations pour ' + movie_title, 
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

/*Itération 9 affichage des ventes et locations par client/genre */
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
    console.log(data);
    let genreCounts = data.reduce((acc, item) => {
        acc[item.genre] = (acc[item.genre] || 0) + 1;
        return acc;
    }, {});

    var options = {
        series: Object.values(genreCounts),
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: Object.keys(genreCounts),
        tooltip: {
            y: {
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                    let genre = Object.keys(genreCounts)[dataPointIndex];
                    let moviesInGenre = data.filter(item => item.genre === genre).map(item => item.movie_title).join(",\n");
                    return genre + ": " + value + " (" + moviesInGenre + ")";
                    
                }
            }
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
    };
      if (chart2) {
        chart2.destroy();
    }
      chart2 = new ApexCharts(document.querySelector("#customer"), options);
      chart2.render();
}

document.querySelector("#customerName").addEventListener("change", C.loadCustomer);

/*Itération 11 affichage des mois*/
C.loadMonth = async function(){
    try {
        let data = await MoviesData.getMonth();
        console.log(data);
        V.renderMonth(data);
    } catch (error) {
        console.error("Error loading month:", error);
    }
}

V.renderMonth = function(data){ 
    V.month.innerHTML = monthView.render(data);
}

/*Itération 11 affichage des consommations par pays/mois*/
C.loadConsommation = async function(){
    let month = document.querySelector("#month").value;
    console.log(month);
    try {
        let data = await MoviesData.movieConsoParPays(month);
        console.log(data);
        V.renderConsommation(data);
    } catch (error) {
        console.error("Error loading country:", error);
    }
}

V.renderConsommation = function(data){ 
    V.monthData.innerHTML = "";
    var options = {
        series: [{
        name: 'Series 1',
        data: data.map(item => item.total_gb_consumed),
      }],
        chart: {
        height: 350,
        type: 'radar',
      },
      title: {
        text: 'Co2 consommé par pays le '+ document.querySelector("#month").value,
      },
      yaxis: {
        stepSize: 20
      },
      xaxis: {
        categories: data.map(item => item.country)
      }
      };

      var chart = new ApexCharts(document.querySelector("#monthData"), options);
      chart.render(); 
}

document.querySelector("#month").addEventListener("change", C.loadConsommation);

C.init();
