import { genericRenderer } from "../../lib/utils.js";
const templateFile = await fetch("src/ui/genre/template.html");

const template = await templateFile.text();

let GenreView = {
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

export { GenreView };