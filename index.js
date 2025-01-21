require("dotenv").config();

const { connectToDatabase } = require("./db/db.js");
const getArchitectData = require("./controllers/getArchitectData.js")
const fs = require('fs');
const prompt = require("prompt-sync")();
const Architect = require("./models/Architect.js");
const { exit } = require("process");

const version = "version 1.0"
const description = "First trial, architects searched one by one"

const start = async () => {
    let confirm = prompt("Would you line to scrape? (y/n): ")
    if (confirm == "y" || confirm == "Y") {
        await connectToDatabase();
        await Architect.deleteMany({});
        let start = Date.now();
        await getArchitectData();
        let timeInMinutes = `Time to complete(mins): ${((Date.now() - start) / (1000 * 60)).toFixed(2)}`;
        fs.appendFile("PerformanceLog.txt", 
            version + "\n" + 
            description + "\n" + 
            timeInMinutes + "\n", (err) => {
                if (err) {
                    console.error(err)
                }
            } )
    } else {
        process.exit(0)
    }

};

start();