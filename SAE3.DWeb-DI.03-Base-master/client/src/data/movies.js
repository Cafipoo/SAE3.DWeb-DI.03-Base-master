import { getRequest, postRequest } from "../lib/api-request";

let MoviesData = {};

MoviesData.fetch = async function (id) {
    let data = await getRequest("movies/" + id);
    return data;
};

MoviesData.fetchAll = async function () {
    let data = await getRequest("movies");
    return data;
};

MoviesData.save = async function (movie) {
    let data = await postRequest("movies", movie);
    return data;
};
MoviesData.getTop3 = async function () {
    let data = await getRequest("movies/top3");
    return data;
};
MoviesData.historyByTitle = async function (movie_title) {
    let data = await getRequest("movies/historyByTitle?movie_title="+movie_title);
    return data;
}
MoviesData.movieCustomer = async function (id) {
    let data = await getRequest("movies/movie?customer="+id);
    return data;
}
export { MoviesData };