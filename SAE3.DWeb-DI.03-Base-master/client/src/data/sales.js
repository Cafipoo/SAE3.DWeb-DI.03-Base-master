import { getRequest, postRequest } from "../lib/api-request";

let SalesData = {};

SalesData.fetch = async function (id) {
    let data = await getRequest("sales/" + id);
    return data;
};

SalesData.fetchAll = async function () {
    let data = await getRequest("sales");
    return data;
};

SalesData.save = async function (sales) {
    let data = await postRequest("sales", sales);
    return data;
};

SalesData.getTotalSales = async function () {
    let data = await getRequest("sales/salesThisMonth");
    return data;
};
export { SalesData };