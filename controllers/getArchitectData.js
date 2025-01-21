const cheerio = require("cheerio");
const axios = require("axios");
const getArchitectSearchDataByPage = require("../services/getArchitectSearchData");
const getIndividualArchitectHTML = require("../services/getIndividualArchitectHTML");
const Architect = require("../models/Architect")

const getArchitectData = async () => {
    // loop through the alphabet to search for architect last names
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let totalArchitects = 0
    for (const letter of alphabet) {
        // Get the number of pages for the search
        console.log(`\rCurrently processing '${letter}'\n`)
        const initialResponse = await getArchitectSearchDataByPage(letter, 0)
        const $ = cheerio.load(initialResponse)
        // totalArchitects += Number($('.d-block.d-md-none.mt-2').text().trim().split(" ").at(0))
        // console.log(totalArchitects)
        const $totalPages = $('.d-block.text-right.mt-4')
        totalPages = Number($totalPages.text().trim().split(" ").at(-1))

        // Get architect links from arb search pages
        const links = []
        for (let i = 0; i < totalPages; i++) {
            process.stdout.write(`\rProcessing page ${i + 1} of ${totalPages}`);
            const response = await getArchitectSearchDataByPage(letter, i)
            const $ = cheerio.load(response);
            
            // Push architect links to links array
            $("div.card-body a").each((index, element) => {
                const href = $(element).attr("href");
                if (href[0] != "h") {
                    links.push(href)
                }
            })
        }

        // Process each architect to get data
        let architectCount = links.length
        let i = 0
        for (let link of links) {
            process.stdout.write(`\rProcessing architect ${i + 1} of ${architectCount}: ${link}`)
            await getArchitectDataFromLink(link)
            i += 1;         
        }

    }
};

const getArchitectDataFromLink = async (architectURL) => {
    const architectHTML = await getIndividualArchitectHTML(architectURL)
    const $ = cheerio.load(architectHTML);

    // Extract identity data
    const nameData = $(".title-font strong").text().split(/\s+/)
    let firstNames;
    let surname;
    let registrationNo;

    if (nameData) {
        firstNames = nameData.slice(0, nameData.length - 2).join(" ")
        surname = nameData.at(-2)
        registrationNo = nameData.at(-1)
    }

    // Extract company data
    const companyName = $("[aria-label='Company'] span").text()
    const addressHTML = $("[aria-label='Address'] span").html();
    let addressList;
    let country;
    let postcode;
    let town;
    let addressFirstLines;

    if (addressHTML) {
        addressList = addressHTML.split('<br>').map((address) => address.trim())
        addressFirstLines = addressList.slice(0, -3).join(" ")
        country = addressList.at(-1)
        town = addressList.at(-3)
        postcode = addressList.at(-2)
    }

    // Extract email
    const email = $("[aria-label='Email'] a").text()

    // Save to database
    try {
        const existingArchitect = await Architect.findOne({ ARBRegistrationNumber: registrationNo });
    
        if (existingArchitect) {
            console.log(`Architect with registration number ${registrationNo} already exists`);
            return null;
        }
    
        const architectData = {
            firstNames: firstNames,
            surname: surname,
            ARBRegistrationNumber: registrationNo,
            emailAddress: email || undefined,
            companyName: companyName || undefined,
            companyAddressFirstLines: addressFirstLines,
            companyTown: town,
            companyPostCode: postcode,
            companyCountry: country
        };
    
        await new Architect(architectData).save();

    } catch (error) {
        console.error(error)
    }
}

module.exports = getArchitectData;