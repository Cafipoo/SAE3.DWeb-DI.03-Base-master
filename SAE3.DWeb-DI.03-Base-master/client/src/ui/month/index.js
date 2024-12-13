import { genericRenderer } from "../../lib/utils.js";
const templateFile = await fetch("src/ui/month/template.html");

const template = await templateFile.text();

let monthView = {
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

export { monthView };