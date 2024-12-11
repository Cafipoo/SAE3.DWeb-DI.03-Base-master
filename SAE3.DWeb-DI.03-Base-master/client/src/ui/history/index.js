import { genericRenderer } from "../../lib/utils.js";
const templateFile = await fetch("src/ui/history/template.html");

const template = await templateFile.text();

let HistoryView = {
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

export { HistoryView };