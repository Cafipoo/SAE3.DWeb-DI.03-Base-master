import { MoviesData } from "./data/movies.js";
import { MoviesView } from "./ui/movie/index.js";
import { SalesData } from "./data/sales.js";
import { TopView } from "./ui/top/index.js";
import { RentalsData } from "./data/rentals.js";
import { EvoView } from "./ui/evolution/index.js";
import {GenreView} from "./ui/genre/index.js";

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
        console.log(1);
        V.renderGenre(dataSales, []);
    } else if (selectedOption === "rentals") {
        let dataRent = await RentalsData.rentalGenreEvolution();
        console.log(2);
        V.renderGenre([], dataRent);
    } else {
        let dataSales = await SalesData.salesGenreEvolution();
        let dataRent = await RentalsData.rentalGenreEvolution();
        console.log(3);
        V.renderGenre(dataSales, dataRent);
    }
}
V.renderGenre = function(dataSales, dataRent){
    V.genre.innerHTML = GenreView.render();
    console.log(dataSales, dataRent);
    let data = dataSales.concat(dataRent);  
    console.log(data); 
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
    console.log("test");
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
    console.log(data, data2);
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
    console.log(data,data2);
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
C.init();
