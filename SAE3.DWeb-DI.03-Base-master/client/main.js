import { HeaderView } from "./ui/header/index.js";
import { MoviesData } from "./data/movies.js";
import { MoviesView } from "./ui/movie/index.js";
import { SalesData } from "./data/sales.js";



let C = {};

C.init = async function(){
    V.init();
}

let V = {
    // header: document.querySelector("#header"),
    movies: document.querySelector("#movie")
};

V.init = function(){
    // V.renderHeader();
    V.renderMovies();
}

C.loadMovies = async function(){
    let data = await SalesData.getTotalSales();
    V.renderMovies(data);
}

// V.renderHeader= function(){
//     V.header.innerHTML = HeaderView.render();
// }

V.renderMovies = function(data){
    V.movies.innerHTML = MoviesView.render(data);
}
C.loadMovies();
C.init();

