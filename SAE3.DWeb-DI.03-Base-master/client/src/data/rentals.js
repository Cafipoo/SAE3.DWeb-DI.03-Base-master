import { getRequest, postRequest } from "../lib/api-request";

let RentalsData = {};

RentalsData.fetch = async function (id) {
    let data = await getRequest("rentals/" + id);
    return data;
};

RentalsData.fetchAll = async function () {
    let data = await getRequest("rentals");
    return data;
};

RentalsData.save = async function (rent) {
    let data = await postRequest("rentals", rent);
    return data;
};
RentalsData.getRentalSales = async function () {
    let data = await getRequest("rentals/rentalThisMonth");
    return data;
};

RentalsData.getRentalsEvolution = async function () {
    let data = await getRequest("rentals/rentalEvolution");
    return data;
}
RentalsData.rentalGenreEvolution = async function () {
    let data = await getRequest("rentals/rentalGenreEvolution");
    return data;
}

export { RentalsData };