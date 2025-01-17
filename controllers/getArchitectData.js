const cheerio = require("cheerio");
const axios = require("axios")
const getArchitectSearchDataByPage = require("../services/getArchitectSearchData")
const getIndividualArchitectHTML = require("../services/getIndividualArchitectHTML")

// CORRECT CODE

// const getIndividualArchitectLinks = async () => {
//     const links = []
//     for (let i = 0; i < 310; i++) {
//         const response = await getArchitectSearchDataByPage("a", i)
//         const $ = cheerio.load(response);
//         $("a").each((index, element) => {
//             const href = $(element).attr("href");
//             links.push(href)
//         })
//     }
//     const cleanedLinks = links.map(link => link.replace(/\\"/g, ''));
//     console.log(cleanedLinks)
//     return cleanedLinks 
// };

const getIndividualArchitectLinks = async () => {
    const links = []
    for (let i = 0; i < 320; i++) {
        const response = await getArchitectSearchDataByPage("alonso", i)
        const $ = cheerio.load(response);
        $("a").each((index, element) => {
            const href = $(element).attr("href");
            links.push(href)
        })
    }
    const cleanedLinks = links.map(link => link.replace(/\\"/g, ''));

    for (let link of cleanedLinks) {
        if (!link.includes("https://arb.org.uk/architect-information/maintaining-registration/")) {
            // console.log(link)
            getArchitectDatafromIndividualHTML(`https://architects-register.org.uk${link}`)
        }
    }
    return cleanedLinks 
};



const getArchitectDatafromIndividualHTML = async (architectURL) => {
    const response = await axios.get(architectURL)
    const $ = cheerio.load(response.data);
    console.log("Company name: " + $("body > main > div.main > div.outer-wrap.pb-3 > div.map-overlay > div > div > div.col-md-7.offset-md-2.col-sm-12.offset-sm-0 > div > div.card-body > div.media.mt-4 > div.media-body > span").text())
    console.log("Company address: " + $("body > main > div.main > div.outer-wrap.pb-3 > div.map-overlay > div > div > div.col-md-7.offset-md-2.col-sm-12.offset-sm-0 > div > div.card-body > div:nth-child(4) > div.media-body > span").text())
    console.log("Company website: " + $("body > main > div.main > div.outer-wrap.pb-3 > div.map-overlay > div > div > div.col-md-7.offset-md-2.col-sm-12.offset-sm-0 > div > div.card-body > div:nth-child(5) > div.media-body > a").text())
    console.log("Company email address: " + $("body > main > div.main > div.outer-wrap.pb-3 > div.map-overlay > div > div > div.col-md-7.offset-md-2.col-sm-12.offset-sm-0 > div > div.card-body > div:nth-child(6) > div.media-body > a").text())
    console.log("\n")
}

// getArchitectDatafromIndividualHTML("https://architects-register.org.uk/Architect/092168H?filterId=Architect")



getIndividualArchitectLinks();
// getArchitectDatafromIndividualHTML('/Architect/073335K?filterId=Architect')