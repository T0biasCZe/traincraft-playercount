import fs from "fs"
import fetch from "cross-fetch";

const ip = "151.80.253.79";
const port = "25577";

let startDate = new Date().toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
}).replace(/\s/g, '');
fs.writeFileSync("./date.txt", startDate)
fs.appendFileSync(`log_${startDate}.log`, `${startDate}\n\n`);
console.log("Záznam spuštěn!");

const log = async () => {
    const res = await fetch(`https://mcapi.us/server/status?ip=${ip}&port=${port}`).then(data => data.json());
    let date = new Date().toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }).replace(/\s/g, '');

    if (date !== fs.readFileSync("./date.txt", "utf-8")) {
        fs.writeFileSync("./date.txt", date);
        fs.writeFileSync(`log_${date}.log`, `${date}\n\n`)
    }
    fs.appendFileSync(`log_${date}.log`, `Čas: ${new Date().toLocaleTimeString("cs-CZ")}\tHráči: ${res.players.now}\n\n`);
    console.log(`Zapsáno! Čas: ${new Date().toLocaleTimeString("cs-CZ")}\tHráči: ${res.players.now}\n\n`)
}
log();
setInterval(log, 1800000);