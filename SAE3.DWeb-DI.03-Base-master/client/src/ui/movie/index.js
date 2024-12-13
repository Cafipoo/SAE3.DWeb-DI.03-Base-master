import { genericRenderer } from "../../lib/utils.js";
const templateFile = await fetch("src/ui/movie/template.html");

const template = await templateFile.text();

let MoviesView = {
    render: function(data) {
        let html = "";
        if (!Array.isArray(data)) {
            data = [data];
        }
        for (let obj of data) {
            html += genericRenderer(template, obj);
        }
        return html;
    },
};

export { MoviesView };