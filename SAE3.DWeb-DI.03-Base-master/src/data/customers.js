import { getRequest, postRequest } from "../lib/api-request";

let CustomerData = {};

CustomerData.fetch = async function (id) {
    let data = await getRequest("customers/" + id);
    return data;
};

CustomerData.fetchAll = async function () {
    let data = await getRequest("customers");
    return data;
};

CustomerData.save = async function (customers) {
    let data = await postRequest("customers", customers);
    return data;
};
export { CustomerData };