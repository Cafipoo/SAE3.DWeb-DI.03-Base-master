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

export { MoviesData };